# 1. create directories
mkdir -p Node-0/data/keystore
mkdir -p Node-1/data/keystore

# 2. run the quorum genesis tool
npx quorum-genesis-tool --consensus raft --chainID 1337 --blockperiod 5 --requestTimeout 10 --epochLength 30000 --difficulty 1 --gasLimit '0xFFFFFF' --coinbase '0x0000000000000000000000000000000000000000' --validators 2 --members 0 --bootnodes 0 --outputPath 'artifacts'

# 3. Move all the keys into the artifacts folder directly, for ease of use in the next steps:
MV_TARGET=`ls artifacts/`
mv artifacts/$MV_TARGET/* artifacts
rm -r artifacts/$MV_TARGET
rm -r artifacts/besu