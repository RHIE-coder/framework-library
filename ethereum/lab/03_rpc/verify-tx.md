## # Transaction 구조

 - nonce: 발신 EOA에 의해 발행되어 메시지 재사용을 방지하는 데 사용되는 일련번호
 - gas price
 - gas limit
 - 수신자(recipient): 목적지 이더리움 주소
 - value: 목적지에 보낼 이더의 양
 - data: 가변 길이 바이너리 데이터 페이로드
 - v,r,s: EOA의 ECDSA 디지털 서명의 세가지 구성요소

### # nonce

해당 주소에서 보낸 트랜잭션 건수 또는 연결된 코드가 있는 계정의 경우 이 계정에서 만든 컨트랙트 생성 건수와 동일한 스칼라 값

즉, 논스는 각 계정에서 발생한 확인된(즉, 체인상의) 트랜잭션 건수에 대한 최신 통계

### # gas limit

필요한 가스양은 21,000개의 가스 단위로 고정.

### # recipient

to 필드에 트랜잭션 수시자가 지정되며 20바이트 이더리움 주소를 포함한다.
20바이트 값이 개인키가 없거나 상응하는 컨트랙트가 없는 주소의 경우에도 트랜잭션은 여전히 유효하며, 이더리움은 이 필드를 더는 검증하지 않는다.

### # V, R, S

https://medium.com/rayonprotocol/%EC%9D%B4%EB%8D%94%EB%A6%AC%EC%9B%80-%EA%B3%84%EC%A0%95%EC%9C%BC%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%84%9C%EB%AA%85-%EB%B0%8F-%EA%B2%80%EC%A6%9D-5fb856a96cf4


https://bitkunst.tistory.com/entry/BlockChain-%EA%B0%9C%EC%9D%B8%ED%82%A4-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EC%84%9C%EB%AA%85-%EC%A7%80%EA%B0%91%EA%B3%84%EC%A0%95
