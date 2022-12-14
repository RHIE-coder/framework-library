# Docker 명령어들

## # 이미지

### - 이미지 형식

`이미지명[:태그명]`

```
debian:7
debian:latest
```

<br><br><br>

### - 이미지 다운로드

`docker image pull [옵션] 이미지명[:태그명]`

<br><br><br>

### - 이미지 목록 표시

`docker image ls [option] [repo name]`

`docker images`

#### 옵션
 - `--all, -a` 모든 이미지 표시
 - `--digests` 다이제스트 표시 여부
 - `--no-trunc` 결과모두 표시
 - `--quiet, -q` 이미지 ID만 표시

#### DCT

Docker Content Trust로 이미지 서명 검증을 하여 위변조된 이미지 활용 방지

```
export DOCKER_CONTENT_TRUST=1 # 1 유효화 / 0 무효화
```

<br><br><br>

### - 이미지 상세 정보 확인

`docker image inspect`

<br><br><br>

### - 이미지 태그 설정

`<Docker Hub 사용자명>/이미지명:[태그명]`

```
docker image tag nginx rhie/webserver:1.0
```

이미지에 별명을 붙일 뿐. 이미지ID가 똑같음.

<br><br><br>

### - 이미지 검색

`docker search [옵션] [키워드]`

#### 옵션
 - `--no-trunc` 결과를 모두 표시
 - `--limit` n건의 검색 결과를 표시
 - `filter=stars=n` 즐겨찾기의 수(n 이상)를 지정

#### 주의

Docker Hub에 공개되어 있는 이미지가 모두 안전하지 않으므로 공식이미지 및 Dockerfile이 제대로 공개되어 있는 것을 활용하기

<br><br><br>

### - 이미지 삭제

`docker image rm [옵션] 이미지명 [...이미지명]`

#### 옵션
 - `--force, -f` 이미지를 강제로 삭제
 - `--no-prune` 중간 이미지를 삭제하지 않음

<br><br><br>

### - 사용하지 않은 이미지 삭제

`docker image prune [옵션]`

#### 옵션
 - `--all, -a` 사용하지 않는 이미지 모두 삭제
 - `--force, -f` 이미지를 강제로 삭제

<br><br><br>

### - Docker Hub 로그인

`docker login [옵션] [서버]`

#### 옵션
 - `--password, -p`
 - `--username, -u`

서버명을 지정하지 않으면 Docker Hub에 엑세스됨

 <br><br><br>

### - 이미지 업로드

`docker image push <사용자명>/이미지명[:태그명]`

<br><br><br>

### - Docker Hub 로그아웃

`docker logout [서버]`



<hr><br><br><br><br><br>

## # 컨테이너

### - 컨테이너 생성

`docker container create`

컨테이너를 작성할 뿐 시작하지는 않음

<br><br><br>

### - 컨테이너 실행

`docker container run [옵션] 이미지명[:태그명] [인수]`

#### 옵션
 - `--attach, -a`: STDIN, STDOUT, STDERR에 Attach한다.
 - `--cidfile`: 컨테이너 id를 파일로 출력한다.
 - `--detach, -d`: 컨테이너를 생성하고 백그라운드에서 실행한다.
 - `--interactive, -i`: 컨테이너의 표준 입력을 연다
 - `--tty, -t`: 단말기 디바이스를 사용한다.
 - `--user, -u`: 사용자명 지정
 - `--restart=[no | on-failure | on-failure:n(횟수) | always | unless-stopped]`: 명령의 실행 결과에 따라 재시작을 하는 옵션
 - `--rm`: 명령 실행 완료 후에 컨테이너를 자동으로 삭제
 - `--add-host=[호스트명:IP주소]`: 컨테이너의 `/etc/hosts`에 호스트명과 ip주소를 정의
 - `--dns=[IP주소]`: 컨테이너용 DNS 서버의 IP주소 지정
 - `--expose`: 지정한 범위의 포트 번호를 할당
 - `--mac-address=[MAC주소]`: 컨테이너의 MAC 주소를 지정
 - `--net=[bridge | none | container:<name | id> | host | NETWORK(사용자 정의 네트워크)]`: 컨테이너의 네트워크를 지정
 - `--hostname, -h` 컨테이너 자신의 호스트명을 가짐
 - `--publish, -p[호스트의 포트번호]:[컨테이너의 포트번호]` 호스트와 컨테이너의 포트 매핑
 - `--publish-all, -P` 호스트의 임의의 포트를 컨테이너에 할당
 - `--cpu-shares, -c` CPU 사용 배분
 - `--memory, -m` 사용할 메모리를 제한하여 실행(unit: b k m g)
 - `--volume=[호스트의 디렉토리]:[컨테이너의 디렉토리], -v` 호스트와 컨테이너의 디렉토리를 공유
 - `--env=[환경변수], -e` 환경변수를 설정
 - `--env-file=[파일명]` 환경변수를 파일로부터 설정
 - `--read-only=[true | false]` 컨테이너의 파일 시스템을 읽기 전용으로 만듬
 - `--workdir=[경로], -w` 컨테이너의 작업 디렉토리 지정. 컨테이너에 들어갈 때 기본으로 잡히는 경로.
 - `--user=[사용자명], -u` 사용자명 또는 UID 지정

```sh
docker container run -it --name "my-os" ubuntu /bin/bash
docker container run -d -p 8080:80 nginx
```

#### tty, pty

 - `tty`: teletypewriter 항목은 리눅스 디바이스 드라이브 중에서 콘솔이나 터미널을 의미함
 - `pty`: 본체에 LAN으로 연결된 모드(원격 접속, 가상터미널pseudo-terminal)
 

#### bash prompt

 - `#`: root
 - `$`: user

#### --restart

 - `no`: 재시작안함
 - `on-failure`: 종료 status가 0이 아닐 때 재시작
 - `on-failure:n`: `on-failure` 옵션에 n번 재시작
 - `always`: 항상 재시작
 - `unless-stopped`: 정지상태가 아니라면 항상 재시작

<br><br><br>

### - 컨테이너 목록

`docker container ls [옵션]`

#### 옵션

 - `--all, -a`: 실행 중/정지 중인 것도 포함. 모든 컨테이너 표시
 - `--filter, -f`: 표시할 컨테이너의 필터링
 - `--format`: 표시 포맷 지정
 - `--last, -n`: 마지막으로 실행된 n건의 컨테이너만 표시
 - `--latest, -l`: 마지막으로 실행된 컨테이너만 표시
 - `--no-trunc`: 정보를 생략하지 않고 표시
 - `--quiet, -q`: 컨테이너 ID만 표시
 - `--size, -s`: 파일 크기 표시

<br><br><br>

### - 컨테이너 가동 확인

`docker container stats [컨테이너 식별자]`

`CTRL+c`로 종료


<br><br><br>

### - 컨테이너 시작

`docker container start [옵션] <컨테이너 식별자> [컨테이너 식별자]`

#### 옵션

 - `--attach, -a` 표준 출력, 표준 오류 출력을 연다
 - `--interactive, -i` 컨테이너의 표준 입력을 연다

<br><br><br>

### - 컨테이너 정지

`docker container stop [옵션] <컨테이너 식별자> [컨테이너 식별자]`

#### 옵션
 - `--time, -t` 컨테이너의 정지 시간을 지정(기본값은 10초)

<br><br><br>

### - 컨테이너 재시작

`docker container restart [옵션] <컨테이너 식별자> [컨테이너 식별자]`

#### 옵션
 - `--time, -t` 컨테이너 재시작 시작을 지정(기본값은 10초)

<br><br><br>

### - 컨테이너 삭제

`docker container rm [옵션] <컨테이너 식별자> [컨테이너 식별자]`

#### 옵션
 - `--force, -f` 실행 중인 컨테이너를 강제로 삭제
 - `--volumes, -v` 할당한 볼륨을 삭제

<br><br><br>

### - 컨테이너 중단/재개

`docker container pause <컨테이너 식별자>`

`docker container unpause <컨테이너 식별자>`

<hr><br><br><br><br><br>

## # 도커 컨테이너 네트워크

Docker 컨테이너끼리 통신은 Docker 네트워크를 통해 수행함

### - 네트워크 목록 표시

