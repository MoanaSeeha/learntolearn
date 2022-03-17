import Web3Modal from "web3modal";
import SubscribeProvider from "../Wallet/SubscribeProvider";
import Web3 from "web3";
import {update_main_address} from "../../state/mainAddressSlice";

const OnAddress = async(dispatch)=>{
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      //params: [{ chainId: '0x4' }], // rinkeby
      params: [{ chainId: process.env.CURRENT_CHAIN_ID_HEX }],
    });
  } catch (switchError) {
    console.log(switchError)
    alert("Please install metamask");
  }
  const providerOptions = {
    /* See Provider Options Section */
  };
  const web3Modal = new Web3Modal({
    network: "mumbai", // optional
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
    console.log("try catch on provider: ", provider)
    hasProvider = false;
  }

  if(hasProvider) {
    try {
      await SubscribeProvider(provider,'');
      let web3;
      web3 = new Web3(provider);
      const network_name = await web3.eth.net.getNetworkType();

      console.log("LOGIN HERE, NEED TO CHECK NETWORK HERE!!! ", network_name);
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      console.log("all accounts", accounts)
      dispatch(update_main_address(address));

    } catch ( err ) {
      console.error(`Error - ${ err.message }`);
    }
  }
}

export default OnAddress