# ESXi 7.0 如何删除 VMFSL

最佳方式是在安装ESXi的时候，引导后，按Shift+O键。  
敲以下命令：

```bash
autoPartitionOSDataSize=8192
```

注意大小写，回车安装即可。

![](/assets/Pasted%20image%2020220309154940.png)
