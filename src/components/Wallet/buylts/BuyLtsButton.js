import {useDispatch, useSelector} from "react-redux"
import detectEthereumProvider from "@metamask/detect-provider";
import PropTypes from "prop-types";
import BuyLtsBox from "./BuyLtsBox";
import Moralis from "moralis";
import {ethers} from "ethers";
import MoralisConnect from "../MoralisConnect";
import { Modal } from "react-bootstrap"
import {update_modal_title} from "../../../state/genericModalSlice";

/**
 * Use moralis?
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {Promise<void>}
 * @constructor
 */
const BuyLtsButton = async ( {dispatch, name, description, amount_lts, cost, token}) => {

  // console.log("DISPATCH", dispatch)
  console.log("123")
  let provider_data = await MoralisConnect();


  console.log("provider_data.error", provider_data.error );
  if(provider_data.error !== 1) {
    if (Moralis.Web3) {
      if (provider_data.accountLinked === true) {

        // TODO: loader
        await Moralis.Web3.enableWeb3();

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
            "stateMutability": "payable",
            "type": "function"
          }
        ];
        // let result1 = await Moralis.transfer(options)
        // TODO: please comment what every argument is for.
        let web3 = await Moralis.Web3.enableWeb3();

        console.log("WTFas asfsadf asdf asdfas dfsadfdf",process.env.LTS_ADDRESS)
        //let tokenContract =  new web3.eth.Contract(minABI, "0x1b78290687958dB9102dE9e22Cb37E67cDef2C23"); // write your lts contract address.
        let tokenContract =  new web3.eth.Contract(minABI, "0x1D63464FFb069a70f206Df24EeA8c84a9c22E490"); // write your lts contract address.
        const result = await tokenContract.methods.mint(
          '0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d', //write user metamask address
          Moralis.Units.Token("111", "18")).send({                       // LTS Amount to Receive
          from: '0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d', //write user metamask address
          gas:'210000',                                 // network gas
          value:Moralis.Units.Token("0.001", "18") // Cost for LTS
        });

        let transaction_url = process.env.BLOCK_EXPLORER + `tx/${result.transactionHash}`

        return transaction_url;
        // session storage, state not working

        //console.log("transfer dispatch", dispatch);
        // TODO: backend must be used to send LTS in return

        // TODO: DO NOT redirect to activity, show transaction here in modal


        // need state and dispatch here to update modal
        // TODO: need redux-thunk
        //dispatch(update_modal_title({transaction_url: transaction_url, result: result}));

        // return (dispatch) => {
        //   /*dispatch more actions*/
        //   console.log("dispatch", dispatch);
        //   console.log("dispatching");
        //   //dispatch(update_modal_title({transaction_url: transaction_url, result: result}));
        //   dispatch(update_modal_title({transaction_url}));
        // }
        //update_modal_title

      }
      if (provider_data.accountLinked === false) {
        if (
          window.confirm(
            "Would you like to link this account to your user profile?"
          )
        ) {
          await Moralis.Web3.link(window.ethereum.selectedAddress);
        }
      }
    }
  } else {
    // no need to show any message
  }
}

BuyLtsButton.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount_lts: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
};

export default BuyLtsButton