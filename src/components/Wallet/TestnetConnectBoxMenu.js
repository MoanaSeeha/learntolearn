/* eslint-disable no-alert */
import React, { useEffect, setState, useState } from "react"

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
import ModalTestnet from "../Modal/ModalTestnet"
import Modal from "../Quiz/Modal"

// import PreSaleButton from "../button/PreSaleButton"

// state
//import {increment} from "../../features/counter/counterSlice"
import { update_chain_id } from "../../state/chainIdSlice"
import { update_network_name } from "../../state/networkNameSlice"
import { update_main_address } from "../../state/mainAddressSlice"
import {useDispatch, useSelector} from "react-redux"


// const isMetaMaskConnected = async () => {
//
//
//   const providerOptions = {
//     /* See Provider Options Section */
//   };
//
//   const web3Modal = new Web3Modal({
//     network: "rinkeby", // optional
//     cacheProvider: true, // optional
//     theme: "dark",
//     providerOptions // required
//
//   });
//
//
//   const provider = await web3Modal.connect();
//
//   const web3 = new Web3(provider);
//
//
//   console.log("provider in isMetaMaskConnected",provider)
//   console.log("web3 in isMetaMaskConnected",web3)
//
//
//   web3.eth.getAccounts()
//     .then(async (addr) => {
//       // Set User account into state
//
//       console.log("addr", addr)
//
//       return addr;
//     }).catch(async (err) => {
//     // Set User account into state
//
//     console.log("err", err)
//     return err;
//   });
//
//
//
//
//
//   // Subscribe to accounts change
//   provider.on("accountsChanged", (accounts) => {
//
//
//     // TODO: warn user when accounts change
//     console.log(accounts);
//   });
//
// // Subscribe to chainId change
//   provider.on("chainChanged", (chainId) => {
//     console.log(chainId);
//   });
//
//   ////Subscribe to provider connection
// //   provider.on("connect", (info: { chainId }) => {
// //     console.log(info);
// //   });
// //
// // // Subscribe to provider disconnection
// //   provider.on("disconnect", (error: { code, message }) => {
// //     console.log(error);
// //   });
//
//
//   // const web3Modal = new Web3Modal()
//   // const connection = await web3Modal.connect()
//   // //const provider = new ethers.providers.Web3Provider(connection)
//   //
//   //
//   //
//   // const accounts = await provider.listAccounts();
//   // console.log("accounts")
//   // console.log(accounts)
//
//   // return accounts.length > 0;
// }
//



// const signer = provider.getSigner()
//const contract = new ethers.Contract("0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d", Market.abi, signer)




// const { ethereum } = window;
// if (ethereum) {
//   var provider = new ethers.providers.Web3Provider(ethereum);
// }
//

// let provider = new ethers.providers.Web3Provider(ethereum);
//
// const isMetaMaskConnected = async () => {
//   const accounts = await provider.listAccounts();
//   return accounts.length > 0;
// }
//
//
// const checkMetamaskConnection = await isMetaMaskConnected().then((connected) => {
//   if (connected) {
//
//     console.log("metamask, is connected")
//   } else {
//     console.log("metamask, is not connected")
//   }
// });
// async function buyNft() {
//
//
//
// }
// const showTestnetHelp = (tries) => {
//   let praise;
//   let points;
//   console.log("tries", tries)
//
//   // TODO: points/learn tokens should come from question list
//   // TODO: points should depend on number of tries
//
//   switch (tries) {
//     case 0: {
//       praise = '1st Try!';
//       points = '+10';
//       break;
//     }
//     case 1: {
//       praise = '2nd Try!';
//       points = '+5';
//       break;
//     }
//     case 2: {
//       praise = 'Correct!';
//       points = '+2';
//       break;
//     }
//     default: {
//       praise = 'Correct!';
//       points = '+1';
//     }
//   }
//
//   // setState({
//   //   modal: {
//   //     state: 'show',
//   //     praise,
//   //     points
//   //   }
//   // });
//   // this.setState({
//   //   modal: {
//   //     state: 'show',
//   //     praise,
//   //     points
//   //   }
//   // });
// };



const subscribeProvider = async (provider, dispatch) => {
  // Error calling subscribeProvider - Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:x
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

  if (!provider.on) {
    return;
  }
  // provider.on("close", () => this.resetgetWeb3Provider());
  provider.on("accountsChanged", async (accounts) => {
    console.log("inside accountsChanged");



    console.log("process.env", process.env);


  });

  // this fires when we go from ether mainnet to rinkeby, etc
  provider.on("chainChanged", async (chainId) => {
    console.log("inside chainChanged");

    console.log("chainId", chainId);
    // onClick={() => dispatch(increment())}

    dispatch(update_chain_id(chainId));

    // will need to figure out network name from chain id
    switch (chainId) {
      case '0x4':
      case 4:
        console.log('229: RINKEBY');
        // TODO: how the fuck is payload going to be empty???
        // TODO: switching to main works, switching back to rinkeby does NOT WORK
        dispatch(update_network_name('rinkeby', 'rinkeby'));
        break;
      case '0x1':// MAIN
        console.log('223: MAIN????');
        // TODO: how the fuck is payload going to be empty???
        dispatch(update_network_name('main',"main"));
        break;
      case '0x13881': // matic mumbai
        console.log('matic mumbai');
        dispatch(update_network_name('mumbai',"mumbai"));
        break;
        case '0x89': // matic mumbai
        console.log('matic main');
        dispatch(update_network_name('matic',"matic"));
        break;
      default:
        console.log(`Sorry, we are out of ${chainId}.`);
    }


  });

  /**
   * NOt even sure when this is fired, chain ID fires a lot
   */
  provider.on("networkChanged", async (networkId) => {
    console.log("inside networkChanged", networkId);
    // TODO: make sure we are on the right network for now, rinkeby

    // case statement since id is available

    sessionStorage.setItem("networkId", networkId);
    console.log("process.env", process.env);

    sessionStorage.setItem("networkId",networkId);

    switch (networkId) {
      case 80001:
        console.log('MATIC MUMBAI');
        sessionStorage.setItem("network","mumbai");
        break;
      case 2:
      case 3:


        break;
      case 4:

        sessionStorage.setItem("network","rinkeby");
        break;
      default:
        console.log(`DEFAULT`);
    }

  });
};

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
//   //console.log("network: ",sessionStorage.getItem("network"))
//
//   return <ModalTestnet modal={modal} />
//   //return modal;
//
// }
//

//export async function getStaticProps(props) {
const TestnetConnectBox = props => {
  const chainIdState = useSelector((state) => state.chain_id.value)
  const networkNameState = useSelector((state) => state.network_name.value)
  const dispatch = useDispatch()


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
    } catch ( err ) {
      //await this.resetApp()

      console.log("try catch on provider: ", provider)
      hasProvider = false;
    }

    if(hasProvider) {
      try {
        await subscribeProvider(provider, dispatch);


        let web3;
        // Check if browser is running Metamask

        // web3 = new Web3(web3.currentProvider)

        web3 = new Web3(provider);

        // const network = await web3.eth.net.getNetworkType()
        //   .then(console.log);

        const network_name = await web3.eth.net.getNetworkType();
        console.log("dispatch SENDING: update_network_name ", network_name);
        dispatch(update_network_name(network_name));

        // https://blog.logrocket.com/using-localstorage-react-hooks/
        // console.log("CURRENT_NETWORK", process.env.CURRENT_NETWORK);

        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        dispatch(update_main_address(address));

        const networkId = await web3.eth.net.getId();
        dispatch(update_chain_id(networkId));
        // sessionStorage.setItem("networkId", networkId)
        // console.log("address: ", address, " netowrkID: ", networkId);
        //
        // console.log("accounts: ", accounts);



        /*
        useEffect(() => {
  // storing input name
  sessionStorage.setItem("name", JSON.stringify(name));
}, [name]);
         */

        switch (network_name) {
          case process.env.CURRENT_NETWORK: // if matches current network, then proceed
            console.log('Matches current network')
            break
          case "main": // TODO: for now, give a warning about the wrong network, hide quiz
            console.log('This is mainnet');
            // data-toggle="modal" data-target="#menu"
            //setTimeout(() => showTestnetHelp(1), 750);
            //renderModal();
            break

          case "rinkeby":
            console.log('387:  rinkeby')

            break
          default:
            console.log('This is an unknown network.')
        }






        //const accounts = await web3.eth.getAccounts();
        // // Check if User is already connected by retrieving the accounts
        // web3.eth.getAccounts()
        //   .then(async (addr) => {
        //     // Set User account into state
        //
        //     console.log("addr", addr)
        //
        //     web3.eth.getBalance(addr[0])
        //       .then(async (wei) => {
        //
        //         const etherValue = Web3.utils.fromWei(wei, 'ether');
        //         console.log(etherValue);
        //
        //         // const weiValue = Web3.utils.toWei(etherValue, 'ether');
        //         // console.log(weiValue);
        //
        //         let human_readable = Number(etherValue).toFixed(4);
        //
        //         //onsole.log("human_balance", parseInt(etherValue).toFixed(2))
        //         console.log("human_readable", human_readable)
        //
        //         //return human_readable;
        //         //return <div>human {human_readable}</div>
        //         // document.title = `You clicked ${human_readable} times`;
        //         // document.title = `You clicked ${human_readable} times`;
        //
        //         let crypto_balance_el = document.getElementById("crypto-balance");
        //         let account_button_list = document.getElementById("account-button-list");
        //
        //
        //
        //         crypto_balance_el.innerHTML = `<div class="balance-eth mt-2 mr-2"><span><img src="/icons/eth.svg" alt="Your Ether Balance"> </span><span class="balance-text">${human_readable}</span></div>`;
        //         crypto_balance_el.classList = `animate popUp`;
        //         //crypto_balance_el.removeClass = `hide`;
        //
        //         //
        //
        //         // alert-box-wrapper
        //         crypto_balance_el.classList.remove('hide');
        //
        //         // TURN login button to a logout button
        //         account_button_list.classList.remove('hide');
        //         alert_box_wrapper.classList.add('hide');
        //
        //
        //
        //
        //         return human_readable;
        //       }).catch(async (err) => {
        //       // Set User account into state
        //
        //       console.log("balance err", err)
        //       return err;
        //     });
        //
        //
        //     return addr;
        //   }).catch(async (err) => {
        //   // Set User account into state
        //
        //   console.log("er SADF SADF ASr", err)
        //   return err;
        // });

      } catch ( err ) {
        console.error(`Error calling subscribeProvider - ${ err.message }`);
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

  const renderButton = () => {
    // check to see if on right network

    // TODO: check local storage???
    let connected = true;

    if (connected) {
      // return <span className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" data-toggle="modal" data-target="#search" />Connected to {localStorage.getItem("network")}</span>
      return <span className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" data-toggle="modal" data-target="#search" />Connected to {networkNameState}</span>
    }
    else {
      return <span className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" data-toggle="modal" data-target="#search" />Wallet Connect</span>

    }
  }

  // TODO: do not render any of this, until page loaded so state is filled!!!
  return (
    <ul className="navbar-nav action">
      <li className="nav-item ml-3">
        { renderButton() }
        {/*{ renderModal() }*/}
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
          <i className="fas fa-cog" />
          View Details
        </a>
      </li>
    </ul>
    // <Row float="left" className={`mr-4`}>
    //   <Col xs={8}>
    //     <div className={`fiat-crypto-box`}>
    //       <div className={`crypto-price ether`}> dasfasdf  ETH</div>
    //       <div className={`fiat-price`}>
    //         <FontAwesomeIcon size={`sm`} icon={["fa", "dollar-sign"]} />
    //         {/*{ ticker.price }*/}
    //
    //         {/*<ConnectToProviderResults  />*/}
    //         {/*{ConnectToProviderResults}*/}
    //         {/*<ConnectToProviderResults />*/}
    //       </div>
    //     </div>
    //   </Col>
    //   <Col xs={3}>
    //     <ul className="navbar-nav action">
    //       <li className="nav-item ml-3">
    //         <a href="/wallet-connect" className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</a>
    //       </li>
    //     </ul>
    //   </Col>
    // </Row>

    // </Web3Provider>



  )


};

export default TestnetConnectBox;