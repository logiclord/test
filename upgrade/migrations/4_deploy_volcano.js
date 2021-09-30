const VolcanoTokenUpgradable = artifacts.require("VolcanoTokenUpgradable");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(VolcanoTokenUpgradable, [], { deployer, initializer: 'initialize' });
  console.log('Deployed', instance.address);
};