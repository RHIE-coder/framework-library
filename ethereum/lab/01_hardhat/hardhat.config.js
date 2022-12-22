require("@nomicfoundation/hardhat-toolbox");

// account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const privateKey = 'a2d10670b32aee8a1e219c208b9f7564c4b824c3d851d36e7b8df3da4639581d';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'localNet',
  solidity: {
    version: "0.8.17",
  },
  networks: {
    localNet: {
      url: 'http://192.168.100.73:8545',
      accounts: [privateKey],
    }
  }
};
