const VolcanoToken = artifacts.require("VolcanoToken");

contract('VolcanoToken', (accounts) => {
  const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;

  it('should put 10000 VolcanoToken in the first account', async () => {
    const volcanoTokenInstance = await VolcanoToken.deployed();
    console.log("accounts dekho ", tokenHolderOneAddress);
    await volcanoTokenInstance.mint(tokenHolderOneAddress, 456);
    const ans = (await volcanoTokenInstance.balanceOf.call(tokenHolderOneAddress.toString())).toString();
    assert.equal(ans, `1`, "10000 wasn't in the first account");
    assert.equal(await volcanoTokenInstance.getVersion.call(), `1`, "10000 wasn't in the first account");
  });
});
