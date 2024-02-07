# ZooKeeper FLE

ZooKeeper messaging doesn't care about the exact method of electing a leader has long as the following holds:

- The leader has seen the highest zxid of all the followers.
- A quorum of servers have committed to following the leader.

Of these two requirements only the first, the highest zxid among the followers needs to hold for correct operation.

The second requirement, a quorum of followers, just needs to hold with high probability. We are going to recheck the second requirement, so if a failure happens during or after the leader election and quorum is lost, we will recover by abandoning leader activation and running another election.

After leader election a single server will be designated as a leader and start waiting for followers to connect. The rest of the servers will try to connect to the leader. The leader will sync up with followers by sending any proposals they are missing, or if a follower is missing too many proposals, it will send a full snapshot of the state to the follower.

Reconfig 时会重启 FLE。

```java
// 当节点认识到其他节点有更高的 zxid 和更高的 sid 时，
// 或者是节点已经加入了一个 Quorum（已经存在一个 leader）
// 就会发送一个 Notifaction 让其他节点知道自己已经修改了选票
static public class Notification {
    // Format version, introduced in 3.4.6
    public final static int CURRENTVERSION = 0x2;
    int version;

    // Proposed leader
    long leader;

    // zxid of the proposed leader
    long zxid;

    // Epoch
    long electionEpoch;

    // Address of sender
    long sid;

    // epoch of the proposed leader
    long peerEpoch;

    QuorumVerifier qv;
    // current state of sender
    QuorumPeer.ServerState state;
}
```

FLE 内部有两个队列：

```java
sendqueue = new LinkedBlockingQueue<ToSend>();
recvqueue = new LinkedBlockingQueue<Notification>();
```

sendqueue 对应 WorkerSender 线程。revcqueue 对应 WorkerReceiver 线程。

WorkerReceiver 做的事情：

- Response buffer 解析为 Notification
- 当收到没有投票权的节点（observer 或者 non-voting follower）的通知时，直接返回一个自己的当前选票
- 如果当前节点是 LOOKING 状态，则将解析好的 Notification 放进 recvqueue
    - 如果收到的 Notification 是 LOOKING，并且 epoch 比自己低，就告诉对方自己的 epoch
- 如果当前节点不是 LOOKING 状态，就告诉对方自己认为的 Leader 是什么

WorkerSender 做的事情：

- 根据 ToSend 中 sid 不停发送

## logicalclock

```java
AtomicLong logicalclock = new AtomicLong(); /* Election instance */
```

初始值为 0

## lookForLeader

进入 LOOKING 状态时，会进行 lookForLeader

```java
roZkMgr.start();
reconfigFlagClear();
if (shuttingDownLE) {
    shuttingDownLE = false;
    startLeaderElection();
}
setCurrentVote(makeLEStrategy().lookForLeader());
```

此时开始计时：

```java
if (self.start_fle == 0) {
    self.start_fle = Time.currentElapsedTime();
}

// 进入 LEADING 或 FOLLOWING 状态后，start_fle 会重置为 0
```

一开始，给自己投一票，并且发送一轮通知。

```java
synchronized(this){
    logicalclock.incrementAndGet();
    updateProposal(getInitId(), getInitLastLoggedZxid(), getPeerEpoch());
}

LOG.info("New election. My id =  " + self.getId() +
        ", proposed zxid=0x" + Long.toHexString(proposedZxid));
sendNotifications(); // 给其他所有人都发一个通知
```

```java
// notTimeout 初始值 200ms
int notTimeout = finalizeWait;

/**
 * Determine how much time a process has to wait
 * once it believes that it has reached the end of
 * leader election.
 */
final static int finalizeWait = 200;

/**
 * Upper bound on the amount of time between two consecutive
 * notification checks. This impacts the amount of time to get
 * the system up again after long partitions. Currently 60 seconds.
 */
final static int maxNotificationInterval = 60000;
```

开始循环，直到 FLE 停止或者退出 LOOKING 状态

```java
/*
 * Loop in which we exchange notifications until we find a leader
 */

while ((self.getPeerState() == ServerState.LOOKING) && (!stop)){
	/*
	 * Remove next notification from queue, times out after 2 times
	 * the termination time
	 */
	Notification n = recvqueue.poll(notTimeout, TimeUnit.MILLISECONDS);
```

- 当 n 为 null
    - 如果发送队列都为空，则再发一轮 Notification
    - 否则，说明有连接断开了，则 connectAll()
    - 然后倍增 notTimeout（最大值为 maxNotificationInterval=60s）
- 当投票者或者投票者投的 leader 不是有效节点（其他集群的节点）时，就忽略
- 当投票者或者投票者投的 leader 是有效节点时：
    - n.electionEpoch > logicalclock.get()
        
        更新自己的 logicalclock 为 n.electionEpoch，清空 recvset
        
        如果满足 totalOrderPredicate，则更新自己的选票为 n，否则投给自己
        
    - n.electionEpoch < logicalclock.get()
        
        忽略这个 Notification n
        
    - n.electionEpoch == logicalclock.get()
        
        如果满足 totalOrderPredicate，则更新自己的选票为 n
        

recvset 放入 n

如果已经形成共识（投给同个节点的票数过半）则：

- 反复从 recvqueue poll，n = recvqueue.poll(finalizeWait, TimeUnit.MILLISECONDS)。
    - 如果还能 poll 到，说明有节点改变了想法。
    - 如果 n 满足 totalOrderPredicate，则放入 recvqueue，并退出循环，在下一个大循环中处理 n
- 如果已经无法从 recvqueue 中 poll 出 notifaction，则说明没有节点改变想法
    - 根据 n 设置自身状态为 LEADING 或 FOLLOWING
    - 退出 lookForLeader，返回这个 n 作为 endVote

如果当前状态是 LEADING/FOLLOWING，则 lookForLeader 为：

向所有人发送给自己的 notiy

遍历 recvqueue，加入 epoch 相同的到 recvset。满足 Quorum 后，则返回 endVote

如果遍历 recvqueue 时，epoch 跟其他人返回的不同，则加入到 outofelection

## totalOrderPredicate

返回 true 当下面的任意 case 满足：

1. New epoch 更高
2. New epoch 跟 current epoch 相等，但是 new zxid 更高
3. New epoch 与 current epoch 相等，并且 new zxid 与 current zxid 相等，但是 sid 更高

如何判断 notify 来自 LOOKING 时的 lookForLeader？