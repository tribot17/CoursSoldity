import { useEffect, useState } from "react";
import getWeb3 from "./getWeb3";

function App() {
  const [Web3, setWeb3] = useState();
  const [accounts, setAccouts] = useState();
  const [networkId, setNetworkId] = useState();
  const [contract, setContract] = useState();

  useEffect(() => {
    loadData();
  });

  const loadData = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    // const deployedNetwork = Contract.networks[networkId];
    // const newContract = await new web3.eth.Contract(
    //   contract.abi,
    //   deployedNetwork && deployedNetwork.address
    // );

    setWeb3(web3);
    setAccouts(accounts);
    // setContract(newContract)
  };
  return <div></div>;
}

export default App;
