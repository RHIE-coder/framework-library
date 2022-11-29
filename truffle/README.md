# Truffle Framework
 - blockchain
 - solidity

## # Installation

```bash
npm i -D truffle
```

<hr><br><br><br><br><br>

## # Getting started

### - basic commands

```bash
truffle init
```
스마트 컨트랙트 작성 후 `truffle-config.js` 기반으로 컴파일 진행

```bash
truffle compile
```
리셋을 하지 않으면 이전에 배포된 파일을 제외하고 배포하게 된다.
```bash
truffle migrate --reset
```
접근하기(web3 함수 사용가능)
```bash
truffle console
```

```bash
truffle test test/example.test.js
```

### - directories

1. contracts : Solidity 스마트 컨트랙트 소스
2. migrations : 블록체인 네트워크에 Deploy
3. test : mocha 기반 테스팅
4. build : 컴파일된 스마트 컨트랙트 소스
 - JSON안의 Bytecode는 블록체인 내부에 올라가고 ABI는 웹 어플리케이션에서 사용

<hr><br><br><br><br><br>
