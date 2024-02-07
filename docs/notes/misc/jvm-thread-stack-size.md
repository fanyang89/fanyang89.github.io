# JVM thread stack size

```
$ java -XX:+PrintFlagsFinal -version | grep ThreadStackSize
     intx CompilerThreadStackSize                   = 0                                   {pd product}
     intx ThreadStackSize                           = 1024                                {pd product}
     intx VMThreadStackSize                         = 1024                                {pd product}
java version "1.8.0_131"
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)

[root@node131-232 10:17:24 ~]$ ps -efT | grep java | wc -l
35

1800 + 35 * 1 +

InitialCodeCacheSize

160K (varies)

Initial code cache size (in bytes)

ReservedCodeCacheSize

32M/48M

Reserved code cache size (in bytes) - maximum code cache size

CodeCacheExpansionSize

32K/64K

Code cache expansion size (in bytes)
```
