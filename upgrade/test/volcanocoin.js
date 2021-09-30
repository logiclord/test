const VolcanoToken = artifacts.require("VolcanoToken");

contract('VolcanoToken', (accounts) => {

  const [deployerAddress, tokenHolderOneAddress, tokenHolderTwoAddress] = accounts;

  it('should put 10000 VolcanoToken in the first account', async () => {
    const volcanoTokenInstance = await VolcanoToken.deployed();
    console.log("accounts dekho ", tokenHolderOneAddress);
    await volcanoTokenInstance.mint(tokenHolderOneAddress, 456);
    const ans = (await volcanoTokenInstance.balanceOf.call(tokenHolderOneAddress.toString())).toString();
    assert.equal(ans, `1`, "10000 wasn't in the first account");
  });

  // it('should call a function that depends on a linked library', async () => {
  //   const volcanoTokenInstance = await VolcanoToken.deployed();
  //   const volcanoTokenBalance = (await volcanoTokenInstance.getBalance.call(accounts[0])).toNumber();
  //   const volcanoTokenEthBalance = (await volcanoTokenInstance.getBalanceInEth.call(accounts[0])).toNumber();

  //   assert.equal(volcanoTokenEthBalance, 2 * volcanoTokenBalance, 'Library function returned unexpected function, linkage may be broken');
  // });
  // it('should send coin correctly', async () => {
  //   const volcanoTokenInstance = await VolcanoToken.deployed();

  //   // Setup 2 accounts.
  //   const accountOne = accounts[0];
  //   const accountTwo = accounts[1];

  //   // Get initial balances of first and second account.
  //   const accountOneStartingBalance = (await volcanoTokenInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoStartingBalance = (await volcanoTokenInstance.getBalance.call(accountTwo)).toNumber();

  //   // Make transaction from first account to second.
  //   const amount = 10;
  //   await volcanoTokenInstance.sendCoin(accountTwo, amount, { from: accountOne });

  //   // Get balances of first and second account after the transactions.
  //   const accountOneEndingBalance = (await volcanoTokenInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoEndingBalance = (await volcanoTokenInstance.getBalance.call(accountTwo)).toNumber();


  //   assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
  //   assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  // });
});
