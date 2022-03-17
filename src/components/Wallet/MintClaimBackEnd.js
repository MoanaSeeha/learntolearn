//  no longer using
import Web3Modal from "web3modal";
import Web3 from "web3";
import {update_network_name} from "../../state/networkNameSlice";
import {update_main_address} from "../../state/mainAddressSlice";
import {update_chain_id} from "../../state/chainIdSlice";
import {update_unclaimed_learn} from "../../state/tokens/unclaimedLearnSlice";
import {update_learn_token_amount} from "../../state/learnTokenSlice";
import {update_eth_amount} from "../../state/ethTokenSlice";
import {update_claiming} from "../../state/claimingSlice";
import axios from "axios";
import {update_transaction_url} from "../../state/transactionUrlSlice";
import {useDispatch} from "react-redux";

async function MintClaimBackEnd(dispatch) {

  // open a normal, round modal with loader.
  dispatch(update_claiming("claiming"));


  // TODO: mintvalue cannot come from sessionStorage
  // when state is updated, reducer should also update MONGO DB
  // mint value should always come securly from mongo DB
  // TODO: consider completely removing MINT VALUE from frontend
  // use session storage for frontend? not local storage
  //let mintValue = sessionStorage.getItem("unclaimed_learn_amount")

  let mintValue = 1110000;

  // TODO: always needs to come from MONGO DB for security!!!
  // pull by ether address

  // shouldn't even be here if nothing to mint

  if(!mintValue) {
    console.log("NOTHING TO CLAIM")
  }
  else {
    // once finished, return the transaction URL
    //axios.post(API + "/api/v1/transaction/mint",{amount:mintValue, address:address})
    // TODO: make sure this is secure
    axios.post(process.env.API_URL + "/api/v1/transaction/mint",{ether_address: sessionStorage.getItem("address") })
      .then(response => {
        console.log(response.data);
        // if(response.data === 'OK'){
        if(response.data.success){

          //alert("Success");
          dispatch(update_claiming("finished"));
          dispatch(update_transaction_url(response.data.transaction_url));

        }else{
          dispatch(update_claiming("failed"));
        }
      })
      .catch(err => {
        console.log("err.data");
        console.log(err);
        return true;
      })
  }

}

export default MintClaimBackEnd