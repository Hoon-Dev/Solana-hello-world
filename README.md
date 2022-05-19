# Solana hello world

본 프로젝트는 솔라나 블록체인에서 온체인과 오프체인의 간단한 상호작용을 하는 프로젝트 입니다.

### 📝 프로젝트 구성
* Rust로 작성된 온체인 프로그램
* Typescript로 작성된 오프체인 프로그램

### 📚 프로젝트 요구사항
* [Solana-cli 1.9.20 ...](https://imaginary-cod-c0e.notion.site/Cluster-in-M1-a3dba133b22d4d9a96ab38998d44bf2f)
* Node.js LTS (최소 v14 권장)
* 만약 윈도우라면 WSL로 리눅스 환경 권장

# 네트워크에 컨트랙트 배포

## ⚙️ Cli 설정

1. 개발용이므로 lamport 소요되지 않게 클러스터 변경

```bash
solana config set --url localhost
```

2. 키페어(지갑) 생성

만약 기존에 보유하고 있는 키페어가 없다면

```bash
solana-keygen new
```

[만약 phamtom으로 지갑을 보유하고 있다면 클릭 ...](https://imaginary-cod-c0e.notion.site/Import-phantom-wallet-a885cbd3333241fda419830afb43eb13)

## ⛏ 클러스터 설정

> **Note:** 검증자의 역할을 하기 위해서는 검증자 하드웨어 요구사항을 충족해야합니다.
1. 로컬 검증자 실행

```bash
solana-test-validator
```

2. 트랜잭션에 대한 로그를 보고 싶을때

```bash
solana logs
```

## 🏗 컨트랙트 빌드 후 배포

1. 컨트랙트 빌드

```bash
npm run build:contract
```

2. 온체인에 배포

```bash
solana program deploy /{프로젝트 경로}/dist/contract/solana_hello_world.so
```