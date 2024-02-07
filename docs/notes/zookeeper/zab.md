# Zab

## zk 是否能够保证线性一致性？
很多人可能会觉得既然 zk 支持线性一致性写，那么也可以通过 sync + read 来支持线性一致性读，理论上这样是可以支持线性一致性读的，但在 zk 真正的实现中是不能严格满足线性一致性的，具体可以参照 jepsen 中的讨论。不能严格满足线性一致性的根据原因就是 zk 在实现过程中并没有将 sync 当做一个空写日志去执行，而是直接让 leader 返回一个 zxid 给 follower，然而此时的 leader 并没有像 raft 那样通过 read index 发起一轮心跳或 lease read 的方式来确保自己一定是 leader，从而可能在网络分区脑裂的 corner case 下返回旧数据，因此无法在严格意义上满足线性一致性。当然，这种 corner case 在实际中很少见，而且也应该可以修复，所以从技术上来讲，zk 应该是可以用 sync + read 来支持线性一致性读的。
[Zookeeper 论文阅读](https://tanxinyu.work/zookeeper-thesis/)

## ZooKeeper vs etcd
前面的 [博客](https://tanxinyu.work/consistency-and-consensus/#%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95) 已经介绍过了，zab 保证的是顺序一致性语义，raft 保证的则是线性一致性语义。尽管他们都可以算强一致性，但顺序一致性并无时间维度的约束，所以可能并不满足现实世界的时序。也就是说，在现实世界中，顺序一致性是可能返回旧数据的。对于一个分布式协调服务，可能返回旧数据实际上是比较坑爹的一件事，尽管 zk 保证了单客户端 FIFO 的顺序，但有些场景还是有一些受限的。因此在这一点上，我认为 etcd 保证的线性一致性是更好的，zk 的顺序一致性有时候会有坑，这一点 PingCAP 的 CTO 也在知乎的”分布式之美”圆桌会谈上吐槽过。
