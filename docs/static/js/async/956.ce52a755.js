/*! For license information please see 956.ce52a755.js.LICENSE.txt */
(self.webpackChunkrspress_doc_template=self.webpackChunkrspress_doc_template||[]).push([["956"],{62261:function(e,d,a){"use strict";a.r(d),a.d(d,{default:function(){return l}});var n=a("85893"),s=a("47423");function r(e){let d=Object.assign({h1:"h1",a:"a",h2:"h2",pre:"pre",code:"code"},(0,s.useMDXComponents)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(d.h1,{id:"dm-delay",children:["dm-delay",(0,n.jsx)(d.a,{className:"header-anchor","aria-hidden":"true",href:"#dm-delay",children:"#"})]}),"\n",(0,n.jsxs)(d.h2,{id:"\u7B80\u5355\u4F7F\u7528",children:["\u7B80\u5355\u4F7F\u7528",(0,n.jsx)(d.a,{className:"header-anchor","aria-hidden":"true",href:"#\u7B80\u5355\u4F7F\u7528",children:"#"})]}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-bash",children:'# \u521B\u5EFA\u4E00\u4E2A 10G \u5927\u5C0F\u7684 ram disk\nsudo modprobe brd rd_nr=1 rd_size=1048576\nsudo blockdev --getsize /dev/ram0\n\n# \u521B\u5EFA delayed dm\uFF0C\u5EF6\u8FDF\u4E3A 500ms\nexport RAM_SIZE=$(blockdev --getsize /dev/ram0)\necho "0 $RAM_SIZE delay /dev/ram0 0 500" | sudo dmsetup create delayed\n\n# \u91CD\u65B0\u52A0\u8F7D\u53C2\u6570\necho "0 $RAM_SIZE delay /dev/ram0 0 500" | sudo dmsetup reload delayed\n'})}),"\n",(0,n.jsxs)(d.h2,{id:"delayed-\u53C2\u6570",children:["delayed \u53C2\u6570",(0,n.jsx)(d.a,{className:"header-anchor","aria-hidden":"true",href:"#delayed-\u53C2\u6570",children:"#"})]}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-bash",children:"<device> <offset> <delay> [<write_device> <write_offset> <write_delay> [<flush_device> <flush_offset> <flush_delay>]]\n"})}),"\n",(0,n.jsxs)(d.h2,{id:"\u6682\u505C-io",children:["\u6682\u505C I/O",(0,n.jsx)(d.a,{className:"header-anchor","aria-hidden":"true",href:"#\u6682\u505C-io",children:"#"})]}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-bash",children:"sudo dmsetup suspend /dev/dm-0\nsudo dmsetup resume  /dev/dm-0\n"})}),"\n",(0,n.jsxs)(d.h2,{id:"\u68C0\u67E5-delayed-\u8BBE\u5907\u7684-io-\u5EF6\u8FDF",children:["\u68C0\u67E5 delayed \u8BBE\u5907\u7684 I/O \u5EF6\u8FDF",(0,n.jsx)(d.a,{className:"header-anchor","aria-hidden":"true",href:"#\u68C0\u67E5-delayed-\u8BBE\u5907\u7684-io-\u5EF6\u8FDF",children:"#"})]}),"\n",(0,n.jsx)(d.pre,{children:(0,n.jsx)(d.code,{className:"language-bash",children:"fio --name a --filename=/dev/dm-0 --bs=4k --rw=randread --ioengine=libaio --direct=1 --iodepth=1 --numjobs=1 --time_based=1 --runtime=10\nfio --name a --filename=/dev/dm-0 --bs=4k --rw=randread --ioengine=sync --direct=1 --iodepth=1 --numjobs=1 --time_based=1 --runtime=10\n"})})]})}function i(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:d}=Object.assign({},(0,s.useMDXComponents)(),e.components);return d?(0,n.jsx)(d,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}var l=i;i.__RSPRESS_PAGE_META={},i.__RSPRESS_PAGE_META["notes%2Flinux%2Fdm-delay.md"]={toc:[{text:"\u7B80\u5355\u4F7F\u7528",id:"\u7B80\u5355\u4F7F\u7528",depth:2},{text:"delayed \u53C2\u6570",id:"delayed-\u53C2\u6570",depth:2},{text:"\u6682\u505C I/O",id:"\u6682\u505C-io",depth:2},{text:"\u68C0\u67E5 delayed \u8BBE\u5907\u7684 I/O \u5EF6\u8FDF",id:"\u68C0\u67E5-delayed-\u8BBE\u5907\u7684-io-\u5EF6\u8FDF",depth:2}],title:"dm-delay",frontmatter:{}}}}]);