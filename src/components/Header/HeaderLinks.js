import React,{useEffect} from 'react';
import WalletConnect from "./WalletConnect"
import PropTypes from "prop-types"
import QuestionList from "../Quiz/QuestionList"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useSelector} from "react-redux";
// import Eth from 'ethjs-query';

import detectEthereumProvider from '@metamask/detect-provider';
import LoginLogoutButton from "../Login/LoginLogoutButton"

const addtokenstyle = {
  color: 'red'
};

const HeaderLinks = ({ headerClassName }) => {
// const HeaderLinks = props => {
  // center  mx-auto
  const transactionUrlState = useSelector((state) => state.transaction_url.value)
  const tokenName = 'LEARN', tokenSymbol = 'LEARN',  tokenDecimals = 0,  tokenAddress = '0x51c9Ed7ce93C95e10B22F19d126e3C3E3f9e9B2A';
  const tokenImage = 'https://pbs.twimg.com/profile_images/802481220340908032/M_vde_oi_400x400.jpg', tokenNet = '1',  message = '';
  const errorMessage = '',  net = '1';

  // TODO: no need to authenticate on each page!!!
  //useEffect(() => updateNet(), []);

  // TODO: this is not the best place for this
  // improve this function and place it in one place, used by ONLY pages that need it
  async function updateNet() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
    } catch (switchError) {
      alert("Please install metamask");
    }
  }
  async function ActivityLink() {
    if (sessionStorage.jwtToken) {
      return (
        <li className="nav-item">
          <a href="/activity" className="nav-link">Activity</a>
        </li>
      )
    }
  }

  return (

    <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
      {/*<div className="container-fluid header">*/}
      <div className={"header container-fluid"}>
        {/* Navbar Brand*/}
        <div className={"col-5"}>
          <a className="navbar-brand" href="/">
            <img className="navbar-brand-sticky" src="/img/logo.png" alt="sticky brand-logo" />
          </a>
        </div>

        <div className={"col-7 fr"}>
          {/* Navbar */}
          <ul className="navbar-nav items">

            {/*<li className="nav-item">*/}
            {/*  <a href="#" onClick={async (event) => {*/}
            {/*  const provider = await detectEthereumProvider()*/}
            {/*  provider.sendAsync({*/}
            {/*    method: 'metamask_watchAsset',*/}
            {/*    params: {*/}
            {/*      "type": "ERC20",*/}
            {/*      "options": {*/}
            {/*        "address": tokenAddress,*/}
            {/*        "symbol": tokenSymbol,*/}
            {/*        "decimals": tokenDecimals,*/}
            {/*        "image": tokenImage,*/}
            {/*      },*/}
            {/*    },*/}
            {/*    id: Math.round(Math.random() * 100000),*/}
            {/*  }, (err, added) => {*/}
            {/*    console.log('provider returned', err, added)*/}
            {/*    if (err || 'error' in added) {*/}
            {/*      // this.setState({*/}
            {/*      //   errorMessage: 'There was a problem adding the token.',*/}
            {/*      //   message: '',*/}
            {/*      // })*/}
            {/*      return*/}
            {/*    }*/}
            {/*    // alert("Added LEARN Token to metamask!")*/}
            {/*    // this.setState({*/}
            {/*    //   message: 'Token added!',*/}
            {/*    //   errorMessage: '',*/}
            {/*    // })*/}
            {/*  })*/}
            {/*}}*/}
            {/*className="nav-link" style={addtokenstyle}>Add LEARN TOKEN to metamask</a>*/}
            {/*</li>*/}
            {sessionStorage.jwtToken
              ?<li className="nav-item">
                <a href="/activity" className="nav-link">Activity</a>
              </li>
              : <></>
            }

            <li className="nav-item">
              <a href="/buy-lts" className="nav-link">Buy LTS</a>
            </li>

            <li className="nav-item">
              <a href="/tests" className="nav-link">Tests</a>
            </li>



            <li className="nav-item">
              <a href="/" className="nav-link" target="_blank" rel="noreferrer">White Paper</a>
            </li>

            {/*<li className="nav-item">*/}
            {/*  <a href="https://forms.gle/ottVhQhf3WfV9Fir5" className="nav-link" target="_blank" rel="noreferrer">Submit Question</a>*/}
            {/*</li>*/}

            {/*<li className="nav-item">*/}
            {/*  <a href="/game-integration" className="nav-link">Game Integration</a>*/}
            {/*</li>*/}


            {/*<li className="nav-item">*/}
            {/*  <a href="/contact" className="nav-link">Contact</a>*/}
            {/*</li>*/}

            <li className="nav-item">
              <a href="/help" className="nav-link">Help</a>
            </li>
            {sessionStorage.jwtToken
              ?<></>
              : <li className="nav-item">
                <a href="/signup" className="nav-link">Sign Up</a>
              </li>
            }
            <LoginLogoutButton />

          </ul>
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                <i className="fas fa-bars toggle-icon m-0" />
              </a>
            </li>
          </ul>
        </div>

        {/* TODO: login/ logout button  */}
        {/*<TestnetConnectBox />*/}
        {/*<WalletConnect />*/}
      </div>
    </nav>

  );
};

HeaderLinks.propTypes = {
  headerClassName: PropTypes.string,
};

export default HeaderLinks;