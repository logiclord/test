import Web3 from "web3";
import volcanoCoinArtifact from "../../build/contracts/VolcanoCoin.json";

const App = {
  web3: null,
  account: null,
  meta: null,
  transfers: [],
  supplyChanged: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = volcanoCoinArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        volcanoCoinArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
      let contractJsonInterface = this.meta._jsonInterface;

      function setupEventSubs(eventName, cb) {
        //console.log(" contractJsonInterface " , contractJsonInterface);
        const eventJsonInterface = web3.utils._.find(
          contractJsonInterface,
          o => o.name === eventName && o.type === 'event'
        );
        const options = {
          fromBlock: 0,
          address: [deployedNetwork.address],
          // Get events from specific addresses
          topics: [eventJsonInterface.signature]
          // What topics to subscribe to
        };
      
        const subscription = web3.eth.subscribe('logs', options, (err, event) => {
          if (!err) {
            const eventObj = web3.eth.abi.decodeLog(
              eventJsonInterface.inputs,
              event.data,
              event.topics.slice(1)
            )
            cb(eventObj);
          }
        });
         return subscription;
      }
      const subscription = setupEventSubs('Transfer', function(evt) {
        if(evt && accounts.length > 0) {
          console.log(evt);
          if(evt[0] === accounts[0]) {
            alert("You just transfered " + evt[2] + " VolcanoCoins");
          } else if(evt[1] === accounts[0]) {
            alert("You just received " + evt[2] + " VolcanoCoins");
          }
        }
      });
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  refreshBalance: async function () {
    const balance = await  this.meta.methods.balances(this.account).call();
    console.log("balance, " , balance);

    const balance2 = await  this.meta.methods.getBalance().call();
    console.log("balance, " , balance2);

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  sendCoin: async function () {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Initiating transaction... (please wait)");

    const { transfer } = this.meta.methods;
    await transfer(receiver, amount).send({ from: this.account });

    this.setStatus("Transaction complete!");
    this.refreshBalance();
  },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/f244f4dda6c54d98be228ae531a5b6ae"),
    );
  }

  App.start();
});
