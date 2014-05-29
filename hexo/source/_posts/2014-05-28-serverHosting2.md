title: '서버호스팅 운영 가이드'
date: 2014-05-26 19:52:41
tags: 'test'
categories: 'IT'
---
## 운영 가이드
### 상용 linux 명령어
####
####

### vi 기초 명령어

* ref: [VI 에디터 사용법](https://wiki.kldp.org/KoreanDoc/html/Vim_Guide-KLDP/Vim_Guide-KLDP.html)

<div class="fluid-width-video-wrapper" style="padding-top: 50%;">
<iframe src="//www.youtube.com/embed/qYodWEKCuGg" frameborder="0" allowfullscreen="" id="fitvid604561">
</iframe>
</div>

<!-- more -->
1. 실행, 종료
  1) 실행
  ```bash
  $ vi [file]
  ```
  2) 저장(<CR>: 'enter'키)
  - 종료: `:q<CR>`
  - 저장: `:w<CR>`
  - 저장후 종료: `:wq<CR>`
  - 단순 종료: `:q!<CR>`
  3) 명령모드: `<esc>`

2. 편집

1) 입력

type | description
--- | ---
*a* | 커서 위치의 다음 칸부터부터 끼워넣기(append)
`A` | 커서가 있는 줄의 끝에서부터 끼워넣기
**i** | 커서 위치부터 끼워넣기(insert)
i | 커서 위치부터 끼워넣기(insert)
I | 커서가 있는 줄의 맨 앞에서부터 끼워넣기
o | 커서 바로 아래에 줄을 만들고 끼워넣기(open line)
O | 커서 바로 위에 줄을 만들고 끼워넣기



2.

### markdown
* ref: [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)


### git
#### git remote 저장소 이전
* ref: [Git 저장소 변경하기](http://blog.wisedog.net/95)
* ref: [github help::Error: Key already in use](https://help.github.com/articles/error-key-already-in-use)
##### 기존 저장소(github) backup
```bash
$ git init  //(로칼)저장소 생성
$ git remote add mH git@github.com:moonHani/mH.git  //(기존)원격저장소 추가
$ git pull mH --tags  //(기존)원격저장소 백업 (error 시 공개키 생성)
$ git pull mH v0.4.16 //최종 tag pull
$ git remote rm mH //(기존)원격저장소 삭제
$ git remote add mH git@github.com:******e/mH.git //(신규)원격저장소 추가
$ git push mH --tags  //(신규)원격저장소 push all tags (error 시 (기존)원격저장소 deploy key 삭제 후 (신규)원격저장소 deploy key 추가)
```

##### 공개키 생성 및 추가
* ref: [github help::generating-ssh-keys](https://help.github.com/articles/generating-ssh-keys#platform-windows)
```bash
$ cd ~/.ssh //디렉토리 이동
$ ls -al  //key 목록 보기 (list 가 있으면 key 생성 단계 생략)
$ ssh-keygen -t rsa -C "your_email@example.com"
$ ssh-add ~/.ssh/id_rsa
$ clip < ~/.ssh/id_rsa.pub  //복사하기
```
github > setting > Deploy keys > Add deploy key > Ctrl+V(붙여넣기)



### boot init

###
================================================
### mongodb

### mongod

#### file insert
- mongoimport --db bookdb --collection donggam --file /home/git/www/_data/book/json/donggam.json --jsonArray


$ sudo npm install -g mongodb


###@@@ error
forever bookServer.js
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
js-bson: Failed to load c++ bson extension, using pure JS version
connect: multipart: use parser (multiparty, busboy, formidable) directly
connect: limit: Restrict request size at location of read
Express server listening on port 3333


* node REST API
* reference
- <http://mobicon.tistory.com/197>
- <http://www.mongodb.org>
- TooTallNate/node-gyp: <https://github.com/TooTallNate/node-gyp>
- Microsoft Windows SDK for Windows 7 and .NET Framework 4: <http://www.microsoft.com/en-us/download/confirmation.aspx?id=8279>
- nssm: <http://www.nssm.cc/>

========================================================
9. git server 설정
1) git 사용자 계정 설정
$ sudo adduser git    // 사용자 생성, 비밀번호(m*5*****) 입력
$ su git    // git 사용자로 로그인

2) git 사용자의 홈 디렉토리에 SSH-key 등록
$ cd ~    // 홈디렉토리로 이동
$ mkdir .ssh    // .ssh 디렉토리 생성
$ chmod 700 .ssh    // 권한 변경
(ftp 전송: C:\Users\docMoon\.ssh\id_rsa.pub > git@moonhani)
$ cat id_rsa.pub >> ~/.ssh/authorized_keys    // 서버로 공개키를 전송하고 등록@@@@@@@@@
$ chmod 600 ~/.ssh/authorized_keys    // 권한 변경
$ rm -rf id_rsa.pub    // 전송받았던 사용자키 삭제


3) git 계정 접속 제한(@@@@@@@@@@@확인요.... 4)번에서 에러가 발생하여 다시 돌려놓았음@@@)
$ sudo vi /etc/passwd  //vi가 서툴다면 ftp로 전송받아 변경후 재전송
git:x:1001:1001:,,,:/home/git:/bin/bash
=> git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

4) git 저장소 생성
$ cd ~    // git 사용자로 로그인한 상태에서 홈디렉토리로 이동(git 계정 로그인 불가시 root로 $ cd home/git 하면 안됨!!!!!!!!!)
$ mkdir repos    // 저장소로 사용할 디렉토리 생성
$ cd repos
$ mkdir test_project.git
$ cd /home/git/repos/test_project.git
$ git init --bare --shared  //원격(remote) 저장소의 경우 워킹디렉토리가 없는 저장소이다.  일반적인 로컬 저장소 생성의 명령어에 --bare 옵션을 주면 원격저장소가 만들어지고 --shared 옵션을 주면 자동으로 그룹 쓰기 권한을 추가한다.

5) 접근 테스트
$ git clone ssh://git@서버주소:/home/git/repos/test_project.git  //클라이언트에서 리모트 저장소를 내려받는다.(git clone ssh://git@moonhani.com:/home/git/repos/test_project.git) (> git remote add test git@moonhani.com:/home/git/repos/test_project.git)
$ git remote remove origin  //기존에 사용하던 remote 제거하기

6) 퍼미션
insufficient permission for adding an object to repository database ./objects  //레파지토리 퍼미션에 문제가 있다면 다음 오류 구문을 보게 될것이다.  //해당 레파지토리로 이동해서 다음을 실행하자.
$ cd /home/git/repos
$ sudo chmod -R 770 *

$ sudo git config core.sharedrepository true  //그래도 안된다면 다음과 같이 sharedrepository옵션을 true로 지정하자.

7) remote server work tree
* ref : [Automatically Deploying Website From Remote Git Repository](http://caiustheory.com/automatically-deploying-website-from-remote-git-repository)

** remote server: git 계정으로 login 후!!!(root 계정으로도 확인요@@@)
$ cd /home/git/repos
$ mkdir www.git && cd www.git
$ git init --bare --shared
$ mkdir /home/git/www
$ cat > hooks/post-receive  //hooks는 /home/git 디렉토리 내에서만 가능@@@
#!/bin/sh
GIT_WORK_TREE=/home/git/www git checkout -f
$ chmod +x hooks/post-receive

** local: DOS prompt로 가능
$ git init
$ git remote add www git@moonhani.com:/home/git/repos/www.git
$ commit
$ git push www +master:refs/heads/master //처음부터 git push blog master 로 하면 안되는지 확인

10. hexo
* ref: [Hexo](http://hexo.io/)
1) 설치
$ sudo npm install -g hexo
$ cd /home/git/www/
$ hexo init hexo //뒤에 hexo는 folder 이름
$ cd hexo //hexo는 folder 이름
$ npm install
$ hexo server //default port:4000

2) forever
$ cd /home/git/www/hexo
$ npm install hexo --save
$ vi app.js
require('hexo').init({command: 'server'});
$ forever start app.js

3) modify _config.yml  //config 변경은 server 재시작해야 반영됨
(forever stop app.js / forever start app.js)

4) generate, deploy(moonhani root 계정으로..)
$ hexo generate --deploy
$ hexo deploy --generate
(공개키 생성(moonhani server root 계정에서) 및 추가(https://github.com/moonHani/blog/settings/keys))

/* hexo로 대체
10. ruby, jekyll 설치
(test할 때, apt-get으로 뭔가 설치했는데... $ gem -v 으로 확인요!!!)
$ sudo apt-get install ruby1.9.1-dev
$ gem install jekyll
*/


nodejs, forever
$ ps -ef | grep node
$ kill



## hexo blog platform
### themes
#### Landscape

#### Nut
* [nut:git](https://github.com/seff/nut)
* [nut:demo](http://nutinn.com/)

##### Installation

1. Install
```bash
$  cd /home/git/www/hexo
$ git clone https://github.com/seff/nut.git themes/nut
```

```bash
npm install lodash --save
npm install marked --save
```
2. setting
  1) Modify theme setting in `/_config.yml` to nut.
  2) Modify `thems/nut/_config.yml`
    (1) menu:
    (2)

3. Update
```bash
cd themes/nut
git pull
```
Configuration

Most of the configurations are the same with Landscape, but the following.

pages:
- about
- wiki

wiki_dir: wiki
wiki_info:

home_widgets:
- search
- category
- tag
- archive
- blogroll
act_widgets:
- search
- recent_posts
- blogroll
post_widgets:
- nav
- post_date
- post_category
- post_tag

links:
- name: My Github
  url: https://github.com/
  logo: github
pages - Pages that will appear on navigation bar, you must create it first.
wiki_dir - Wiki directory name which locates in the source directory, the root directory of wiki should not create any file, the index file is generated automatically.
wiki_info - Description of your wiki.
home_widgets - Widgets displaying in the home page.
act_widgets - Widgets displaying in the archives page, categories page and tags page.
post_widgets - Widgets displaying in the post page.
links - Links displaying in the blogroll widget.
name - The name of the link.
url - The url of the link.
logo - The logo of the link, which should place the last words of the Font Awesome style, for example, you should assign github here for the github page link whose Font Awesome style is fa fa-github.





=====================================
## 댓글
### disqus

- _config.yml 의 disqus 항목은 변경 필없음?
- hexo/theme/layout/_partial/post/head.ejs 에 자바스크립트 embed 삽입
- hexo/theme/layout/_partial/post/after-footer.ejs 를 변경하면 LiveRe를 넣을 수 있을 것 같음

### LiveRe

LiveRe

* twitter
- 이름: moonhani
- 이메일: monwater@hotmail.com
- 아이디: moonjsam

* LiveRe
- 코드이름: moonhani
- 사이트 URL : www.moonhani.com
- 코드 :
<!-- 1. 아래 스크립트는 페이지의 <head></head> 영역에 삽입하시기 바랍니다. -->
<script type="text/javascript" src="//101.livere.co.kr/js/livere8_lib.js" charset="utf-8"></script>

<!-- 2. 아래 코드는 라이브리를 설치하시고자 하는 위치에 삽입하시기 바랍니다. -->
<div id="livereContainer">
	<script type="text/javascript">
		var consumer_seq 	= "200";
		var livere_seq 		= "20173";
		var smartlogin_seq 	= "228";

		var title = 해당 게시물 제목
		var refer = http://를 제외한 해당 페이지 URL ( ex : www.moonhani.com/글번호 )

		livereReply = new Livere( livere_seq , refer , title );
		livereLib.start();
	</script>
</div>

========================================
git 저장소 추가

D:\dev\moonHani\www
$ git remote add mb https://github.com/monblue/www.git