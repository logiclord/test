const DeFi = artifacts.require("DeFi");
const DAIMock = artifacts.require("DAIMock"); 

const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

const COINBASE = "0x503828976D22510aad0201ac7EC88293211D23Da"

var fs = require('fs');
var jsonFile = "/Users/gauravaggarwal/bc/Academy/DeFi/dai.json";
var abi= JSON.parse(fs.readFileSync(jsonFile));
// var abi = parsed.abi;

contract("DeFi", accounts => {
let owner;
let DAI_TokenContract;
const INITIAL_AMOUNT = 9999;
    before(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        console.log("owner account is " , owner);

        // set up   DAI_TokenContract here from the DAI address
        DAI_TokenContract = new web3.eth.Contract(abi, DAIAddress, {from: COINBASE});  
   
        const symbol = DAI_TokenContract.symbol;
        console.log(" symlbol" , symbol);
        console.log("COINBASE ", await DAI_TokenContract.methods.balanceOf(COINBASE).call());
        console.log("owner ", await DAI_TokenContract.methods.balanceOf(owner).call());
        await DAI_TokenContract.methods.transfer(owner, 1).send();
        console.log("COINBASE ", await DAI_TokenContract.methods.balanceOf(COINBASE).call());
        
    });


    it("should check transfer succeeded", async () => {
        console.log("owner ", await DAI_TokenContract.methods.balanceOf(owner).call());
        assert.equal(await DAI_TokenContract.methods.balanceOf(owner).call(), '1')
    });

 
});
