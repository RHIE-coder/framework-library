# Domain Name System

 - `hosts` file

```
123.123.123.123 example.com
```

실제 이미 네이밍 된 호스트라도 우선순위를 갖게됨.

hosts 파일 변조 공격 조심

## # History

### - 초창기

이전에는 공신력 있는 기관이 hosts를 관리 Stanford Research Institute

이 때는 hosts 파일을 가져와야하고 모든 주소를 갖게되면 문제가 생김

### - DNS가 등장 후 1983년

랜을 연결한 순간 인터넷 서비스 프로바이더(ISP)가 자동으로 어떤 DNS 서버를 사용할지 설정해줌(통신사).

즉, 운영체제 내부적으로 DHCP를 통해 자동으로 DNS Server가 설정됨

개인정보 이슈

### - Public DNS

신뢰하는 Public DNS 서버를 따로 설정할 수 있음

 - Example) 8.8.8.8 + For Redundancy(안정성을 위한 보조 서버)8.8.4.4
 - Example) 1.1.1.1 / 1.0.0.1 

## # DNS structure

`blog.example.com.`

상위가 하위를 알아야 함(직속만). ex) com.은 blog.를 알지 못함

모든 컴퓨터는 Root Name Server의 ip를 알고 있음

### - ICANN

DNS 정점은 ICANN이라는 비영리 단체가 존재

 - 전세계 IP 주소 관리
 - Root NS들 관리(누가 어떤(com, org) 루트 네임을 관리하는가)

`ICANN` -- `Registry(등록소)` -- `Registrar(등록대행자)` -- `Registrant(등록자)`

 - Root Name Server -- Top-level Domain -- Authoritative Name Server

#### * Registration

 0. Root Name Server에 .com 도메인 상위로서 (com NS mng-com-server.net)이 등록되어 있음
 1. 등록자 --(example.com NS reg.agent.net)--> 등록대행자
 2. 등록대행자 --(example.com NS reg.agent.net)--> 등록소(com) [대신 등록해주는 프로세스]
 3. Top-level Domain에 (example.com NS reg.agent.net) 등록됨
 4. 등록자 --(example.com A 123.123.123.123)--> 등록대행자
 5. Authoritative Name Server에 (example.com A 123.123.123)이 등록됨

##### NS, A는 레코드 타입이라고 함
##### CNAME을 통해 별명을 지을 수 있음: 도메인에 대한 또다른 도메인(canonical name)

#### * Query

##### Client asks ISP

(1) Client가 example.com으로 요청 보냄
(2) [GOTO] 통신사 DNS Server(168.126.63.1)
(3) [CHECK] . NS root-server.net
(4) [GOTO] ICANN(Root Name Server)

##### Root Name Server(.)

(1) Client가 example.com으로 요청 보냄
(2) [CHECK] com NS mng-com-server.net
(3) [GOTO] mng-com-server.net

##### Top-level Domain(.com)

(1) Client가 example.com으로 요청 보냄
(2) [CHECK] example.com NS reg.agent.net
(3) [GOTO] reg.agent.net

##### Authoritative Name Server(reg.agent.net)

(1) Client가 example.com으로 요청 보냄
(2) [CHECK] example.com A 123.123.123.123
(3) [GOTO] 123.123.123.123

nslookup을 통해 응답 받을 때 만일 Non-authoritative answer이라면 캐싱된 IP를 가져온 것 

