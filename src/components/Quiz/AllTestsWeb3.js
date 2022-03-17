import React, { Component } from 'react';
import IsoTopeGrid from "react-isotope";
// https://mumbai.polygonscan.com/tx/0x310b01ee55b256bd554d7752504a7f6c73131c9ffb946e90a53bfb1c676a81bf
import MoralisSubscriber from "../Moralis/MoralisSubscriber"

// TODO: THIS REALLY NEEDS TO BE REWRITTEN IN NEW FORMAT AND WITH MORALIS
const initData = {
  pre_heading: "TESTS",
  heading: "Exclusive Digital Assets",
  content: "We will add games such as chess and checkers to this list soon.",
  filter_1: "All",
  filter_2: "math",
  filter_3: "programming",
  filter_4: "javascript",
  filter_5: "react"
}

// All version 1 tests are stored in hard coded data as of now

import BuyLtsButton from "../Wallet/buylts/BuyLtsButton";
import {Col, Modal, Row} from "react-bootstrap";
import BuyTestButton from "../Wallet/buyTest/BuyTestButton";


import Meme from '../../abis/Memes.json'
import Web3 from 'web3'
import GenericModalBootstrap from "../Modal/GenericModalBootstrap";
import CheckNetwork from "../Moralis/CheckNetwork";
import {update_chain_id} from "../../state/chainIdSlice";
import {update_network_modal} from "../../state/networkModalSlice";
import {update_network_name} from "../../state/networkNameSlice";

// TODO: if user is logged in, check to see if they own NFT
// MONGO DB should be checked to see if this user owns NFT
//
const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBhNjhhRkI5RDFFZkJFMDQ2NjY2Y2M3OWEzMzI2NGIxYTM2YWZGNkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM4OTA0MzgzNiwibmFtZSI6InRlc3QifQ.84SjglPf8l9QL0NeVHsvS-5PRj9-sOE1NBySg7aogcI";

// TODO: tests need to come from mongo, makes things easier to find out if owned, free, etc
import data from "../../assets/data/tests"



import TestBuyBox from "./TestBuyBox";
import axios from "axios";
import {update_activities} from "../../state/activity/activitySlice";
import button from "bootstrap/js/src/button";
import detectEthereumProvider from "@metamask/detect-provider";
class AllTests extends Component {
  state = {
    initData: {},
    data: [], // pull from mongo
    hashes: [],
    show: 0,
    alert_modal: {
      error: 0,
      title: "",
      message: "",
      show: 0,
      btn_text: "",
      btn_action: "",
      loader: "",
      close: true,
    },
    show_data: false
    //show: 1,
    // modal: {
    //   error: 0,
    //   title: "Transaction Successful",
    //   //link: transaction_url,
    //   link: "ddd",
    //   message: `View Transaction`,
    //   btn_text:"View Activity",
    //   btn_action:"handleActivity",
    //   close: true,
    // }
  }


  async loadWeb3() {
    let web3
    const current_chain = process.env.CURRENT_CHAIN_ID
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    }
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    const networkId = await web3.eth.net.getId()
    switch (networkId.toString()) {
      case current_chain:
        console.log('MATIC MUMBAI');

        break;
      default:
        // SWITCH
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
            message:"Smart contract not deployed to detected network.",
            loader: "/assets/svg/claim-loading.svg",
            btn_text:"Switch Network",
            btn_action:"switchNetwork",
            close: false,
          }
          // if user rejects, then set state
          console.log("error", error);
          // this.setState({
          //   show: 1,
          //   modal: {
          //     error: 0,
          //     title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
          //     message:"Smart contract not deployed to detected network.",
          //     loader: "/assets/svg/claim-loading.svg",
          //     btn_text:"Switch Network",
          //     btn_action:"switchNetwork",
          //     close: false,
          //   }
          // })
        }
      // returning causes async issues, set state instead




    }

    return web3
  }

  async loadBlockchainData(web3) {
    let any_errors

    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    const current_chain = process.env.CURRENT_CHAIN_ID
    console.log("current_chain", current_chain)
    console.log("networkId", networkId)

    // anything other than current network


    const networkData = Meme.networks[networkId]

    console.log("networkData", networkData)



    if (networkData) {
      const abi = Meme.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      // this.setState({ contract })
      const totalSupply = await contract.methods.getMemesCount().call()
      this.setState({ contract: contract, totalSupply: totalSupply })
      console.log('total supply')
      console.log(totalSupply)

      // TODO: need to figure out which ones are already owned.
      // Load hashes
      let all_hashes = []
      for (var i = 1; i <= totalSupply; i++) {
        const hash = await contract.methods.hashes(i - 1).call()

        // setting state for eacch has causes refresh
        all_hashes.push(hash)


      }

      console.log("all_hashes", all_hashes)
      this.setState({
        hashes: [...this.state.hashes, all_hashes]
      })

    } else {
      any_errors += 1
      //window.alert()
      console.log("NO network")
    }

    return any_errors
  }

  async loadTestsMongo() {
    axios.post(process.env.API_URL + "/api/v1/get/list_tests",{
      type: "all",
    })
      .then(response => {

        if(response.data){
          //this.setState({ show: 0 })
          console.log("response.data123", response.data)
          this.setState({ data: response.data, show_data:1 })
          return {
            error: 0,
            data: [response.data]
          }
        }
        else {
          this.setState({ show: 1 })

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
        this.setState({ show: 1 })

        return {
          error: 1,
          title: 'Unknown Error',
          message: err,
          btn_text: "Close",
          btn_action: "handleClose"
        }
      })
  }


  takeTest = async (test) => {

    console.log("test_slug", test)
    window.location.href = "/test/" + test.slug;
  }


  onFilter = event => {
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

  mint = async (img, title, amount, price) => {
    this.setState({
      //hashes: [this.state.show, 0],
      //hashes: [...this.state.hashes, hash],
      //uris: [...this.state.hashes, uri]
      show: 1,
      alert_modal: {
        error: 0,
        title: "Transaction Pending",
        message:"loading button",
        btn_text:"",
        btn_action:"handleClose",
        loader: "/assets/svg/claim-loading.svg",
        close: false,
      }
    })
    // TODO: test info simply needs to come from MONGO DB, and be reconciled with what is owned
    var newNft = {"image":img, "title":title, "amount":amount, "price":price};

    // URI: can use hardcoded IPFS, no need to upload
    console.log(JSON.stringify(newNft));

    console.log("this.state.account", this.state.account)
    console.log("this.state.contract", this.state.contract)

    // string memory _hash, string memory _uri
    // only allows ONE mint per NFT type, which may be fine.  Havig 100 NFT's minted, means every test taken needs
    // mining fees to burn 1 test taken
    // user_tests will store the tests that this user has bought AND STATS
    await this.state.contract.methods.mint(img, JSON.stringify(newNft)).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log("ok")
        console.log("receipt", receipt)

        let transaction_url = process.env.BLOCK_EXPLORER + `tx/${receipt.transactionHash}`
        // TODO:send this transaction to learn_activity table

        console.log("transaction_url", transaction_url)
        this.setState({
          //hashes: [this.state.show, 0],
          //hashes: [...this.state.hashes, hash],
          //uris: [...this.state.hashes, uri]
          show: 1,
          alert_modal: {
            error: 0,
            title: "Transaction Successful",
            link: "",
            message: `View Transaction`,
            btn_text:"View Activity",
            btn_action:"handleActivity",
            close: false,
          }
        })

        /*
        blockHash: '0xe733af820793d78abb2d9cbeb9a599bab7d624353b579c7fc98305a63a4ff351', blockNumber: 23385492, contractAddress: null, cumulativeGasUsed: 416629, effectiveGasPrice: '0x9502f907', …}
blockHash: "0xe733af820793d78abb2d9cbeb9a599bab7d624353b579c7fc98305a63a4ff351"
blockNumber: 23385492
contractAddress: null
cumulativeGasUsed: 416629
effectiveGasPrice: "0x9502f907"
events: {0: {…}, TransferSingle: {…}}
from: "0xe14a9c71c71d3fa96f47037fb52775d6e1cd407d"
gasUsed: 190298
logsBloom: "0x00200000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000018020000000000000000000002000000000000000000000000000020000800000000000000000000100000000000000000000020000000000000000000800000000000000000080000000000000000000000000000000000004000000000000000000000000000000000000000000200000000000000800000000000000000000000200000000000000000000024000000000000000000001000000000000000000000008000000100000000020000000000000000000000000000000000000000000000000000000080000100000"
status: true
to: "0xcd6e0d38cc6df71882e59dfd9f2f24c5bec22eb2"
transactionHash: "0x63f8acf844385cbfbe017d0b930788ade0fb27b4db6532f2a169d4e803dc9c31"
transactionIndex: 2
type: "0x2"
         */


      })
      .catch(e => {
        if (e.code === 4001){
          this.setState({
            show: 0,
          })
        }
        else {
          // TODO: catch other error codes
          console.log("mint failed: ", e)
        }
      });
    console.log("mint is done")
    //const tokenURI = this.state.contract.methods.getTokenUri().call()
    //.then(function(resp) {
    //  console.log(resp)
    //})
    //console.log("tokenURI = " + tokenURI)

  }

  async componentDidMount(){

    let web3
    let blockchain_data
    let network_results = await this.loadWeb3()

    if(network_results.error) {
      this.setState({
        show: 1,
        alert_modal: {
          error: 0,
          title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
          message:"Smart contract not deployed to detected network.",
          loader: "/assets/svg/claim-loading.svg",
          btn_text:"Switch Network",
          btn_action:"switchNetwork",
          close: false,
        }
      })
      let blah = ""
    } else {
      web3 = network_results
      blockchain_data = await this.loadBlockchainData(web3)
    }


    if(!this.state.show) {
      let test_nft_data = await this.loadTestsMongo()
      console.log("getting data fter everything is ok", test_nft_data)
    }

    console.log("blockchain_data", blockchain_data)
    // this.setState({
    //   show: 1,
    //   modal: {
    //     error: 0,
    //     title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
    //     message:"Smart contract not deployed to detected network.",
    //     loader: "/assets/svg/claim-loading.svg",
    //     btn_text:"Switch Network",
    //     btn_action:"switchNetwork",
    //     close: false,
    //   }
    // })
    // set state once, in here
    // if(blockchain_data) {
    //   this.setState({
    //     // data: data,
    //     modal: {
    //       error: blockchain_data.error,
    //       title: blockchain_data.title,
    //       message:blockchain_data.message,
    //       show:blockchain_data.show,
    //       btn_text:blockchain_data.btn_text,
    //       btn_action:"handleClose",
    //       close: false
    //     }
    //   })
    // }

  }
  render() {

    const filters =  [
      { "label": "all", "isChecked": true },
      { "label": "math", "isChecked": false },
      { "label": "programming", "isChecked": false },
      { "label": "react", "isChecked": false },
      { "label": "tile", "isChecked": false }
    ];

    let showModal
    if(this.state.show) {
      showModal = <GenericModalBootstrap modal={this.state.modal} />
    }
    else {
      showModal = <></>
    }
    let show_data
    if(this.state.data) {
      // TODO: loader
      show_data = 0
    }
    else {
      show_data = 1
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
            {this.state.show_data
              ? <div className="row items explore-items">

                {/*<IsoTopeGrid*/}
                {/*  gridLayout={this.state.data} // showing up empty*/}
                {/*  noOfCols={4} // number of columns show in one row*/}
                {/*  unitWidth={200} // card width of 1 unit*/}
                {/*  unitHeight={100} // card height of 1 unit*/}
                {/*  filters={filters} // list of selected filters*/}
                {/*>*/}
                {this.state.data.map((test, idx) => {

                  let owned_flag = this.state.hashes[0].includes(test.img)

                  console.log("user owns: ", owned_flag)

                  // data-groups={`["${test.test.group}"]`}
                  //  data-groups={test.test.group}

                  return (
                    <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={`["math"]`}>
                      <div className="card">
                        <div className="image-over">
                          <a href="/item-details">
                            <img className="card-img-top" src={test.img} alt="" />
                          </a>
                        </div>
                        {/* Card Caption */}
                        <div className="card-caption col-12 p-0">
                          {/* Card Body */}
                          <div className="card-body">
                            <a href="/item-details">
                              <h5 className="mb-0">{test.title}</h5>
                            </a>
                            <div className="seller d-flex align-items-center my-3">
                              <span>Owned By</span>
                              <a href="/author">
                                <h6 className="ml-2 mb-0">{test.owner}</h6>
                              </a>
                            </div>
                            <div className="card-bottom d-flex justify-content-between">
                              <span>{test.price}</span>
                              <span>{test.count}</span>
                            </div>


                            {owned_flag
                              ?<a className="btn btn-owned" onClick={() =>{this.takeTest(test)}}>
                                <BuyTestButton test={test} type="owned" />
                              </a>
                              :<a className="btn btn-buy" onClick={() =>{this.mint(test.img, test.title, test.cost_amount, test.price)}}>
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
  }
}

export default AllTests;