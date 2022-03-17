import React from 'react';
import ModalTestnet from "../Modal/ModalTestnet"
import {useDispatch, useSelector} from "react-redux"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import HeaderLinks from "./HeaderLinks"
//import connectToDatabase from "../Mongo/mongodb"  // TODO: many errors probably due to m1 chip
// import database from '../../middleware/database'; // backend
// import WalletConnect from "./WalletConnect"
// import TestnetConnectBox from "../Wallet/TestnetConnectBox"

// SECURE FULL SCREEN MODAL NEEDED FOR STOPPING USERS FROM CHANGING ACCOUNTS
const HeaderQuiz = () => {
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
      <header id="header">
        <HeaderLinks headerClassButton="container-fluid header" />
      </header>
    </div>
  );
};

export default HeaderQuiz;