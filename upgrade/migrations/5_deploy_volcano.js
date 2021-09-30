const VolcanoTokenUpgradable = artifacts.require("VolcanoTokenUpgradable");
const VolcanoTokenUpgradableV2 = artifacts.require("VolcanoTokenUpgradableV2");
const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const existing = await VolcanoTokenUpgradable.deployed();
  const instance = await upgradeProxy(existing.address,  VolcanoTokenUpgradableV2, { deployer, initializer: 'initialize' });
  console.log("Upgraded", instance.address);
};