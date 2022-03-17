import Web3Modal from "web3modal";
import SubscribeProvider from "./SubscribeProvider";
import Web3 from "web3";
import ReturnNetwork from "./ReturnNetwork";
import {update_network_name} from "../../state/networkNameSlice";
import {update_main_address} from "../../state/mainAddressSlice";
import {update_chain_id} from "../../state/chainIdSlice";
import {update_learn_token_amount} from "../../state/learnTokenSlice";
import {update_eth_amount} from "../../state/ethTokenSlice";


async function ConnectWallet(dispatch) {
  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    //network: "mainnet", // optional
    cacheProvider: false, // optional
    providerOptions // required
  });

  let hasProvider;
  let provider;
  try {
    provider = await web3Modal.connect()
    hasProvider = true;
    console.log("provider: ", provider)
  } catch ( err ) {
    //await this.resetApp()

    console.log("try catch on provider: ", provider)
    hasProvider = false;
  }

  if(hasProvider) {
    try {
      await SubscribeProvider(provider, dispatch);
      let web3;
      web3 = new Web3(provider);
      const network_name = await web3.eth.net.getNetworkType();

      ReturnNetwork(network_name, dispatch);
      console.log("dispatch SENDING: update_network_name ", network_name);
      dispatch(update_network_name(network_name));

      // TODO: need another case

      // https://blog.logrocket.com/using-localstorage-react-hooks/
      // console.log("CURRENT_NETWORK", process.env.CURRENT_NETWORK);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];

      dispatch(update_main_address(address));

      const networkId = await web3.eth.net.getId();
      dispatch(update_chain_id(networkId));

      // update amount of learn tokens
      const minABI = [
        // balanceOf
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "decimals", type: "uint8" }],
          type: "function",
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

      // get learn token details
      const learnAddress = "0x51c9Ed7ce93C95e10B22F19d126e3C3E3f9e9B2A";
      const learnContract = await new web3.eth.Contract(minABI, learnAddress)
      const learnBalance = await learnContract.methods.balanceOf(address).call(); // 29803630997051883414242659

      // const d = await contract.methods.decimals().call();
      // console.log("decimals:",d);
      //let decimals = web3.utils.toBN(18);
      let decimals = web3.utils.toBN(0);
      let mintValue = 10000;
      let amount = web3.utils.toBN(`${mintValue}`);
      let value = amount.mul(web3.utils.toBN(10).pow(decimals));
      // let address1 = '0xabE140763C9867B580c4AAC72624eA507bD3E8f8';
      // const web3 = new Web3(window.ethereum);
      // await window.ethereum.enable();

      // const NameContract = web3.eth.Contract(contract_abi, contract_address);
      // await contract.methods.mint(address, value).send();

      // const gas = await contract.methods.set(number).estimateGas();
      const gas = 10000000
      // const post = await learnContract.methods.mint(address, value).send({
      //   from: address,
      //   gas,
      // });
      // const learnBalance =  2980363099705

      // LEARN TOKEN HAS 0 DECIMALS, SO DON'T USE FROM WEI
      learnContract.methods.decimals().call(function(error,d){
        console.log("decimals:",error,d);
        // 0 DECIMALS FOR LEARN TOKEN
        //const balance = web3.utils.fromWei(result); // 29803630.997051883414242659      console.log("balance",balance);
        dispatch(update_learn_token_amount(learnBalance));
      });

      await new web3.eth.getBalance(address, function(err, result) {
        if (err) {
          console.log(err)
        } else {
          // .toFixed(2)
          // get ether in user's wallet
          dispatch(update_eth_amount(web3.utils.fromWei(result, "ether")));
        }
      })

    } catch ( err ) {
      console.error(`error - ${ err.message }`);
    }


  }
  else {
    console.log("NOOOOOO   PROVIDER: ", provider)

  }
}
export default ConnectWallet