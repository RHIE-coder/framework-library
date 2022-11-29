const SimpleMath = artifacts.require("SimpleMath");
const Storage = artifacts.require("Storage");
const Test = artifacts.require("Test");

module.exports = function(deployer){
    deployer.deploy(SimpleMath)
    deployer.link(SimpleMath, Storage);
    deployer.deploy(Storage);
    deployer.deploy(Test);
}