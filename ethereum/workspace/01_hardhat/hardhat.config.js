require("@nomicfoundation/hardhat-toolbox");

// account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'localNet',
  solidity: {
    version: "0.8.17",
  },
  networks: {
    localNet: {
      url: 'http://localhost:8545',
      accounts: [privateKey],
    }
  }
};
