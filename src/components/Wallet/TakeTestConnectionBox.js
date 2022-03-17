/* eslint-disable no-alert */
// TODO: turn this into moralis
import React, { useEffect, setState, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import '../font/fontawesome';
import MetamaskSideBox from "./MetamaskSideBox"

//export async function getStaticProps(props) {
const TakeTestConnectionBox = props => {
  const dispatch = useDispatch()
  const chainIdState = useSelector((state) => state.chain_id.value)
  const networkNameState = useSelector((state) => state.network_name.value)
  const learnTokenAmountState = useSelector((state) => state.learn_token_amount.value)
  const ethTokenAmountState = useSelector((state) => state.eth_token_amount.value)
  const unclaimedLearnState = useSelector((state) => state.unclaimed_learn_amount.value) // needs to come from session storage, in case of page refresh
  const attentionSpanState = useSelector((state) => state.attention_span.value)

  // sessionStorage.getItem("unclaimed_learn_amount")
  // TODO: issue with session storage and state and unclaimed_learn_amount
  // if using state,

  // TODO: do not render any of this, until page loaded so state is filled!!!
  return (
    <div className="connection-box">
      <MetamaskSideBox />

      <div className="account-details">
        <div className="crypto-wrapper">
          <div className="crypto-balance">
            <span className="highlight">{ unclaimedLearnState }</span> UNCLAIMED LEARN
          </div>
          <div className="crypto-balance">
            <span className="highlight">{ attentionSpanState }</span> ATTENTION SPAN
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

TakeTestConnectionBox.propTypes = {
  test_slug: PropTypes.string.isRequired,
  provider_data: PropTypes.object,
};


export default TakeTestConnectionBox;