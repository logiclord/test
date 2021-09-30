const VolcanoTokenUpgradableV2 = artifacts.require("VolcanoTokenUpgradableV2");
const VolcanoTokenUpgradable = artifacts.require("VolcanoTokenUpgradable");
const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

contract('VolcanoTokenUpgradableV2', (accounts) => {
  const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;

  it('should put 10000 VolcanoToken in the first account', async () => {
    const volcanoTokenInstance = await VolcanoTokenUpgradableV2.deployed();
    console.log("accounts dekho ", tokenHolderOneAddress);
    await volcanoTokenInstance.mint(tokenHolderOneAddress, 456);
    const ans = (await volcanoTokenInstance.balanceOf.call(tokenHolderOneAddress.toString())).toString();
    assert.equal(ans, `1`, "10000 wasn't in the first account");
    assert.equal(await volcanoTokenInstance.getVersion.call(), `2`, "10000 wasn't in the first account");
  });

});

describe('upgrades', () => {
  it('works', async () => {
    const box = await deployProxy(VolcanoTokenUpgradable, []);
    assert.equal(await box.getVersion.call(), '1');
    const box2 = await upgradeProxy(box.address, VolcanoTokenUpgradableV2);
    assert.equal(await box2.getVersion.call(), '2');
  });
});