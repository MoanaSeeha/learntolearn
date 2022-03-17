import Moralis from "moralis";
import {ethers} from "ethers";
import {update_chain_id} from "../../state/chainIdSlice";
import {update_network_modal} from "../../state/networkModalSlice";
import {update_network_name} from "../../state/networkNameSlice";
import {update_modal_title} from "../../state/genericModalSlice";


/**
 * Simply connect, sign, authorize
 * @returns {Promise<WebSocketProvider>}
 * @constructor
 */
const MoralisConnect = async () => {
//const MoralisConnect = async ({dispatch}) => {

  //console.log("dispatch", dispatch)
  let serverUrl = process.env.M_SERVER_URL
  let appId =  process.env.M_APP_ID;

  Moralis.start({ serverUrl, appId });

  let user = Moralis.User.current();



  // make sure we are on right provider
  const provider = new ethers.providers.WebSocketProvider("wss://speedy-nodes-nyc.moralis.io/731dd88c0bcb15d3c87c159d/polygon/mumbai/ws");



  let network = await provider.detectNetwork()


  let modal_data ={
    show: 1,
    error: 0,
    title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
    message:"Smart contract not deployed to detected network.",
    loader: "/assets/svg/claim-loading.svg",
    btn_text:"Switch Network",
    btn_action:"switchNetwork",
    close: false,

  }

  // dispatch not available here
  //dispatch(update_modal_title(modal_data));

  if (!user) {
    //user = await Moralis.authenticate();

    //const user = await Moralis.authenticate({ provider: "walletconnect", chainId: 56 })


    // provider: "walletconnect",
    user = await Moralis.authenticate({ chainId: process.env.CURRENT_CHAIN_ID }).then(function (user) {
      console.log("Logginng user moralis: authenticate", user);
    })
  }

  console.log("user.get('ethAddress')",user.get('ethAddress'))



  const signer = provider.getSigner();
  const accountLinked = user.attributes.accounts.includes(
    window.ethereum.selectedAddress
  );

  const web3 = await Moralis.Web3.enableWeb3();

  // 0x89  is POLYGON
  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [
        //{ chainId: "0x89" }
        { chainId: process.env.CURRENT_CHAIN_ID_HEX }
        // { chainId:"0x13881" }
      ]
    });
  } catch (error) {
    // TODO: entire transaction must be rejected, so we make sure user is on RIGHT NETWORK
    return {
      error: 1,
      provider: provider,
      signer: signer,
      user: user,
      accountLinked: accountLinked,
      address: user.attributes.ethAddress,
    };
  }


  const chainIdHex = web3.currentProvider.chainId;
  const chainIdDec = await web3.eth.getChainId();

  // dispatch(update_network_name(network.name));
  // dispatch(update_chain_id(chainIdDec));


  // TODO: this is returning network I am signed into. NOT WHAT IS IN METAMASK
  console.log("network", network);
  switch (network.chainId) {
    case 80001:
      console.log('MATIC MUMBAI');





      // TODO: here I need to make sure that this user is on the right network




      return {
        provider: provider,
        signer: signer,
        user: user,
        accountLinked: accountLinked,
        address: user.attributes.ethAddress,
      };
    default:
      console.log(`MUST SWITCH TO MATIC`);
      return {
        provider: provider,
        signer: signer,
        user: user,
        accountLinked: accountLinked,
        address: user.attributes.ethAddress,
      };
  }



  // let networkCheck = await GetNetwork(network.chainId, dispatch);
  // console.log("networkCheck user", networkCheck);

}

export default MoralisConnect