import React, { useEffect, setState, useState } from "react"
import axios from 'axios';
import {useSelector,useDispatch} from "react-redux"
import {Col, Row, Container} from "react-bootstrap"
import NumberFormat from 'react-number-format';
import Moralis from 'moralis'
import {MoralisGetNftToken} from '../Moralis/MoralisGetNftToken'
import {MoralisGetNft} from '../Moralis/MoralisGetNft'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import MintClaimFrontEnd from "../Wallet/MintClaimFrontEnd"
import { update_claiming } from "../../state/claimingSlice"
import DragonNftBox from "../Quiz/DragonNftBox";
import CryptoRow from "./CryptoRow";

// TODO: use moralis
const InventoryPageContent = props => {


  //"0xbdb2127b89225875cd7a579911a0d4d6f70f89ae"
  // get all NFT's dragon lord
  // useEffect(async function persistForm() {
  //   let user_nft = await MoralisGetNft()
  //   localStorage.setItem("user_nft", JSON.stringify(user_nft));
  //   console.log("async useeffect", user_nft)
  // });
  const address = useSelector((state) => state.main_address.value)
  // land: 0x522546ef44060598de2725d4dab86377f39f28e8
  // 0xbdb2127b89225875cd7a579911a0d4d6f70f89ae
  useEffect(async function persistForm() {
    let nft_contract = process.env.NFT_TEST_CONTRACT
    console.log("nft_contract", nft_contract)
    let user_nft = await MoralisGetNftToken(nft_contract, address)
    localStorage.setItem("user_nft", JSON.stringify(user_nft));
  });


  //useEffect(() => MoralisGetNft(), []);

  const dispatch = useDispatch()
  // ConnectWallet(dispatch)
  const learnTokenAmountState = useSelector((state) => state.learn_token_amount.value)
  const ethTokenAmountState = useSelector((state) => state.eth_token_amount.value)

  // const chainIdState = useSelector((state) => state.chain_id.value)
  // const networkNameState = useSelector((state) => state.network_name.value)
  // const learnUnclaimedState = useSelector((state) => state.unclaimed_learn_amount.value)
  const claimingState = useSelector((state) => state.claiming.value) // update_claiming
  const transactionUrlState = useSelector((state) => state.transaction_url.value) // update_claiming
  //const unclaimedLearnState = useSelector((state) => state.unclaimed_learn_amount.value)

  const handleClick = (e) => {

    //mintClaimFrontEnd();
    dispatch(update_claiming("claiming"));
    //MintClaimBackEnd()
    let mint_results = MintClaimFrontEnd(dispatch)

    console.log("mint_results", mint_results);

    // if(response.data.success){
    //
    //   //alert("Success");
    //   dispatch(update_claiming("finished"));
    //   dispatch(update_transaction_url(response.data.transaction_url));
    //
    // }else{
    //   dispatch(update_claiming("failed"));
    // }
  }

  // TODO: last claim data comes from mongodb/user
  const lastClaim = `You have never made a claim`

  let claimBox;

  //let c = 'claiming'
  //claimingState
  if (claimingState === 'claiming') {
    claimBox =
      <div className="claim-loading">
        <h4>Your Claim is on the way</h4>
        <p>Approve this transaction in metamask!</p>
        {/*{ ClaimLoading }*/}
        <img src="/assets/svg/claim-loading.svg" width={50} />
      </div>;

  }
  else if (claimingState === 'finished') {
    // TODO: update learn amount automatically, get from metamask?
    claimBox =
      <div className="claim-loading">
        <h4>Claim Finished</h4>
        <p><a href={transactionUrlState} target="_blank" rel="noreferrer">View Transaction</a></p>

        <a
          className="btn btn-primary"
          href="/activity"
        >
          ACTIVITIES
        </a>
        {/*TODO: add to metamask button not working index.js:43 Uncaught (in promise) TypeError: https.Agent is not a constructor*/}
        {/*<button*/}
        {/*  className="btn btn-primary"*/}
        {/*  onClick={WalletWatch}*/}
        {/*>*/}
        {/*  Add LEARN to Metamask*/}
        {/*</button>*/}
      </div>
  }
  else {
    claimBox = <div>
      <NumberFormat
        //value={unclaimedLearnState}
        // TODO: properly calculate empty 0
        value={sessionStorage.getItem("unclaimed_learn_amount")}
        className="unclaimed-amount"
        displayType={'text'}
        decimalScale={0}
        thousandSeparator={true}
        prefix={''}
        renderText={(value, props) => <div {...props}>You have <span className="highlight">{sessionStorage.getItem("unclaimed_learn_amount")}</span> unclaimed LEARN</div>}
      />

      <span className="btn btn-claim" onClick={handleClick}>
        <FontAwesomeIcon size={`lg`} icon={["fad", "coins"]} /><span className="px-2">Claim Now</span>
      </span>
      <p>{lastClaim}</p>
    </div>;
  }
  let user_nft
  let user_nft_obj = localStorage.getItem("user_nft")
  if(user_nft_obj)
  {
     user_nft = JSON.parse(user_nft_obj);
    console.log("user_nft", user_nft);
  }



  return (
    <section className="inventory-section">
      <Container className="container">
        <Row className="p-1 align-items-center">
          <Col xs={12}>
            <div className="intro m-0">
              <div className="intro-content">
                <span>Your Assets</span>
                <h3 className="mt-3 mb-0">Inventory</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="p-1 align-items-center">
          <Col xs={12} md={6}>

            <CryptoRow address={process.env.MATIC_ADDRESS} symbol={process.env.MATIC_SYMBOL} decimals={process.env.MATIC_DECIMALS} image={process.env.MATIC_IMAGE} amount={ethTokenAmountState} />
            <CryptoRow address={process.env.ETH_ADDRESS} symbol={process.env.ETH_SYMBOL} decimals={process.env.ETH_DECIMALS} image={process.env.ETH_IMAGE} amount={ethTokenAmountState} />
            <CryptoRow address={process.env.LTS_ADDRESS} symbol={process.env.LTS_SYMBOL} decimals={process.env.LTS_DECIMALS} image={process.env.LTS_IMAGE} amount={ethTokenAmountState} />
            <CryptoRow address={process.env.LEARN_ADDRESS} symbol={process.env.LEARN_SYMBOL} decimals={process.env.LEARN_DECIMALS} image={process.env.LEARN_IMAGE} amount={learnTokenAmountState} />

          </Col>
          <Col xs={12} md={6}>
            <div className="account-details">
              { claimBox }
            </div>
          </Col>
        </Row>
      </Container>


      {/*<MoralisGetNft />*/}
      {/*TODO: ADD TESTS THAT BELONG TO THIS USER*/}
      {/*{user_nft.length > 0 &&*/}

      {/* TODO: need a component for NO NFT box  */}

      {user_nft ?
        <Row className="m-3 items explore-items">
          <h4>{user_nft.total} NFT's found</h4>
          {user_nft.result.map((item, idx) => {
            return (

              <DragonNftBox key={idx} item={item} idx={idx} />
            );
          })}
        </Row>
        :<div>No NFT's</div>
      }



    </section>

  );
}

export default InventoryPageContent;