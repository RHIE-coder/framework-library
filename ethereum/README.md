# <<주요 개념들>>

<br><br><br><br><br>

# [Wallet + ETH]

개인키: 256비트의 난수로 구성(64 HEX)

공개키: 개인키 --> ECDSA(Elliptic Curve Digital Signature Algorithm) 타원 곡선 --> 공개키

주소: 공개키 --> Keccak256 --> 64(32바이트) 중 마지막 40(20바이트)을 주소로 사용
 - 오류 탐지 EIP-55
 - National Institute of Science and Technology(NIST) 주최 SHA-3에서 우승한 Keccak을 이더리움이 개발 때 사용 but, NIST가 효율성 향상을 위해 코드를 수정했는데 결함이 발생해 FIP-202 SHA-3 표준화가 늦음.
 - 결국 이더리움 에서 사용하는 SHA-3 알고리즘과 NIST 표준 SHA-3 알고리즘은 결과가 다름.
 - EIP-59를 통해 SHA-3 네이밍을 고민한 것을 볼 수 있음. https://github.com/ethereum/EIPs/issues/59

https://steemit.com/kr-dev/@modolee/mastering-ethereum-3 (EIP55)

https://steemit.com/busy/@anpigon/ethereum-3(r,s,v 값에서 발신자 공개키 계산)

 - https://github.com/ethereum/go-ethereum/blob/v1.10.26/crypto/secp256k1/secp256.go
      - `func RecoverPubKey`

`BN` : Block Number (타원곡선 알고리즘 변수로 나온 약자)

## # 비트코인 지갑

PubKey ==> SHA256 ==> RIPEMD160(160bits key hash) ==> Base58Check ==> Bitcoin Address

## # 서명 원리

### - Transaction Hash 값

#### Transaction Data
 - nonce
 - gas_price
 - gas_limit
 - chain_id
 - recipient_address
 - amount
 - payload

```
Transaction Data
    |
    | 
RLP:serialization 이더리움에서 쓰이는 직렬화 기법
    |
    |
Keccak
    |
    |
TransactionHash (32 byte)
```

#### Signature Data
 - r: 32 byte
 - s: 32 byte
 - v: `EIP155` chain_id 포함(Replay 어택 방지). 실제 서명정보 확인시 1 byte의 recid(recognize_id)만 사용
    - 각 블록체인 네트워크마다 chain_id가 다르기 때문에 같은 트랜젝션으로 여러 네트워크에 브로트캐스팅되는 것을 방지할 수 있다.

```
secp256k1 sign(Transaction Hash 32 byte, Private Key 32 byte) => Signature Data(r,s,v)
```

#### SignedTransaction

```
SignedTransaction = Transaction Data + Signature Data
```

## # HD Wallet

```
m / purpose' / coin_type' / account' / change / address_index
```

 - purpose: BIP44(BIP32에서 제안 되었고, BIP44에서 개선)
 - coin_type: 코인 번호
 - account: 계정(Addresses)
 - change: 0(내부체인) 1(외부체인)
 - address_index: n번째 지갑(`자식키(0번부터 2^32 -1번) : 총 2^32개`)

 만약 이더리움 지갑을 개발한다면 BIP-32, BIP-39, BIP-43, BIP-44 표준에 따라 니모닉 코드를 시드로 사용하는 HD지갑으로 구현

```
Root Seed(128, 256, 512 bit) --> HMAC-SHA512
HMAC-SHA512 왼쪽 256비트 ---> 마스터 개인키(256) --> 마스터 공개키(264)
HMAC-SHA512 오른쪽 256비트 --> 마스터 체인코드(256)
```

### - 메타마스크(HD Wallet) 관련

 - [How to use the Valut Decryptor with the MetaMask Vault Data](https://metamask.zendesk.com/hc/en-us/articles/360018766351-How-to-use-the-Vault-Decryptor-with-the-MetaMask-Vault-Data)
    - [decrypt.js](https://github.com/nujabes403/metamaskVaultDecrypt/blob/418dcf103060cc0102c2d93e2d502c7caf7021ca/decrypt.js#L166)

# [DApp]

# [Layer]

비트코인과 이더리움은 Layer 1

## # Layer 2가 필요한 이유

레이어 2는 이더리움을 확장하는 별도의 블록체인

Three desirable properties of a blockchain are that it is decentralized, secure, and scalable. The blockchain trilemma states that a simple blockchain architecture can only achieve two out of three.

레이어 2 체인은 이더리움의 보안을 상속하므로 이상적으로는 L1 이더리움만큼 안전합니다. 그러나 다양한 프로젝트가 아직 시작 단계이고 다소 실험적입니다. 수년간의 연구 개발 끝에 이더리움을 확장할 많은 L2 기술이 2021년에 출시되었습니다. 여러 프로젝트에서 네트워크를 탈중앙화하기 위해 작업하면서 여전히 추가적으로 신뢰할 수 있는 가정을 세웁니다. 관련된 위험을 감수할 수 있는지 결정하기 위해 항상 자체 조사를 수행하십시오.

레이어 2의 기술, 위험 및 신뢰 가정에 대한 자세한 내용은 각 프로젝트의 포괄적인 위험 평가 프레임워크를 제공하는 L2BEAT를 확인하는 것이 좋습니다.

### - 작동방식

레이어 2 블록체인은 기존 블록체인과 비슷한 보안과 탈중앙화 방식을 보장하기 위해 정기적으로 이더리움과 통신(트랜잭션 묶음을 제출)합니다. 이는 레이어 1 프로토콜(이더리움)을 변경하지 않고도 가능합니다. 이렇게 레이어 1은 보안, 데이터 가용성 및 탈중앙화를 가능하게 하는 한편 레이어 2는 확장에 집중할 수 있습니다. 레이어 2는 레이어 1의 거래 부담을 줄여주고 최종적인 증명을 다시 레이어 1로 보냅니다. 이러한 방식으로 레이어 1의 트랜잭션 부하를 완화하여 기반 계층이 더 여유로워지면서 모든 것을 확장할 수 있습니다.

#### 롤업

롤업(Rollup)은 현재 이더리움 확장에 선호되는 레이어 2 솔루션입니다. 롤업을 사용하여 사용자는 레이어 1에 비해 가스 요금을 최대 100배까지 절감할 수 있습니다.

롤업은 수백 개의 트랜잭션을 레이어 1의 단일 트랜잭션으로 묶습니다.

롤업 트랜잭션은 레이어 1 외부에서 실행되지만 트랜잭션 데이터는 레이어 1에 게시됩니다. 트랜잭션 데이터를 레이어 1에 게시함으로써 롤업은 이더리움의 보안을 상속합니다.

 - Optimistic rollups: 트랜잭션이 유효한 것으로 가정되지만 필요한 경우 이의 제기. 유효하지 않은 트랜잭션이 의심되는 경우 오류 증명이 실행
 - Zero-Knowledge rollups: 트랜잭션이 오프체인에서 계산되는 유효성 증명을 사용하고 압축된 데이터가 유효성 증명으로 이더리움 메인넷에 제공

# [NFT]

ERC-721

ERC-1155

최근에는 보다 효율적인 NFT 발행이 가능한 EIP-2309가 등장


# [DeFi]

https://www.coinbase.com/blog/a-beginners-guide-to-decentralized-finance-defi

Stablecoin and Decentralized Reserve Bank: MakerDAO

Borrow and Lend: Compound

Automated Token Exchange: Uniswap

Prediction Markets: Augur

Synthetic Assets: Synthetix

No-loss savings games: PoolTogether

# [DAO]

Decentralized autonomous organizations (DAOs)

회원들이 집합적으로 소유하고 관리하는 인터넷 기반 비즈니스. 룹의 승인 없이는 누구도 접근할 수 없는 내장된 자산을 가지고 있고, 결정은 조직의 모든 사람이 의견을 표출할 수 있도록 제안과 투표를 통해 이루어짐

#### DAO의 근간은 스마트 계약

## # DAO 멤버십 모델

### - 토큰 기반 멤버십

사용되는 토큰에 따라 일반적으로 완전한 권한이 없습니다. 대부분 이러한 거버넌스 토큰은 탈중앙화 거래소에서 허가 없이 거래될 수 있습니다. 나머지는 유동성 또는 기타 '작업 증명'을 제공하여 벌어야 합니다. 어느 방식이든, 단순히 토큰을 보유하면 투표에 대한 접근 권한이 부여됩니다.

 - `MakerDAO` : MakerDAO의 토큰 MKR은 탈중앙화 거래소에서 널리 사용 가능합니다. 따라서 누구나 Maker 프로토콜의 미래에 대한 투표권을 가질 수 있습니다.

### - 주식 기반 멤버십

주식 기반 DAO는 더 많은 권한이 있지만, 여전히 열려 있습니다. DAO 가입 희망자는 누구나 DAO에 가입하기 위한 제안을 제출할 수 있으며, 보통 토큰이나 작업의 형태로 어느 정도의 가치를 제공할 수 있습니다. 주식은 직접 의결권과 소유권을 나타냅니다. 회원들은 비례적 지분을 가지고 언제든지 탈퇴할 수 있습니다.

일반적으로 자선 단체, 근로자 집단 및 투자 클럽과 같이 보다 긴밀하고 인간 중심적인 조직에 사용됩니다. 프로토콜과 토큰도 관리할 수 있습니다.

 - `MolochDAO`: MolochDAO는 이더리움 프로젝트 펀딩에 중점을 두고 있습니다. 그룹에서는 잠재적 수혜자가 정보를 바탕으로 판단을 하는 데 필요한 전문 지식과 자본이 있는지 평가할 수 있도록 멤버십 제안을 요구합니다. 공개 시장에서 단순히 DAO에 대한 액세스 권한을 구매할 수는 없습니다.

 ### - 평판 기반 멤버십

평판은 참여 사실을 나타내며 DAO에서 투표할 수 있는 권한을 제공합니다. 토큰 또는 주식 기반 멤버십과 다르게 평판 기반 멤버십은 기여자에게 소유권을 이전하지 않습니다. 평판은 구매하거나 이전 또는 임의로 부여될 수 없으며 DAO 구성원이 참여를 통해 직접 획득해야 합니다. 온체인 투표에는 권한이 필요하지 않아 원하는 구성원은 자유롭게 DAO 가입 신청을 제출하고 기여에 대한 보상으로 거래소에서 평판과 토큰을 받도록 요청할 수 있습니다.

보통은 분산형 개발 및 프로토콜, 디앱의 운영 방식에 사용되지만, 자선 단체, 노동자 집단, 투자 동아리 등의 다양한 용도의 조직에도 적합합니다

 - `DXdao`: DXdao는 세계적인 주권 집합체이며 2019년부터 분산형 프로토콜 및 애플리케이션을 운영해오고 있습니다. DXdao에서는 자금을 조정하고 관리하기 위해 평판 기반 운영 방식과 홀로그래픽 합의 메커니즘을 사용하며, 이는 아무도 자신의 방식으로 미래에 영향을 미칠 수 없음을 의미합니다.

# 스테이블 코인

스테이블 코인은 변동성이 없는 암호화폐

 ETH와 같은 기능을 공유하지만 가치가 안정적이라 일반 화폐에 더욱 가깝습니다. 따라서 이더리움에서 사용할 수 있는 안정적인 자산에 접근할 수 있습니다

 - Dai
 - USDC
 - Tether

# [DID]

ERC-725