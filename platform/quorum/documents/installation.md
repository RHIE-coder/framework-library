# Quorum

## # Install or Get `Go-Quorum`

### - Prerequisite

 - [Golang](https://go.dev/)

<br><br><br>

### - Get Binary

1. 

```sh
git clone https://github.com/ConsenSys/quorum
cd quorum
make all
```

2. check `build/bin` directory when finish installation




<hr><br><br><br><br>

## # Dev Tools 

### - Quorum Dev Quickstart 

(It's been integrated [`Quorum Wizard`](https://github.com/ConsenSys/quorum-wizard) and [`Quorum Examples`](https://github.com/ConsenSys/quorum-examples))

```sh
npm install quorum-dev-quickstart
npx quorum-dev-quickstart
```

```sh
{created_directory_by_npx}/network/run.sh
```

<br><br><br>

### - Quorum Genesis Tool

```sh
npm install quorum-genesis-tool
npx quorum-genesis-tool
```

<hr><br><br><br><br>

## # Getting Started ( RAFT )

https://consensys.net/docs/goquorum/en/latest/tutorials/private-network/create-a-raft-network/


1. run `01-establish-node-and-artifacts.sh`

2. update `static-nodes.json`

```json
[
  "enode://1647ade9de728630faff2a69d81b2071eac873d776bfdf012b1b9e7e9ae1ea56328e79e34b24b496722412f4348b9aecaf2fd203fa56772a1a5dcdaa4a550147@127.0.0.1:30300?discport=0&raftport=53000",
  "enode://0e6f7fff39188535b6084fa57fe0277d022a4beb988924bbb58087a43dd24f5feb78ca9d1cd880e26dd5162b8d331eeffee777386a4ab181528b3817fa39652c@127.0.0.1:30301?discport=0&raftport=53001"
]
```

3. run `02-init-nodes.sh`

4. run `start-node-0.sh`

5. run `start-node-1.sh`

6. attach to node 1

 - In another terminal in the `Node-1` directory, attach to your node: 

```sh
geth attach data/geth.ipc
raft.cluster
```

7. verify rpc connection

```http
POST http://10.0.2.15:22000
Content-Type: application/json

{
    "jsonrpc":"2.0",
    "method":"eth_accounts",
    "params":[],
    "id":64
}
```

```sh
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'  -X POST http://10.0.2.15:22000 
```