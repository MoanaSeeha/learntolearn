import React, {useEffect} from 'react';
import IsoTopeGrid from "react-isotope";
import GenericModalBootstrap from "../Modal/GenericModalBootstrap";
import BuyTestButton from "../Wallet/buyTest/BuyTestButton";
import Web3 from "web3";
import LearnTests from "../../abis/LearnTests.json";
import LTS from "../../abis/LTS.json";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
import {fullModalSlice} from "../../state/fullModalSlice";
import jwt_decode from "jwt-decode";
import {update_unclaimed_learn} from "../../state/tokens/unclaimedLearnSlice";
import {update_modal_title} from "../../state/genericModalSlice";
import {update_nft_buy_list} from "../../state/nftBuyListSlice";
import {update_nft_hash_list} from "../../state/nftHashSlice";
import {update_contract} from "../../state/nft/contractSlice";
import SubscribeProvider from "../Wallet/SubscribeProvider"
import detectEthereumProvider from "@metamask/detect-provider";
import LoadWeb3 from "../Moralis/Login/LoadWeb3";
import Moralis from "moralis";


const UPDATE_CONTRACT = 'UPDATE_CONTRACT'
const LoadWeb31 = async () => {
  let web3
  let modal_data
  const current_chain = process.env.CURRENT_CHAIN_ID

  const provider = await detectEthereumProvider();

  // if metamask not installed, completely empty
  console.log("provider", provider)

  web3 = new Web3(window.web3.currentProvider)
  return web3;
}

const loadBlockchainData = async (web3) => {

  let any_errors

  // Load account
  const accounts = await web3.eth.getAccounts()
  //this.setState({ account: accounts[0] })

  const networkId = await web3.eth.net.getId()
  const current_chain = process.env.CURRENT_CHAIN_ID


  // anything other than current network
  const networkData = LearnTests.networks[networkId]
  console.log("networkData", networkData)

  if (networkData) {
    const abi = LearnTests.abi
    const address = "0x3dB6C8AF92FF4A117Da3C4A147Fb98c98cD72C4e" // NFT CONTRACT ADDRESS
    const contract = new web3.eth.Contract(abi, address)
    // this.setState({ contract })
    const totalSupply = await contract.methods.getMemesCount().call()
    // const totalSupply = await contract.methods.getTestCount().call()
    //this.setState({ contract: contract, totalSupply: totalSupply })
    console.log('total supply', totalSupply)
    console.log('contract', contract)


    // TODO: need to figure out which ones are already owned.
    // Load hashes
    let all_hashes = []
    for (let i = 1; i <= totalSupply; i++) {
      const hash = await contract.methods.hashes(i - 1).call()

      // setting state for eacch has causes refresh
      all_hashes.push(hash)
    }

    return {
      all_hashes: all_hashes,
      address: address,
      contract: contract,
      totalSupply: 'totalSupply',
      web3: web3
    }

  }
  else {
    any_errors += 1
    //window.alert()
    return {
      show: 1,
      error: 1,
      title: 'No Network',
      message: "",
      btn_text: "Close",
      btn_action: "handleClose"
    }
  }

}

const loadTestsMongo = async () => {

  const headers = {
    'Content-Type': 'application/json'
  };

  return await axios.post(process.env.API_URL + "/api/v1/get/list_tests",{
      type: "all",
    },
    {headers}
  )
    .then(response => {

      if(response.data){
        //this.setState({ show: 0 })
        console.log("response.data", response.data)
        //this.setState({ data: response.data, show_data:1 })
        return {
          error: 0,
          data: response.data
        }
      }
      else {
        //this.setState({ show: 1 })

        return {
          error: 1,
          title: 'Unknown Error',
          message: '',
          btn_text: "Close",
          btn_action: "handleClose"
        }
      }
    })
    .catch(err => {
      //this.setState({ show: 1 })

      return {
        error: 1,
        title: 'Unknown Error',
        message: err,
        btn_text: "Close",
        btn_action: "handleClose"
      }
    })
}


const takeTest = async (test) => {
  window.location.href = "/test/" + test.slug;
}


const onFilter = event => {
  const {
    target: { value, checked }
  } = event;

  updateFilters(state =>
    state.map(f => {
      if (f.label === value) {
        return {
          ...f,
          isChecked: checked
        };
      }

      return f;
    })
  );
};

/**
 *
 * @param dispatch
 * @param blockchain_state
 * @param img
 * @param title
 * @param amount ??? not even sure what amount and price are different
 * @param price
 * @returns {Promise<void>}
 */
const mint = async (dispatch, blockchain_state, img, title, amount, price) => {
  console.log("price", price)
  console.log("amount", amount)

  let contract = blockchain_state.contract

  // turn on modal
  let modal_data ={
    show: 1,
    error: 0,
    title: "Now Minting",
    message:"",
    loader: "/assets/svg/claim-loading.svg",
    btn_text:"",
    btn_action:"",
    close: false,

  }
  dispatch(update_modal_title(modal_data));

  // TODO: test info simply needs to come from MONGO DB, and be reconciled with what is owned
  var newNft = {"image":img, "title":title, "amount":amount, "price":price};

  // URI: can use hardcoded IPFS, no need to upload

  const lts_abi = LTS.abi       // your LTS abi
  const lts_address ="0x1D63464FFb069a70f206Df24EeA8c84a9c22E490" // your LTS contract address
  let network_results1 = await LoadWeb31()

  const lts_contract = new network_results1.eth.Contract(lts_abi, lts_address)

  /*
    address payable from,
    address to,
    uint256 id,
    uint256 amount,
    uint256 price,
	string memory _hash,
	string memory _uri

	msg.sender, id, amount, bytes(_uri)

	// LTS TOKEN ADDRESS 0xCBB439Fa7179CBFAaaF8a0609A3bb3c0D33449B5

	// matic goes here
	// https://mumbai.polygonscan.com/address/0x0b71e027fc0839b5297632ad99442569e3b24016
   */

  console.log("blockchain_state.address", blockchain_state.address)// this is test nft contract address I fixed all errors. 0x3dB6C8AF92FF4A117Da3C4A147Fb98c98cD72C4e
  await lts_contract.methods.approve(
    "0x3dB6C8AF92FF4A117Da3C4A147Fb98c98cD72C4e", // NFT CONTRACT ADDRESS
    7777777, // approve amount
  )
    .send({ from: "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d" }) // User wallet address
  await contract.methods.mint(
    "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d", // User wallet address
    "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d", // User wallet address
    10, // ID ????
    100,  // AMOUNT ???  number of NFT's
    7777777, // Price of NFT???
    img,  // image url or hash
    title,  // Title of NFT
    // '2m1g' + Math.random(0,1000),  // different url
    // 'nN1ft' + Math.random(0,1000)  // different url
    ///img  // URL to nft data, i think
    // '2m1g' + Math.random(0,1000),  // different url

  )
    .send({
      from:"0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d",  // User wallet address
      value:Moralis.Units.Token(price, "18"),  // Cost of NFT???
      gas:"210000"
    })

    //await this.state.contract.methods.mint(img, JSON.stringify(newNft)).send({ from: this.state.account })
    .once('receipt', (receipt) => {

      console.log("receipt", receipt)

      let transaction_url = process.env.BLOCK_EXPLORER + `tx/${receipt.transactionHash}`
      // TODO:send this transaction to learn_activity table

      console.log("transaction_url", transaction_url)

      let modal_data ={
        show: 1,
        error: 0,
        title: "Transaction Successful",
        link: transaction_url,
        message: `View Transaction`,
        btn_text:"View Activity",
        btn_action:"handleActivity",
        close: true,
      }
      dispatch(update_modal_title(modal_data));
    })
    .catch(e => {
      console.log("e", e)
      console.log("coode", e.code)

      let modal_data
      // on rejection, this isn't actually sent back to browser
      if(e.code === 4001 ) {
        modal_data ={
          show: 1,
          error: 1,
          title: e.code,
          message: e.message,
          btn_text:"",
          btn_action:"",
          close: true,
        }
      }
      else {
        // no way around this as of now
        let transactionResult = e.toString().replace("Error: Transaction has been reverted by the EVM:", "");

        let result = JSON.parse(transactionResult)

        let transaction_url = process.env.BLOCK_EXPLORER + `tx/${result.transactionHash}`
        console.log("result", result)
        console.log(result.transactionHash)
        modal_data ={
          show: 1,
          error: 1,
          title: "Transaction Error",
          message:"There was a problem with your transaction",
          trans_hash: transaction_url,
          btn_text:"View Transaction",
          btn_action:"handleTransaction",
          close: false,
        }
      }


      dispatch(update_modal_title(modal_data));

    });
}

const AllTests = () => {
  const dispatch = useDispatch()

  useEffect(async () => {

    let network_results = await LoadWeb3(dispatch)
    let blockchain_data
    if(network_results.error) {
      console.log("network_results", network_results)
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
      dispatch(update_modal_title(modal_data));
    } else {

      // multiple dispatch store.dispatch({type: OPEN_DIALOG, value:true})
      blockchain_data = await loadBlockchainData(network_results)
      console.log("*********************blockchain_data sadf asdf ", blockchain_data)

      if(blockchain_data.error) {
        dispatch(update_modal_title(blockchain_data));
      }
      else {
        dispatch(update_contract(
          blockchain_data
        ));
        // hashes now in update_contract
        dispatch(update_nft_hash_list(blockchain_data.all_hashes));
      }

      // now get all nft's from mongo db
      let nft_data = await loadTestsMongo()

      if(nft_data.error) {
        console.log("*********************error", nft_data)
        dispatch(update_modal_title(nft_data.data));
      }
      else {
        dispatch(update_nft_buy_list(nft_data.data));
      }

      // let provider = await detectEthereumProvider()
      // SubscribeProvider(provider, dispatch)

    }
  }, []);

  const filters =  [
    { "label": "all", "isChecked": true },
    { "label": "math", "isChecked": false },
    { "label": "programming", "isChecked": false },
    { "label": "react", "isChecked": false },
    { "label": "tile", "isChecked": false }
  ];

  const generic_modal = useSelector((state) => state.generic_modal.value)
  const nft_buy_list = useSelector((state) => state.nft_buy_list.value)
  const nft_hash_list = useSelector((state) => state.nft_hash_list.value)
  const blockchain_state = useSelector((state) => state.contract_test.value)
  let owned_flag

  let showModal

  if(generic_modal) {
    showModal = <GenericModalBootstrap modal={generic_modal} />
  }
  else {
    showModal = <></>
  }

  return (

    <section className="test-section">
      {showModal}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center mb-4">
              <span>Test Your Skills</span>
              <h3 className="mt-3 mb-0">Games and Tests</h3>
            </div>
          </div>
        </div>
        <div className="explore-area-no">
          {/*<div className="row justify-content-center text-center">*/}
          {/*  <div className="col-12">*/}
          {/*    /!* Explore Menu *!/*/}
          {/*    <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">*/}
          {/*      <label className="btn active d-table text-uppercase p-2">*/}
          {/*        <input type="radio" defaultValue="all" defaultChecked className="explore-btn hide-me" />*/}
          {/*        <span>All</span>*/}
          {/*      </label>*/}
          {/*      <label className="btn active d-table text-uppercase p-2">*/}
          {/*        <input type="radio" defaultValue="owned" defaultChecked className="explore-btn hide-me" />*/}
          {/*        <span>Owned</span>*/}
          {/*      </label>*/}
          {/*      <label className="btn d-table text-uppercase p-2">*/}
          {/*        <input type="radio" defaultValue="math" className="explore-btn hide-me" />*/}
          {/*        <span>Math</span>*/}
          {/*      </label>*/}
          {/*      <label className="btn d-table text-uppercase p-2">*/}
          {/*        <input type="radio" defaultValue="programming" className="explore-btn hide-me" />*/}
          {/*        <span>Programming</span>*/}
          {/*      </label>*/}
          {/*      <label className="btn d-table text-uppercase p-2">*/}
          {/*        <input type="radio" defaultValue="javascript" className="explore-btn hide-me" />*/}
          {/*        <span>Javascript</span>*/}
          {/*      </label>*/}
          {/*      <label className="btn d-table text-uppercase p-2">*/}
          {/*        <input type="radio" defaultValue="react" className="explore-btn hide-me" />*/}
          {/*        <span>REACT</span>*/}
          {/*      </label>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {

          }
          {/*TODO: react isotop not working, and shuffle returns nothing */}
          {nft_buy_list
            ? <div className="row items explore-items">

              {/*<IsoTopeGrid*/}
              {/*  gridLayout={nft_buy_list} // showing up empty*/}
              {/*  noOfCols={4} // number of columns show in one row*/}
              {/*  unitWidth={200} // card width of 1 unit*/}
              {/*  unitHeight={100} // card height of 1 unit*/}
              {/*  filters={filters} // list of selected filters*/}
              {/*>*/}
              {nft_buy_list.map((test, idx) => {

                if(nft_hash_list)
                {
                  owned_flag = nft_hash_list.includes(test.img)
                }


                // data-groups={`["${test.test.group}"]`}
                //  data-groups={test.test.group}

                return (
                  <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={`["math"]`}>
                    <div className="card">
                      <div className="image-over">

                        <img className="card-img-top" src={test.img} alt="" />

                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body">

                          <h5 className="mb-0">{test.title}</h5>

                          <div className="card-bottom d-flex justify-content-between">
                            <span>{test.price}</span>
                            <span>{test.count}</span>
                          </div>


                          {owned_flag
                            ?<a className="btn btn-owned" onClick={() =>{takeTest(test)}}>
                              <BuyTestButton test={test} type="owned" />
                            </a>
                            :<a className="btn btn-buy" onClick={() =>{mint(dispatch, blockchain_state, test.img, test.title, test.cost_amount, test.price)}}>
                              <BuyTestButton test={test} type="buy" />
                            </a>
                          }


                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/*</IsoTopeGrid>*/}
            </div>
            : <div className="page-spinner vertical-center"><img src="/assets/svg/claim-loading.svg" width={70} /> </div>
          }

        </div>
      </div>
    </section>
  );


};

export default AllTests;