# Docker 명령어들

## # 이미지

### - 이미지 형식

`이미지명[:태그명]`

```
debian:7
debian:latest
```

<br><br><br>

### - 이미지 목록 표시

`docker image ls [option] [repo name]`

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

`docker container run`

<br><br><br>

### - 컨테이너 시작

`docker container start`

<br><br><br>

### - 컨테이너 정지

`docker container stop`

<br><br><br>

### - 컨테이너 삭제

`docker container rm`
