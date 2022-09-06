GO_QUORUM_DIR=artifacts/goQuorum/
VALIDATOR_0_DIR=artifacts/validator0/
VALIDATOR_1_DIR=artifacts/validator1/

# Copy static-nodes.json, genesis.json, and permissioned-nodes.json (if applicable) to the data directory for each node:
cp $GO_QUORUM_DIR/static-nodes.json $GO_QUORUM_DIR/genesis.json Node-0/data/
cp $GO_QUORUM_DIR/static-nodes.json $GO_QUORUM_DIR/genesis.json Node-1/data/

# In each validator directory, copy the nodekey files and address to the data directory:
cp $VALIDATOR_0_DIR/nodekey* $VALIDATOR_0_DIR/address Node-0/data/ 
cp $VALIDATOR_1_DIR/nodekey* $VALIDATOR_1_DIR/address Node-1/data/

# Copy the individual account keys to the keystore directory for each node:
cp $VALIDATOR_0_DIR/account* Node-0/data/keystore
cp $VALIDATOR_1_DIR/account* Node-1/data/keystore

# Initialize node 1
export PATH=$PATH:$PWD/../bin/
geth --datadir Node-1/data init Node-1/data/genesis.json

# Inject shell-script files
cp $PWD/../bash/start-node-0.sh Node-0/
cp $PWD/../bash/start-node-1.sh Node-1/

