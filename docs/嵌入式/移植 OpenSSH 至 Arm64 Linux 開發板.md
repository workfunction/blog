---
title: "Corss Compiling OpenSSH for aarch64"
date: "2020-01-21"
permalink: "2020-01-21-openssh-aarch64"
---

# 移植 OpenSSH 至 Arm64 Linux 開發板

## 下載

1、編譯 openssh 需要額外兩個函式庫：openssl 和 zlib，網址如下：

zlib 官方下載：[http://www.zlib.net/](http://www.zlib.net/)

openssl 官方下載：[https://www.openssl.org/source/](https://www.openssl.org/source/)

openssh 官網下載：[https://www.openssh.com/portable.html](https://www.openssh.com/portable.html)

它們之間沒有版本衝突，都下載最新板的即可。
本文以`zlib-1.2.8.tar.gz`、`openssl-1.0.1h.tar.gz`、`openssh-6.6p1.tar.gz` 這三個版本為例，其他版本過程一樣。

## 部署

因為移植過程涉及到三個包，所以先部署好工作資料夾，有利於移植過程的順利進行。

```shell
$ cd                                                  #切換到使用者資料夾
$ mkdir ssh                                           #建立ssh工作資料夾
$ cd ssh                                              #進入ssh資料夾
$ mkdir zlib.install                                  #建立zlib安裝資料夾，移植過程zlib鏡像會安裝到該資料夾
$ mkdir openssl.install                               #建立openssl安裝資料夾，移植過程openssl鏡像會安裝到該資料夾
$ export PATH=$PATH:/usr/local/arm-2010q1/bin/        #設定Corss Compile器路徑到PATH環境變量
$ export CROSS=aarch64-linux-gnu                      #設定Corss Compile目標架構
```

## 複製解壓縮

將 `zlib-1.2.8.tar.gz`、`openssl-1.0.1h.tar.gz`、`openssh-6.6p1.tar.gz` 三個原始碼複製到 ssh 資料夾下，並解壓縮：

```shell
$ tar zxvf zlib-1.2.8.tar.gz
$ tar zxvf openssl-1.0.1h.tar.gz
$ tar zxvf openssh-6.6p1.tar.gz
```

## 編譯 zlib

首先編譯 zlib 成鏡像，供最後編譯 openssh 用。

```shell
$ cd zlib-1.2.8
$ prefix=$HOME/ssh/zlib.install CC=${CROSS}-gcc ./configure
$ vi Makefile
$ make
$ make install
```

這裡第二步設定的時候，prefix 前面沒有`--`，CC 後面是交叉編譯器，`./configure` 要放在最後。完成後，會在指定資料夾 `~/ssh/zlib.install` 下生成鏡像文件。

## 編譯 openssl

編譯 openssl 成鏡像，也是供最後編譯 openssh 用。

```shell
$ cd ../openssl- 1.0 . 1 h
$ ./Configure linux-aarch64 --cross-compile-prefix=${CROSS}- --prefix=$HOME/openssl.install shared
$ make
$ make install
```

其中 `./Configure` 第一個字母是大寫的，交叉編譯使用 `os/compiler` 來指定。

## 編譯 openssh

編譯 openssh 會引用上面編譯的 zlib 和 openssl 的安裝資料夾，如下。

```shell
$ cd ../openssh- 6.6 p1
$ ./configure --host=${CROSS} --with-libs --with-zlib=$HOME/zlib.install --with-ssl-dir=$HOME/openssl.install --disable-etc-default-login
$ make
```

注意：openssh 不需要 `make install`。

## 開發板準備

確保開發板上有以下資料夾，如果沒有可以自己建立：

```shell
/usr/local/bin
/usr/local/etc
/usr/libexec
/var/run
/var/empty
```

### 安裝 zlib

Host 端 `~/ssh/zlib.install/` 資料夾下文件複製到開發板系統中

```shell
$ cp -R ~/ssh/zlib.install/* ${DEV_ROOT}/usr/
```

### 安裝 OpenSSL

Host 端 `~/ssh/openssl.install/` 資料夾下文件複製到開發板系統中

```shell
$ cp -R ~/ssh/openssl.install/* ${DEV_ROOT}/usr/
```

### 安裝 OpenSSH

Host 端 `~/ssh/openssh-6.6p1/` 資料夾下文件複製到開發板系統中

```shell
$ cp scp sftp ssh sshd ssh-add ssh-agent ssh-keygen ssh-keyscan ${DEV_ROOT}/usr/local/bin
$ cp moduli ssh_config sshd_config ${DEV_ROOT}/usr/local/etc
$ cp sftp-server ssh-keysign ${DEV_ROOT}/usr/libexec
```

## 生成 Key 檔

在開發板 `/usr/local/etc/` 資料夾下生成 key 檔：

```shell
$ cd /usr/local/etc/
$ ssh-keygen -t rsa -f ssh_host_rsa_key -N ""
$ ssh-keygen -t dsa -f ssh_host_dsa_key -N ""
$ ssh-keygen -t ecdsa -f ssh_host_ecdsa_key -N ""
$ ssh-keygen -t dsa - f ssh_host_ed25519_key -N ""
```

修改 `ssh_host_ed25519_key` 權限為 600：

```shell
$ chmod 600 ssh_host_ed25519_key
```

## 開發板使用者設定

打開 `/etc/passwd` 文件，在最後添加下面這一行：

```shell
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
```

如果開發板的 root 使用者還沒有密碼，鍵入以下命令然輸入兩次密碼來修改，否其他設備無法連：

```shell
$ passwd root
```

## 測試

最後執行 `sshd` 看看是否啟動

```shell
$ /usr/local/bin/sshd
$ ssh root@127.0.0.1
```

###### 參考：[https://www.veryarm.com/892.html](https://www.veryarm.com/892.html)
