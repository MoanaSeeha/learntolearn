import React, {Component, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import HeaderSecure from '../components/Header/HeaderSecure';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalAccountDetails from '../components/Modal/ModalAccountDetails';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import QuizApp from "../components/Quiz/QuizApp"
import jwt_decode from "jwt-decode";
import TakeTestConnectionBox from "../components/Wallet/TakeTestConnectionBox";
import { update_unclaimed_learn_decoded } from "../state/tokens/unclaimedLearnSlice"
import setAuthToken from "../setAuthToken";
import GetUserData from "../components/Mongo/GetUserData";



const TakeTestPage = props => {
  const { test_slug } = useParams()
  const dispatch = useDispatch()

  // update learn amount here in case there's a page refresh
  useEffect(async() => {
    const token = sessionStorage.jwtToken;
    const decoded = jwt_decode(token);
    let user_data = await GetUserData(decoded.address, token)
    dispatch(update_unclaimed_learn_decoded( user_data.unclaimed_learn_amount));
  }, []); // Only re-subscribe if props.friend.id changes

  // TODO: MAKE SURE THAT USER OWNS THIS TEST HERE NOT IN TakeTestConnectionBox
//   useEffect(async function persistForm() {
//
//     // TODO: make sure user is logged in and we are SECURE
//     //let auth = SecureAuth(); // hooks inside of body
//
//     const token = sessionStorage.jwtToken;
//     const decoded = jwt_decode(token);
//     const current_chain = process.env.CURRENT_CHAIN_ID
//     let web3
//     let provider
//
//     provider = new ethers.providers.WebSocketProvider(process.env.M_MUMBAI_NODE_WS);
//
//
//     let network_name = provider.detectNetwork()
//
//     console.log("network_name", network_name)
//     // FIRST MAKE SURE WE ARE LOGGED IN
//     if (decoded.address) {
//       //const provider = new ethers.providers.WebSocketProvider(process.env.M_MUMBAI_NODE_WS);
//       // refresh unclaimed learn amount
//
//
//       if (window.ethereum) {
//         console.log("window.ether")
//
//         web3 = new Web3(window.ethereum)
//         await window.ethereum.enable()
//       }
//       else if (window.web3) {
//         console.log("window.web3")
//         web3 = new Web3(window.web3.currentProvider)
//
//
//       }
//       else {
//         console.log("no web3")
//         try {
//
//           // TODO: FORCE LOGIN, SHOW MODAL
//           console.log("trying to auth, SET NETWORK MODAL SO THEY CANNOT PLAY")
//
//           moralisAuth = await Moralis.authenticate({ chainId: process.env.CURRENT_CHAIN_ID }).then(function (user) {
//             console.log("Logginng user moralis: authenticate", user);
//           })
//
//           // await web3.currentProvider.request({
//           //   method: "wallet_switchEthereumChain",
//           //   params: [{chainId: process.env.CURRENT_CHAIN_ID_HEX}]
//           // });
//         } catch (error) {
//
//           console.log("error", error)
//         }
//       }
//
//       const networkId = await web3.eth.net.getId()
//       const network_name = await web3.eth.net.getNetworkType();
//
//       console.log('web3.eth.net.getNetworkType()', network_name);
//
//       dispatch(update_chain_id(networkId.toString()));
//       //dispatch(update_network_name(network_name));
//       dispatch(update_network_modal("show"));
//
//
//       // TODO: problem is that decoded is already stored, token has not been updated, and so unclaimed learn amount is old
//
//       // let provider = await detectEthereumProvider()
//       // console.log("provider", provider)
//       console.log("web3 provider", web3)
//       switch (networkId.toString()) {
//         case current_chain:
//           console.log('MATIC MUMBAI');
//
//           break;
//         default:
//
//           dispatch(update_network_modal("show"));
//
//           // SWITCH
//           try {
//             await web3.currentProvider.request({
//               method: "wallet_switchEthereumChain",
//               params: [{chainId: process.env.CURRENT_CHAIN_ID_HEX}]
//             });
//           } catch (error) {
//             return {
//               error: 1,
//               show: 1,
//               title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
//               message: error.message,
//               loader: "/assets/svg/claim-loading.svg",
//               btn_text:"Switch Network",
//               btn_action:"switchNetwork",
//               close: false,
//             }
//           }
//         // returning causes async issues, set state instead
//       }
//
//
//       let subcribe = SubscribeProvider(provider, dispatch)
//
//       console.log("current provider", provider)
//
//       // TODO: make sure we are connected to right network
//       //let provider_data = await MoralisConnect(dispatch);
//
//
//       //console.log("provider_data.address", provider_data.address);
//
//
//       // get fresh unclaimed_learn_amount from DB
//       // try {
//       //   let user_data = await GetUserData(provider_data.address); // TODO: not waiting
//       //   dispatch(update_unclaimed_learn_decoded(user_data.unclaimed_learn_amount))
//       // } catch (error) {
//       //   console.error(error);
//       // }
//       //
//       // // PERHAPS MAKE SURE THE ADDRESS MATCHES TO WHAT WE'RE LOGGED INTO
//       // let user_tokens = await GetUserTokens(dispatch, provider_data);
//
//       /*
//
// LEARN RETURN SWELL
// Response body
// Download
// TODO: logo missing
// [
//   {
//     "address": "0xcc10fd2a46f1ee311235b5fb234928d4ceed3947",
//     "name": "Learn Token",
//     "symbol": "LEARN",
//     "logo": null,
//     "logo_hash": null,
//     "thumbnail": null,
//     "decimals": "0",
//     "block_number": "23362416",
//     "validated": 1
//   }
// ]
//
//        */
//
//
//       const NFT_TEST_CONTRACT = process.env.NFT_TEST_CONTRACT // TODO: why did this stop working?
//
//       // then we look for NFT's with our test contract
//       let user_nft = await MoralisGetNftToken("0xcd6E0d38cC6Df71882e59DFD9F2F24c5beC22eB2", provider_data.address)
//       console.log("user_nfts", user_nft);
//
//
//
//
//       if(user_nft.total === 0) {
//         console.log("OWNER DOES NOT OWN THIS NFT TEST");
//
//
//         // TODO: redirect or show modal?
//         // TODO: someone could mess with javascript to stop redirect
//
//       }
//       else {
//
//         // TODO: make sure owner owns FTP
//         //
//         console.log("AT LEAST ONE TEST OWNED");
//       }
//
//     }
//     else {
//
//       console.log("NOT LOGGED IN AT ALL, SEND TO LOGIN");
//     }
//
//
//
//
//     //let user_nft = await MoralisGetNftToken("0xbdb2127b89225875cd7a579911a0d4d6f70f89ae")
//
//
//     //localStorage.setItem("user_nft", JSON.stringify(user_nft));
//   }, []);

  //useEffect(() => MoralisGetNftToken("0xbdb2127b89225875cd7a579911a0d4d6f70f89ae")(), []);

  // console.log("DISPATCH", dispatch)

  // TODO: do i need to get test info from DB?
  let test_name = "asdfasdf"
  return (
    <div className="main">
      <HeaderSecure />
      <Container fluid>

        <Row className="content-wrapper">
          <Col xs={12} md={2}>
            <TakeTestConnectionBox test_slug={test_slug} />
          </Col>

          <Col xs={12} md={10}>
            {/*<QuizApp totalQuestions={10} />*/}

            <QuizApp
              totalQuestions={2}
              test_name={test_name}
              test_slug={test_slug}
            />
          </Col>
        </Row>
      </Container>


      {/*<Counter />*/}
      <Footer />
      <ModalAccountDetails />
      <ModalMenu />
      <Scrollup />

    </div>
  )
}
// name, description, amount_lts, cost, token
// <FontAwesomeIcon size={`lg`} icon={["fab", "ethereum"]} />
// TakeTestPage.propTypes = {
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   amount_lts: PropTypes.string.isRequired,
//   cost: PropTypes.string.isRequired,
//   token: PropTypes.string.isRequired,
// };


export default TakeTestPage

