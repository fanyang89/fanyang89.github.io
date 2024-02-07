# inode 占用

```
[root@node32 14:44:43 ~]$tune2fs -l /dev/md127
tune2fs 1.42.9 (28-Dec-2013)
Filesystem volume name:   <none>
Last mounted on:          /
Filesystem UUID:          c897d367-28cd-4415-a0cd-3cadba4a9e9a
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent 64bit flex_bg sparse_super large_file huge_file uninit_bg dir_nlink extra_isize
Filesystem flags:         signed_directory_hash 
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              5570560
Block count:              22265600
Reserved block count:     1113280
Free blocks:              8848551
Free inodes:              5308982
First block:              0
Block size:               4096
Fragment size:            4096
Group descriptor size:    64
Reserved GDT blocks:      1024
Blocks per group:         32768
Fragments per group:      32768
Inodes per group:         8192
Inode blocks per group:   512
Flex block group size:    16
Filesystem created:       Sun Apr  9 22:28:26 2023
Last mount time:          Tue Sep 26 19:21:04 2023
Last write time:          Tue Sep 26 19:21:02 2023
Mount count:              9
Maximum mount count:      -1
Last checked:             Sun Apr  9 22:28:26 2023
Check interval:           0 (<none>)
Lifetime writes:          13 TB
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:               256
Required extra isize:     28
Desired extra isize:      28
Journal inode:            8
First orphan inode:       393230
Default directory hash:   half_md4
Directory Hash Seed:      9c7937f9-1036-4f70-9584-ed3dd2867134
Journal backup:           inode blocks

[root@node32 14:44:55 ~]$df -h /dev/md127
Filesystem      Size  Used Avail Use% Mounted on
/dev/md127       84G   73G  6.8G  92% /

Reserved block count:     1113280
Block size:               4096
256 * 5570560
1113280 * 4k
```
