const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const VolcanoCoin = artifacts.require('VolcanoCoin');

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ConvertLib, {from: accounts[0]});
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin, {from: accounts[0]});
  deployer.deploy(VolcanoCoin,{from: accounts[0]});
};
