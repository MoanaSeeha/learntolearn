import React, { Component } from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from "react-redux"
import {Col, Row} from "react-bootstrap"
import NumberFormat from 'react-number-format';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import MintClaimBackEnd from "../Wallet/MintClaimBackEnd"
import MintClaimFrontEnd from "../Wallet/MintClaimFrontEnd"


// import { ClaimLoading } from "../../svg/claim-loading.svg" // svg inline loader not working
import { update_chain_id } from "../../state/chainIdSlice"
import { update_network_name } from "../../state/networkNameSlice"
import { update_claiming } from "../../state/claimingSlice"
import CryptoRow from "../Wallet/CryptoRow"; // TODO: replace this with NFT tests this user owns
// import { update_learn_token_amount } from "../../state/learnTokenSlice"
// import { update_eth_amount } from "../../state/ethTokenSlice.js"
// import { update_unclaimed_learn } from "../../state/tokens/unclaimedLearnSlice"
// const API='http://127.0.0.1:7777'
const API = process.env.API_URL;    // TODO: get from env

const initData = {
  menuName: "Account Details",
  menuIcon: "far fa-times-circle icon-close",
  heading: "What are you looking for?",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  btnText: "Search"
}

const ModalAccountDetails = props => {

  const learnTokenAmountState = useSelector((state) => state.learn_token_amount.value)
  const ltsTokenAmountState = useSelector((state) => state.lts_token_amount.value)
  const ethTokenAmountState = useSelector((state) => state.eth_token_amount.value)
  const address = useSelector((state) => state.main_address.value)
  // const chainIdState = useSelector((state) => state.chain_id.value)
  // const networkNameState = useSelector((state) => state.network_name.value)
  // const learnUnclaimedState = useSelector((state) => state.unclaimed_learn_amount.value)
  const claimingState = useSelector((state) => state.claiming.value) // update_claiming
  const transactionUrlState = useSelector((state) => state.transaction_url.value) // update_claiming
  const unclaimedLearnState = useSelector((state) => state.unclaimed_learn_amount.value)
  const dispatch = useDispatch()

  // const main_address = useSelector((state) => state.main_address.value)

  // async???
  const handleClick = async (e) => {

    //mintClaimFrontEnd();
    dispatch(update_claiming("claiming"));
    //MintClaimBackEnd()
    let mint_results = await MintClaimFrontEnd(dispatch)

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


  } else if (claimingState === 'failed') {
    claimBox =
      <div className="claim-loading">
        <h4>Claim Failed</h4>
        <p>This transaction has reverted</p>

        <p>Refresh Page</p>
      </div>;
  } else if (claimingState === 'finished') {
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
  } else {
    claimBox = <div>
      <NumberFormat
        //value={unclaimedLearnState}
        // TODO: properly calculate empty 0
        value={ unclaimedLearnState }
        className="unclaimed-amount"
        displayType={'text'}
        decimalScale={0}
        thousandSeparator={true}
        prefix={''}
        renderText={(value, props) => <div {...props}>You have <span className="highlight">{unclaimedLearnState}</span> unclaimed LEARN</div>}
    />

      <span className="btn btn-claim" onClick={handleClick}>
                    <FontAwesomeIcon size={`lg`} icon={["fad", "coins"]} /><span className="px-2">Claim Now</span>
                  </span>
      <p>{lastClaim}</p>
    </div>;
  }


  return (
      <div id="search" className="modal fade p-0">
        <div className="modal-dialog dialog-animated">
          <div className="modal-content h-100">
            <div className="modal-header-account" data-dismiss="modal">
              <Row className="p-1 align-items-center">
                <Col xs={10}>
                  <h3>Account Details</h3>
                </Col>
                <Col xs={2}>
                  <FontAwesomeIcon size={`lg`} icon={["fas", "times"]} />
                </Col>
              </Row>


            </div>
            <div className="modal-body-account">
              <div className="col-12 pb-3">
                <CryptoRow address={process.env.LTS_ADDRESS} symbol={process.env.LTS_SYMBOL} decimals={process.env.LTS_DECIMALS} image={process.env.LTS_IMAGE} amount={ltsTokenAmountState} />
                <CryptoRow address={process.env.LEARN_ADDRESS} symbol={process.env.LEARN_SYMBOL} decimals={process.env.LEARN_DECIMALS} image={process.env.LEARN_IMAGE} amount={learnTokenAmountState} />


                {/*TODO: replace with Crypto Row, BALANCES ARE ALL OFF IN METAMASK */}
                {/*<Row className="p-1">*/}
                {/*  <Col xs={1}>*/}
                {/*    <img className="crypto-icon" src="/assets/svg/crypto/learn.png" alt="LEARN Token" width="30"/>*/}
                {/*  </Col>*/}
                {/*  <Col xs={11}>*/}
                {/*    <NumberFormat*/}
                {/*        value={learnTokenAmountState}*/}
                {/*        className="crypto-amount"*/}
                {/*        displayType={'text'}*/}
                {/*        decimalScale={0}*/}
                {/*        thousandSeparator={true}*/}
                {/*        prefix={''}*/}
                {/*        renderText={(value, props) => <div {...props}>{value} LEARN</div>}*/}
                {/*    />*/}
                {/*  </Col>*/}

                {/*</Row>*/}
                {/*<Row className="p-1">*/}
                {/*  <Col xs={1}>*/}
                {/*    <img className="crypto-icon" src="/assets/svg/crypto/eth.svg" alt="ETH Token" width="30" />*/}
                {/*  </Col>*/}
                {/*  <Col xs={11}>*/}
                {/*    <NumberFormat*/}
                {/*        value={ethTokenAmountState}*/}
                {/*        className="crypto-amount"*/}
                {/*        displayType={'text'}*/}
                {/*        decimalScale={3}*/}
                {/*        thousandSeparator={true}*/}
                {/*        prefix={''}*/}
                {/*        renderText={(value, props) => <div {...props}>{value} ETH</div>}*/}
                {/*    />*/}
                {/*  </Col>*/}

                {/*</Row>*/}

                <div className="account-details">
                  {claimBox}
                </div>


              </div>
            </div>
          </div>

        </div>
      </div>


  );
}

export default ModalAccountDetails;