# What is /dev/fd0

VMware guests usually have floppy device in its default hardware configuration. At RHEL installation, the initramfs is built with floppy kernel module because the hardware is present within the configuration. Because of that, /dev/fd0 is always created at boot time within the guest. But the /dev/fd0 is seldom populated with any media image from the VMware hypervisor, so any attempts to read the device result in the I/O error being reported.

The sosreport, parted, and other commands such as third party monitoring tools, when run, interact with storage devices. This interaction typically includes opening the device and attempting io to the device. For sosreport and parted, the io is typically to sector 0 to determine if a partition table exists. With no media present within the virtual floppy drive, the io fails and the messages above results.

Reading from a floppy device when no media is present is expected to return this error, its normal and as such can be safely ignored. However, to prevent these events from appearing in logs the floppy device is often just removed from the VMware configuration for the guest as the floppy is not often (ever?) used within most guests.
