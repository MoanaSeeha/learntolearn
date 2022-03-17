import PropTypes from "prop-types";
import Moralis from "moralis";
import MoralisConnect from "../MoralisConnect";
import BuyLtsButton from "../buylts/BuyLtsButton";
import {useDispatch, useSelector} from "react-redux"

/**
 * TODO: NOT BEING USED
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {Promise<void>}
 * @constructor
 */
const NOTUSED = async ({dispatch, name, description, cost_amount, cost, token}) => {


  let provider_data = await MoralisConnect();

  console.log("provider_data", provider_data);

  if (Moralis.Web3) {
    if (provider_data.accountLinked === true) {

      await Moralis.Web3.enableWeb3();
      console.log("linking" );

      console.log("BuyTestButtonScript.js" );
      // mint an NFT
      const options = {
        //type: "native", // sends matic or ETH
        type: "erc20",
        amount: Moralis.Units.ETH(0), // TODO: DECIMALS AND VALUE FOR LTS TOKEN (18 DECIMALS)
        receiver: "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d",
        //contractAddress: "0xcC10FD2a46f1eE311235B5fB234928D4cEEd3947", // LEARN
        contractAddress: "0x95193c77fc0ca90876189afd094a20dc895d73ca" // TODO:LTS
        //contractAddress: "0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e" // TODO:TST
        //contractAddress: "0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e" // TEST https://mumbai.polygonscan.com/address/0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e
        // amount: Moralis.Units.ETH(cost_amount),
        //amount: Moralis.Units.ETH(parseInt(cost_amount)),
        //amount: Moralis.Units.ETH(1), // SENDS 1 ETH WORTH OF TOKEN
        //amount: Moralis.Units.Token(1 * 18, "18"), // LTS is 18 decimals, but whole value here
        //amount: Moralis.Units.Token(1 * 18, "18"), // LTS is 18 decimals, but whole value here
        // amount: Moralis.Units.FromWei(1, 18), Uncaught (in promise) Error: underflow (fault="underflow", operation="BigNumber.from", value=1e-18, code=NUMERIC_FAULT, version=bignumber/5.5.0)

        //contractAddress: process.env.LTS_ADDRESS // use learn for now
        //contractAddress: "0x2d7882bedcbfddce29ba99965dd3cdf7fcb10a1e" // NEEDS TO BE LTS
      }

      //100000000
      let result = await Moralis.transfer(options)

      console.log("result", result );
    }
    if (provider_data.accountLinked  === false) {
      if (
        window.confirm(
          "Would you like to link this account to your user profile?"
        )
      ) {
        await Moralis.Web3.link(window.ethereum.selectedAddress);
      }
    }
  }

}

NOTUSED.propTypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount_lts: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default NOTUSED