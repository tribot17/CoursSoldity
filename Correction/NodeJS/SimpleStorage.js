const Web3 = require("web3");
const rpcURL = "https://ropsten.infura.io/v3/id";
const web3 = new Web3(rpcURL);
const ABI = [
  {
    inputs: [{ internalType: "uint256", name: "x", type: "uint256" }],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
const SSaddress = "0xCbd43b4CF42101693689a1f9C201471d8f505E8f";
const simpleStorage = new web3.eth.Contract(ABI, SSaddress);

simpleStorage.methods.get().call((err, data) => {
  console.log(data);
});

const set = () => {
  const account1 = "0x3b4363c323B164497F999103194798FC246362fB";
  const privatekey1 = Buffer.from("private_key", "hex");

  web3.eth.getTransactionCount(account1, (err, txCount) => {
    const simpleStorage = new web3.eth.Contract(ABI, SSaddress);
    const data = simpleStorage.methods.set(3).encodeABI();
    const txObject = {
      nonce: web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      to: SSaddress,
      data: data,
    };

    let tx = new Tx(txObject, { chain: "ropsten" });
    tx.sign(privatekey1);

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log("txHash:", txHash, "err:", err);
    });
  });
};
