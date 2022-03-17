import Web3 from "web3";
import {update_modal_title} from "../../../state/genericModalSlice";
import detectEthereumProvider from '@metamask/detect-provider';

// TODO: proper error if metamask isn't even installed or logged in
const LoadWeb3 = async (dispatch) => {
  let web3
  let modal_data
  const current_chain = process.env.CURRENT_CHAIN_ID

  const provider = await detectEthereumProvider();

  // if metamask not installed, completely empty
  console.log("LoadWeb3 provider", provider)

  // make sure using metamask, for now ethereum.isMetaMask
  if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider)
  }
  else {
    try {

      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{chainId: process.env.CURRENT_CHAIN_ID_HEX}]
      });
    } catch (error) {
      return {
        error: 1,
        show: 1,
        title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
        message: error.message,
        loader: "/assets/svg/claim-loading.svg",
        btn_text:"Switch Network",
        btn_action:"switchNetwork",
        close: false,
      }
    }
  }

  const networkId = await web3.eth.net.getId()
  switch (networkId.toString()) {
    case current_chain:

      break;
    default:
      // BLOCK BY TURNING ON NETWORK MODAL
      modal_data = {
        show: 1,
        error: 1,
        title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
        message: "Smart contract not deployed to detected network.",
        loader: "/assets/svg/claim-loading.svg",
        btn_text: "Switch Network",
        btn_action: "switchNetwork",
        close: false,
      }

      dispatch(update_modal_title(modal_data));
      try {
        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{chainId: process.env.CURRENT_CHAIN_ID_HEX}]
        });

        dispatch(update_modal_title({show: 0, error: 0}));
      } catch (error) {
        return {
          error: 1,
          show: 1,
          title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
          message: error.message,
          loader: "/assets/svg/claim-loading.svg",
          btn_text:"Switch Network",
          btn_action:"switchNetwork",
          close: false,
        }
      }
  }

  return web3
}

export default LoadWeb3