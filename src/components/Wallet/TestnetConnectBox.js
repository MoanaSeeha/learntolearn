/* eslint-disable no-alert */
import React, { useEffect, setState, useState } from "react"
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
// import React, {useState, useRefCallback, useEffect} from "react"
import {Col,   Row} from "react-bootstrap"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import BuyButton from "../button/BuyButton"
//import GetUsdFromEther  from "./GetUsdFromEther"
//import GetEtherPrice  from "./GetEtherPrice"
// import {CoinbasePro} from "coinbase-pro-node"
// import { ethers } from "ethers";
import Web3 from 'web3'
//import Web3Provider from 'react-web3-provider';
import Web3Modal from "web3modal"
import ReturnNetwork from "./ReturnNetwork"
import ModalTestnet from "../Modal/ModalTestnet"
import Modal from "../Quiz/Modal"

import '../font/fontawesome';


// import PreSaleButton from "../button/PreSaleButton"

// state
//import {increment} from "../../features/counter/counterSlice"
import { update_chain_id } from "../../state/chainIdSlice"
import { update_network_name } from "../../state/networkNameSlice"
import { update_network_modal } from "../../state/networkModalSlice"
import { update_main_address } from "../../state/mainAddressSlice"
import { update_learn_token_amount } from "../../state/learnTokenSlice"
import { update_eth_amount } from "../../state/ethTokenSlice.js"
import { update_unclaimed_learn } from "../../state/tokens/unclaimedLearnSlice"
import {useDispatch, useSelector} from "react-redux"
import MetamaskSideBox from "./MetamaskSideBox"
import SubscribeProvider  from "./SubscribeProvider"



// const renderModal = () => {
//
//   let modal = {
//     state: 'show',
//     praise: "1234",
//     points: "44",
//     //network_name: networkNameState,
//   }
//
//   console.log("opening modal", modal)
//
//   //console.log("network: ",localStorage.getItem("network"))
//
//   return <ModalTestnet modal={modal} />
//   //return modal;
//
// }
//

//export async function getStaticProps(props) {
const TestnetConnectBox = props => {
  const dispatch = useDispatch()
  const chainIdState = useSelector((state) => state.chain_id.value)
  const networkNameState = useSelector((state) => state.network_name.value)
  const learnTokenAmountState = useSelector((state) => state.learn_token_amount.value)
  const ethTokenAmountState = useSelector((state) => state.eth_token_amount.value)
  const unclaimedLearnState = useSelector((state) => state.unclaimed_learn_amount.value)
  //
  // console.log("chainIdState at first", chainIdState)
  // console.log("networkNameState at first", networkNameState)

  async function connectToProvider() {
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

        // TODO: make sure WE ARE ALWAYS ON POLYGON MUMBAI ON THIS PAGE!!!
        let networkData = await ReturnNetwork(network_name, dispatch);
        console.log("dispatch SENDING: networkData ", networkData);
        dispatch(update_network_name(network_name));

        // this is the sample test, no need to check to see if this is owner
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

      let alert_box_wrapper = document.getElementById("alert-box-wrapper");

      alert_box_wrapper.classList.remove('hide');
      document.getElementById("alert-box-header").innerHTML = "Sdaf";
      document.getElementById("alert-box-text").innerHTML = "sdf asdf sdf ";

    }
  }


  // useEffect(() => {
  //
  //   console.log("useEffect ");
  //   buyNft();
  // }, []); // [] means run once

  // const { doRequest } = useRequest({
  //   url: '/api/users/signout',
  //   method: 'post',
  //   body: {},
  //   onSuccess: () => Router.push('/'),
  // });

  // TODO: do we want to connect to metamask immediately or wait???
  // const EtherPrice = GetEtherPrice();
  // //useEffect(() => connectToProvider(), [GetEtherPrice]); // React Hook useEffect has an unnecessary dependency: 'GetEtherPrice'. Either exclude it or remove the dependency array. Outer scope values like 'GetEtherPrice' aren't valid dependencies because mutating them doesn't re-render the component.
  useEffect(() => connectToProvider(), []);
  //return <div>Signing you out...</div>;



  // TODO: do not render any of this, until page loaded so state is filled!!!
  return (
    <div className="connection-box">
      <MetamaskSideBox />

      <div className="account-details">
        <div className="crypto-wrapper">
          <div className="crypto-balance">
            {/*<span className="highlight">{ learnUnclaimedState }</span> UNCLAIMED LEARN*/}
            {/*<span className="highlight">{ localStorage.getItem("unclaimed_learn_amount") }</span> UNCLAIMED LEARN*/}
            {/*TODO: how to handle state changes, need localStorage here unclaimedLearnState */}
            <span className="highlight">{ unclaimedLearnState }</span> UNCLAIMED LEARN
          </div>
        </div>

        <span className="btn btn-details btn-bordered-white" data-toggle="modal" data-target="#search">
          {/*<a href="#" className="nav-link" data-toggle="modal" data-target="#search">*/}
          {/*  <i className="fas fa-cog" />  View Details*/}
          {/*</a>*/}
          <FontAwesomeIcon size={`lg`} icon={["fa", "user"]} /><span className="px-2">View Details</span>
        </span>

      </div>
    </div>
  )
};

TestnetConnectBox.propTypes = {
  test_slug: PropTypes.string.isRequired,
};


export default TestnetConnectBox;