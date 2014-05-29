title: '서버호스팅 설치가이드'
date: 2014-05-26 19:52:41
tags: 'test'
categories: 'IT'
---
## 개요
### 용도

### 호스팅 방법 / 업체 선정
1. 호스팅 방법: 가상서버호스팅
<!-- more -->
2. 업체:
  - [스쿨호스팅](https://www.phps.kr/)
  - Linux 가상서버호스팅 / 절약형(메모리 512M/하드용량 20G / 트래픽 120G(월) / 공인IP 1개
  - Ubuntu 12.04(64bit)
  - id: moonhani / pw: **%*****

### 도메인 구입
  * moonhani.com: 2년/21,120
  * moonhani.co.kr: 2년/24,200
  * 신청시 영문 주소: 47, Gujwa-ro, Gujwa-eup, Jeju-si, Jeju-do, 695-973 Rep. of KOREA
 * 영문 주소 검색: <http://www.epost.go.kr/search/zipcode/search5.jsp?key=road>


## 각종 프로그램 설치
### local
* puTTy : SSH 접속용
* filezilla : ftp / sftp 접속용 (추후 sublime text3 SFTP로 교체)

### remote server
#### ftp server(VSFTPD)
* ref: [우분투 FTP서버구축(vsftpd)](http://rocky2010aaa.blogspot.kr/2013/04/ftpvsftpd.html)
```bash
$ sudo dpkg -l|grep ssh  // ftp 설치여부 확인
$ sudo apt-get install vsftpd  //(시냅틱에서 svftpd를 검색해서 설치해도 무관)
$ netstat -ntl  //서비스 확인
```
* 설정 파일: /etc/vsftpd.conf // 상세내용은 ref 확인

#### nodejs
* ref: [nodejs 설치](http://mcchae.egloos.com/11072983)
```bash
$ sudo apt-get install python-software-properties python g++ make
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```

#### nodejs package(npm)
```bash
export NODE_PATH=/usr/lib/node_modules:$NODE_PATH
```

```bash
# npm install -g socket.io
# sudo npm install -g express@3.8.0 //(express 4.* 는 middleware가 삭제되어 테스트에 부적합)
# sudo npm install -g express@3.8.0
```

#### git
* ref: [우분투 Git 서버 구축](http://webdir.tistory.com/220)
```bash
$ sudo add-apt-repository ppa:git-core/ppa
$ sudo apt-get update
$ sudo apt-get install git-core
$ git version
```

#### mongodb
* ref : [mongodb Install on Ubuntu](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/)
```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
$ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
$ sudo apt-get update
$ sudo apt-get install mongodb-org
//$ sudo apt-get install mongodb-org=2.6.1 mongodb-org-server=2.6.1 mongodb-org-shell=2.6.1 mongodb-org-mongos=2.6.1 mongodb-org-tools=2.6.1
```

```bash
$ sudo /etc/init.d/mongod start
$ sudo /etc/init.d/mongod stop
$ sudo /etc/init.d/mongod restart
```

```bash
$ sudo npm install -g mongodb
```

#### npm forever
$ npm install forever -g
$ forever start /var/www/testServer.js
$ forever list