import React, {Component, useEffect, useState} from 'react';
import ModalTestnet from "../Modal/ModalTestnet"
import {useDispatch, useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import HeaderLinks from "./HeaderLinks"
import {ethers} from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import SubscribeProvider from "../Wallet/SubscribeProvider";
import Web3 from "web3";
import LoadWeb3 from "../Moralis/Login/LoadWeb3";
import {update_modal_title} from "../../state/genericModalSlice";
import {update_network_name} from "../../state/networkNameSlice";
import GenericModalBootstrap from "../Modal/GenericModalBootstrap";
import GetNetworkInfo from "../Wallet/GetNetworkInfo";
// import {update_chain_id} from "../state/chainIdSlice";

//import connectToDatabase from "../Mongo/mongodb"  // TODO: many errors probably due to m1 chip
// import database from '../../middleware/database'; // backend
// import WalletConnect from "./WalletConnect"
// import TestnetConnectBox from "../Wallet/TestnetConnectBox"

// TODO:ALL WEB3 SECURE PAGES USE THIS PAGE
// SECURE FULL SCREEN MODAL NEEDED FOR STOPPING USERS FROM CHANGING ACCOUNTS
// making this async breaks

// hooks cannot be called in async
const HeaderSecure = () => {
  const dispatch = useDispatch()
  const generic_modal = useSelector((state) => state.generic_modal.value)

  useEffect(async () => {
    let web3
    let blockchain_data
    let subcribe
    let network_results = await LoadWeb3(dispatch)
    if(network_results.error) {
      // put network name into state
      let modal_data = {
        show: 1,
        error: 1,
        title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
        message: "Smart contract not deployed to detected network.",
        loader: "/assets/svg/claim-loading.svg",
        btn_text: "Switch Network1",
        btn_action: "switchNetwork",
        close: false,
      }

      dispatch(update_modal_title(modal_data));
    }
    else {
      web3 = network_results
    }

    // no reason to check network
    const current_chain = process.env.CURRENT_CHAIN_ID
    let provider = await detectEthereumProvider()
    subcribe = SubscribeProvider(provider, dispatch)

    const networkId = await web3.eth.net.getId()
    // TODO: first time someone lands, the network name needs to be set
    GetNetworkInfo(provider, dispatch, networkId)

  }, [])

  let showModal
  if(generic_modal) {
    showModal = <GenericModalBootstrap dispatch={dispatch} modal={generic_modal} />
  }
  else {
    showModal = <></>
  }

  const networkNameState = useSelector((state) => state.network_name.value)
  const networkModalState = useSelector((state) => state.network_modal.value)

  let full_modal = {
    network_modal: networkModalState, // TODO: comes from state
    praise: "1234",
    points: "44",
    network_name: networkNameState,
  }

  return (
    <div>
      <ModalTestnet full_modal={ full_modal } />
      {showModal}
      <header id="header">
        <HeaderLinks headerClassButton="container-fluid header" />
      </header>
    </div>
  );
};

export default HeaderSecure;