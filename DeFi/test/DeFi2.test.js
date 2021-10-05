const DeFi = artifacts.require("DeFi");
const DAIMock = artifacts.require("DAIMock"); 

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
const COINBASE = "0x503828976D22510aad0201ac7EC88293211D23Da"

var fs = require('fs');

contract("DeFi2", accounts => {
let owner;
let DAI_TokenContract;
let USDC_TokenContract;
let instance;
const INITIAL_AMOUNT = 9999;
    before(async function () {
        accounts = await web3.eth.getAccounts();
        instance = await DeFi.deployed();
        owner = instance.address;
        console.log("owner account is " , owner);

        DAI_TokenContract = new web3.eth.Contract(JSON.parse(fs.readFileSync("/Users/gauravaggarwal/bc/Academy/DeFi/dai.json")), DAIAddress, {from: COINBASE}); 
        USDC_TokenContract = new web3.eth.Contract(JSON.parse(fs.readFileSync("/Users/gauravaggarwal/bc/Academy/DeFi/usdc.json")), USDCAddress, {from: owner}); 
        
        console.log("COINBASE ", await DAI_TokenContract.methods.balanceOf(COINBASE).call());
        console.log("owner dai", await DAI_TokenContract.methods.balanceOf(owner).call());
        console.log("owner usdc", await USDC_TokenContract.methods.balanceOf(owner).call());
        console.log("COINBASE usdc", await USDC_TokenContract.methods.balanceOf(COINBASE).call());
        // const amountToSend = web3.utils.toWei("2", "ether"); // Convert to wei value
        // var send = await web3.eth.sendTransaction({ from:COINBASE,to:owner, value:amountToSend });
        // console.log("send doc ", send);
        await DAI_TokenContract.methods.transfer(owner, 299999999900005).send();
        console.log("COINBASE ", await DAI_TokenContract.methods.balanceOf(COINBASE).call());
        console.log("owner dai", await DAI_TokenContract.methods.balanceOf(owner).call());
        console.log("owner usdc", await USDC_TokenContract.methods.balanceOf(owner).call());
        console.log("COINBASE usdc", await USDC_TokenContract.methods.balanceOf(COINBASE).call());
        console.log("return2 " ,(await instance.swapDAItoUSDC(199999999900000, owner)));
        console.log("COINBASE ", await DAI_TokenContract.methods.balanceOf(COINBASE).call());
        console.log("owner dai", await DAI_TokenContract.methods.balanceOf(owner).call());
        console.log("owner usdc", await USDC_TokenContract.methods.balanceOf(owner).call());
        console.log("COINBASE usdc", await USDC_TokenContract.methods.balanceOf(COINBASE).call());
        assert.equal(await DAI_TokenContract.methods.balanceOf(owner).call(), '100000000000005')
    });
});
