const VolcanoTokenUpgradable = artifacts.require("VolcanoTokenUpgradable");

contract('VolcanoTokenUpgradable', (accounts) => {
  const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;

  it('should put 10000 VolcanoToken in the first account', async () => {
    const volcanoTokenInstance = await VolcanoTokenUpgradable.deployed();
    console.log("accounts dekho ", tokenHolderOneAddress);
    await volcanoTokenInstance.mint(tokenHolderOneAddress, 456);
    const ans = (await volcanoTokenInstance.balanceOf.call(tokenHolderOneAddress.toString())).toString();
    assert.equal(ans, `1`, "10000 wasn't in the first account");
    assert.equal(await volcanoTokenInstance.getVersion.call(), `2`, "10000 wasn't in the first account");
  });
});
