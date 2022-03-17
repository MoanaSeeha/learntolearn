import Web3Modal from "web3modal";
import Web3 from "web3";
import SubscribeProvider from './SubscribeProvider'

import {update_network_name} from "../../state/networkNameSlice";
import {update_main_address} from "../../state/mainAddressSlice";
import {update_chain_id} from "../../state/chainIdSlice";
import {update_unclaimed_learn} from "../../state/tokens/unclaimedLearnSlice";
import {update_learn_token_amount} from "../../state/learnTokenSlice";
import {update_eth_amount} from "../../state/ethTokenSlice";
import {update_claiming} from "../../state/claimingSlice";
import {update_transaction_url} from "../../state/transactionUrlSlice";
const API='http://127.0.0.1:7777'

import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {ethers} from "ethers";

async function MintClaimFrontEnd(dispatch) {

  const provider = new ethers.providers.WebSocketProvider(process.env.M_MUMBAI_NODE_WS);

  console.log("provider", provider)

  // if(hasProvider) {
  //   try {
  //     await SubscribeProvider(provider, dispatch);
  //     let web3;
  //     // Check if browser is running Metamask
  //     web3 = new Web3(provider);
  //     const network_name = await web3.eth.net.getNetworkType();
  //     console.log("dispatch SENDING: update_network_name ", network_name);
  //     dispatch(update_network_name(network_name));
  //     const accounts = await web3.eth.getAccounts();
  //     const address = accounts[0];
  //
  //     dispatch(update_main_address(address));
  //     const networkId = await web3.eth.net.getId();
  //     dispatch(update_chain_id(networkId));
  //     const minABI = [
  //       {
  //         constant: true,
  //         inputs: [{ name: "_owner", type: "address" }],
  //         name: "balanceOf",
  //         outputs: [{ name: "balance", type: "uint256" }],
  //         type: "function",
  //       },
  //       {
  //         constant: true,
  //         inputs: [],
  //         name: "decimals",
  //         outputs: [{ name: "decimals", type: "uint8" }],
  //         type: "function",
  //       },
  //       {
  //         "inputs": [
  //           {
  //             "internalType": "address",
  //             "name": "account",
  //             "type": "address"
  //           },
  //           {
  //             "internalType": "uint256",
  //             "name": "amount",
  //             "type": "uint256"
  //           }
  //         ],
  //         "name": "mint",
  //         "outputs": [],
  //         "stateMutability": "nonpayable",
  //         "type": "function"
  //       }
  //     ];
  //
  //     // get learn token details
  //     // update_learn_token_amount: 50200000000010000010000
  //     const learnAddress = "0x51c9Ed7ce93C95e10B22F19d126e3C3E3f9e9B2A";
  //     const learnContract = await new web3.eth.Contract(minABI, learnAddress)
  //     const learnBalance = await learnContract.methods.balanceOf(address).call(); // 29803630997051883414242659
  //
  //     let decimals = web3.utils.toBN(0);
  //     //let mintValue = 7777777777777; // state or local storage?
  //     //let mintValue = sessionStorage.getItem("unclaimed_learn_amount")
  //     let mintValue = 111
  //
  //     // TODO: needs to come from MONGODB ALWAYS, NOT STATE OR LOCAL STORAGE
  //
  //     // shouldn't even be here if nothing to mint
  //
  //     if(!mintValue) {
  //       console.log("NOTHING TO CLAIM")
  //     } else
  //     {
  //       console.log("**************** MINTING", mintValue)
  //       let amount = web3.utils.toBN(`${mintValue}`);
  //       let value = amount.mul(web3.utils.toBN(10).pow(decimals));
  //
  //       console.log("**************** MINT VALUE")
  //       console.dir(value)
  //
  //       //const accounts11 = await window.ethereum.enable();
  //       const gas = 21000
  //       const mint_results = await learnContract.methods.mint(address, value).send({
  //         from: address,
  //         gas,
  //       })
  //
  //       console.log("**********mint_results", mint_results)
  //
  //       // TODO: dot.env not working
  //
  //       let transaction_url = process.env.BLOCK_EXPLORER + `tx/${mint_results.transactionHash}`
  //       console.log("transaction_url" + transaction_url)
  //       dispatch(update_transaction_url(transaction_url));
  //
  //       // TODO: update MONGODB, reset unclaimed_learn_amount in users table to ZERO
  //       axios.post(API + "/api/v1/transaction/claim",{ether_address: address, claim_amount: mintValue})
  //         .then(response => {
  //           if(response.data){
  //             console.log("23 response.data", response.data);
  //             dispatch(update_unclaimed_learn(0));
  //           }
  //           else {
  //             console.log("37 unknown error")
  //           }
  //         })
  //         .catch(err => {
  //           console.log("err.data");
  //           console.log(err);
  //           return true;
  //         })
  //
  //     }
  //
  //     console.log("**********")
  //     // const learnBalance =  2980363099705
  //     console.log(learnBalance)
  //     // LEARN TOKEN HAS 0 DECIMALS, SO DON'T USE FROM WEI
  //     learnContract.methods.decimals().call(function(error,d){
  //       console.log("decimals:",error,d);
  //       // 0 DECIMALS FOR LEARN TOKEN
  //       //const balance = web3.utils.fromWei(result); // 29803630.997051883414242659      console.log("balance",balance);
  //       dispatch(update_learn_token_amount(learnBalance));
  //     });
  //
  //     await new web3.eth.getBalance(address, function(err, result) {
  //       if (err) {
  //         console.log(err)
  //       } else {
  //         // .toFixed(2)
  //         // get ether in user's wallet
  //         dispatch(update_eth_amount(web3.utils.fromWei(result, "ether")));
  //       }
  //     })
  //
  //     dispatch(update_claiming("finished"));
  //     //dispatch(update_transaction_url(response.data.transaction_url));
  //   } catch ( err ) {
  //
  //     if (err.code === 4001){
  //           console.log("Rejected by user") //user rejected the transaction
  //           alert("Rejected by user")
  //     }else{
  //         console.log("Transaction Failed")
  //     }
  //     dispatch(update_claiming("failed"));
  //     console.log(`Error calling subscribeProvider - ${ err.message }`);
  //   }
  // }
  // else {
  //   console.log("NOOOOOO   PROVIDER: ", provider)
  //
  // }
}

export default MintClaimFrontEnd