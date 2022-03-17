import React,{useEffect} from 'react';
import {useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Header from '../components/Header/Header';
import BuyLtsSection from '../components/Wallet/buylts/BuyLtsSection';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import GetUserAuth from '../components/Login/GetUserAuth';
import Moralis from 'moralis'
import { ethers } from "ethers";
import {TransferLts} from "../components/Moralis/TransferLts";
import HeaderSecure from "../components/Header/HeaderSecure";

const BuyLtsPage = () => {

  // useEffect(() => updateNet(), []);
  //useEffect(() => GetUserAuth(), []);
  useEffect(() => TransferLts(), []);

  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }

  // async function MoralisAuth() {
  //
  //   const serverUrl = "https://xxxxx/server";
  //   const appId = "YOUR_APP_ID";
  //   Moralis.start({ serverUrl, appId });
  //
  //   // add from here down
  //   async function login() {
  //     let user = Moralis.User.current();
  //     if (!user) {
  //       user = await Moralis.authenticate();
  //     }
  //     console.log("logged in user:", user);
  //   }
  //
  //   async function logOut() {
  //     await Moralis.User.logOut();
  //     console.log("logged out");
  //   }
  //
  //   document.getElementById("btn-login").onclick = login;
  //   document.getElementById("btn-logout").onclick = logOut;
  //
  //
  //   //const user = await Moralis.authenticate({ provider: "walletconnect", chainId: 56 })
  //
  //
  //
  //
  // }



  return (
    <div className="main">
      <HeaderSecure />
      <BuyLtsSection />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};


export default BuyLtsPage