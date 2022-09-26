const Web3 = require("web3");
const rpcURL = "";
const web3 = new Web3(rpcURL);

web3.eth.getBalance(
  "0xb8c74A1d2289ec8B13ae421a0660Fd96915022b1",
  (err, wei) => {
    balance = web3.utils.fromWei(wei, "ether"); //Converti la valeur de WEI en ETH
    console.log(balance);
  }
);

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert("Non Ethereum brower detected.");
  }
};

const txObject = {
  nonce: web3.utils.toHex(txCount),
  gasLimit: web3.utils.toHex(100000),
  gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  data: data,
};

const data =
  "0x608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea2646970667358221220621b004348182090993209e1ac240f4afda9ce0872d638761289ca63d69be72264736f6c634300060b0033";

web3.eth.getTransactionCount(account1, (err, txCount) => {});

let tx = new Tx(txObject, { chain: "ropsten" });
tx.sign(privatekey1);

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
  console.log("err", err, "txHash", txHash);
  //Utlisez le transaction hash pour retrouver le contract sur eth scan
});
