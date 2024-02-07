/*! For license information please see 886.0ae9bcba.js.LICENSE.txt */
(self.webpackChunkrspress_doc_template=self.webpackChunkrspress_doc_template||[]).push([["886"],{12970:function(e,n,a){"use strict";a.r(n),a.d(n,{default:function(){return c}});var t=a("85893"),i=a("47423");function s(e){let n=Object.assign({h1:"h1",a:"a",pre:"pre",code:"code"},(0,i.useMDXComponents)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.h1,{id:"jvm-thread-stack-size",children:["JVM thread stack size",(0,t.jsx)(n.a,{className:"header-anchor","aria-hidden":"true",href:"#jvm-thread-stack-size",children:"#"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'$ java -XX:+PrintFlagsFinal -version | grep ThreadStackSize\n     intx CompilerThreadStackSize                   = 0                                   {pd product}\n     intx ThreadStackSize                           = 1024                                {pd product}\n     intx VMThreadStackSize                         = 1024                                {pd product}\njava version "1.8.0_131"\nJava(TM) SE Runtime Environment (build 1.8.0_131-b11)\nJava HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)\n\n[root@node131-232 10:17:24 ~]$ ps -efT | grep java | wc -l\n35\n\n1800 + 35 * 1 +\n\nInitialCodeCacheSize\n\n160K (varies)\n\nInitial code cache size (in bytes)\n\nReservedCodeCacheSize\n\n32M/48M\n\nReserved code cache size (in bytes) - maximum code cache size\n\nCodeCacheExpansionSize\n\n32K/64K\n\nCode cache expansion size (in bytes)\n'})})]})}function r(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:n}=Object.assign({},(0,i.useMDXComponents)(),e.components);return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(s,{...e})}):s(e)}var c=r;r.__RSPRESS_PAGE_META={},r.__RSPRESS_PAGE_META["notes%2Fmisc%2Fjvm-thread-stack-size.md"]={toc:[],title:"JVM thread stack size",frontmatter:{}}}}]);