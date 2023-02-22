# Bulk 경량화 작업

```
[TO DO LIST]
 - Bulk 작업용 컨트렉트 작성 완료(보안성 체크 필요, 허용 주소만 받도록 코드 수정 필요)
 - Metamask 지갑 Georli Ether, Gnosis Safe를 통한 스마트 컨트랙트 정상 실행 완료
----------------------------------------------------------------------------
[Essential]
 1. Block Gas limit는 30,000,000으로 알아냈음. But Transaction당 적절한 수준의 Gas Price와 Gas Limit를 계산하여 현실적인 수치 파악 필요(+Gnosis Safe 자체 소모량)
 2. 허용 주소만 받도록 스마트 컨트렉트 코드 수정
 3. Bulk 용량을 조절하여 얼마나 최대한 받을 수 있는지 확인 작업 필요
 4. Georli Testnet을 기준으로 Gnosis Safe를 통한 실제 가스 소모량 파악
----------------------------------------------------------------------------
[Optional]
5. 보안 고려 사항에 의거하여 Contract를 직접 공격함으로써 취약점 탐색 작업, 전체적인 취약점을 잡아낼 수는 없지만 잘 알려진 공격 방식 위주로 컨트렉트 보안 수준 파악
(6. 보안 레벨 업을 위한 코드 수정)
(7. Bulk 용량을 조절하여 얼마나 최대한 받을 수 있는지 확인 작업 필요 + Georli Testnet을 기준으로 Gnosis Safe를 통한 실제 가스 소모량 파악)
----------------------------------------------------------------------------
```



## 1. 테스트 사전준비 및 조사

### (1) 적정 수준 Gas Price와 Gas Limit 값 리서치, 그리고 Gnosis Safe 자체 소모량 체크

 ---

#### -  블록 당 Gas Limit는 30,000,000이고 적정 수준 Gas Limit는 최대 10,000,000으로 보여지나 최대 30,000,000까지도 테스트 예정

아래 트랜잭션은 Bulk 스마트 컨트랙트 관련 트랜잭션들을 분석한 결과 최대까지 본 Gas Limit 관련 정보
 - Reference: 0x4ed6abb53618731c13b726371947da62fa723a5a061350d10e0f0a197161c49e


<br><br><br>

### (2) `London 하드포크 VM`과 `Georli 테스트 네트워크` 간의 실제 Gas 소모량 차이

직접 블록체인 네트워크에 스마트 컨트랙트를 배포하는 것은 실제 지갑에 ETH가 필요하고(테스트 네트워크도 필요) 개발 비용이 많이 들어가며, 테스트 회수가 한정적임.

그래서 거의 제한 없이 테스트 가능하며 코인 잔량도 신경쓰지 않은 환경인 `VM(가상 머신)` 환경에서 대부분 테스트를 진행해야 함. 또한 실제 블록체인 네트워크 노드 환경과 최대한 맞게 셋팅되있음.

그러므로 실제 소모된 Gas량을 바탕으로 `VM` 환경에서 테스트한 값들이 실제 환경과 비슷해야 `VM` 위에 테스트한 결과 값들이 의미 있음.

#### - 결과

`VM`과 `Georli` 두 환경 위에 ERC20 스마트 컨트랙트를 각각 배포하고 소모된 GAS량:

|  | `VM` | `Georli` | 
|:---:|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|1,168,933 gas|1,168,933 gas|

두 환경 모두 똑같은 수치를 나타냈으므로 `VM` 환경 위 테스트 결과는 의미가 있음. 실제로 소모될 ETH 값도 직접 네트워크에 트랜잭션을 발생시키지 않더라도 Gas Price를 곱함으로서 소모량을 예상할 수 있음.

<br><br><br>

## 2. Bulk 용량을 조절하여 얼마나 최대한 받을 수 있는지 확인

### (1) ERC20 스마트 컨트랙트를 호출하는 Delegator 스마트 컨트랙트 작성 및 배포

 ---

#### - 단일 ERC20 transferFrom 직접 호출

| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|60,296 gas|

<br><br><br>

#### - Delegator를 통한 TransferFrom 호출

Delegator는 ERC20 스마트 컨트랙트 주소를 받아 ERC20 함수를 대신 호출해주는 컨트랙트

| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|66,791 gas|

<br><br><br>

#### - `Gnosis Safe`를 통한 TransferFrom 호출

Gnosis Safe를 통해 ERC20 호출

 - Gnosis Safe 주소: `0x7AF49e9CC5C881Cc3746792E85dEfC054A044eba`

| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|108,695 gas|
| 트랜잭션 | 0xe2357cca48129d17124a8d0fbe693d6c4ae63d9e187ba5b83b9d580aab287b79|

<br><br><br>

### (2) Bulk 시도 (30,000,000 GAS Limit)

 ---

#### - 1000개 지갑 대상 Bulk 시도

| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|30,542,861 gas|

GAS 소모 수치 상 실제로 적용하기 어려운 결과. 그래도 결과적으로 건마다 진행하는 것보다 Bulk로 진행하는게 훨씬 Gas 소모를 절약함.

<br><br><br>

#### - 코드 최적화를 통한 GAS 소모 감소 후 재시도

`최적화 목록`
 - Data Location 수정: Memory -> Calldata
 - State Variable을 Memory로 Load
 - Caching 작업
 - Overflow/Underflow에 대한 검증 Unchecking

| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|30,312,719 gas|

코드 측면에서 최대한 최적화할 수 있는 부분을 최적화 했지만 여전히 높은 소모량


<br><br><br>

#### - Low Level 단계 코드(어셈블리 언어 Yul)로 재작업 후 재시도

| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|29,279,981 gas|

약 1,000,000 Gas를 절약했지만 Block Gas Limit에 근접한 수치. 이상이 없는지 실제 테스트 필요

<br><br><br>

## 3. Bulk 용량을 조절하여 얼마나 최대한 받을 수 있는지 `Georli` 및 `Gnosis Safe`를 통해 직접 확인

### (1) 블록체인 네트워크에 스마트 컨트랙트 배포[`Georli`]

 ---

#### - ERC20 Contract

| 항목 | 세부 |
|:---:|:---:|
| 주소 | 0x65A19F336282bD8c7a9B9953FD21Ee6Dd86D5321 |
| GAS 소모 정보 | 1,168,933 |
| 트랜잭션 |0x9a92cad1fae6ebb7f0a7894c797eb9bc4fc2da6d3cd9c8fad342061e17dfb5d6 |

<br><br><br>

#### - Delegator Contract

| 항목 | 세부 |
|:---:|:---:|
| 주소 | 0xD7b82D190e3dD9412107944074B7B74E158dD11b |
| GAS 소모 정보 | 1,004,538 |
| 트랜잭션 |0xca96c5ddd02e70acfafc0a4753d726c8883cc3878d8926584fc90aa52b8611c9 |

#### Gnosis Safe 주소: `0x7AF49e9CC5C881Cc3746792E85dEfC054A044eba`

<br><br><br>

### (2) `Gnosis Safe`를 통한 Bulk 시도 (30,000,000 GAS Limit)

 ---

#### - 1000개 지갑 대상 Bulk 시도(`Georli`)

 - 1000개 지갑 대상 Bulk, 가스 부족으로 인한 시도 불가
    - The batch failed during the simulation throwing error out of gas in the contract
 - `982개 지갑 대상부터 Out of Gas 발생 안함`

<br><br><br>

#### - 982개 지갑 대상 Bulk 시도(`Georli`)
 - 잔액 부족으로 시도 실패 
 - 29,993,498 GAS 필요 (Gas Price는 100 gwei로 잡야할 것으로보임)
 - 총 2.99935 ETH가 필요함

<br><br><br>

########################################

| 항목 | 상세 |
|:---:|:---:|
|`Gas`| gas| 
|`Transaction Cost`| gas|
|`Execution Cost`| gas|

0x40a9ce8d28A44a74386cc7b051015E6753542afF Delegator

| 항목 | 세부 |
|:---:|:---:|
| 테스트 | 0x40a9ce8d28A44a74386cc7b051015E6753542afF | 
| 주소 | 0xD7b82D190e3dD9412107944074B7B74E158dD11b |
| 주소2 | 0xA91BFeE2567be70e4fcE54938B94e4b0A9ad559C |
| GAS 소모 정보 | 1,004,538 |
| 트랜잭션 |0xca96c5ddd02e70acfafc0a4753d726c8883cc3878d8926584fc90aa52b8611c9 |



| 항목 | 상세 |
|:---:|:---:|
|`소모된 Gas(Transaction Cost)`|30,542,861 gas|
| 트랜잭션 |0xca96c5ddd02e70acfafc0a4753d726c8883cc3878d8926584fc90aa52b8611c9 |


#### - 단일 transferFrom 직접 호출[Georli]

| 항목 | 상세 |
|:---:|:---:|
|`TXN FEE`|0.001079423881312128| 
|`GAS PRICE`|24.982037616 Gwei|
|`GAS LIMIT`| 43,208 / 43,208 (100%)|
 - 0x95223f78e6fde68c1279b6c886c3732829ff976c9595b0f6fb217ad93c0f4412 

<br><br><br>

#### - 단일 transferFrom `Gnosis Safe`를 통한 호출[Georli] (3명 중 2명 합의)

| 항목 | 상세 |
|:---:|:---:|
|`트랜잭션 생성(execution)`|0.01048 GOR / 0.00240139 GoerliETH|
|`TXN FEE`|0.0024810834948387| 
|`GAS PRICE`|23.92420395 Gwei|
|`GAS LIMIT`|104,825 / 103,706 (98.93%)|
 - 0x5f62aca302f0c2f315513c751e30417be3a7f0f034153406c36746782df91e33



 - 새로운 Air

0x0399902d320A8C2D98E57075a37E1A5F05326EE5

0x77232F7DC25D988030CDE7e8F7e9a500Da9919D3

0x9576aA567Ac1da39BdC1D4d0f8AAb615d59592E6

 - Delegator

0xC08964D89714BD6573321a9d1ca3c0Dc347f1aeC

```sol
    function bulkDelegateTransfer(address[] calldata _receivers, uint _amount) public {
        IERC20 _token = token;
        uint len = _receivers.length;

        for(uint i = 0; i < len; ) {
            _token.transfer(_receivers[i], _amount);
            
            unchecked {
                ++i;
            }
        }
    }
```

