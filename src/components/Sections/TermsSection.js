import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useDispatch, useSelector} from "react-redux"
import { update_activities } from "../../state/activity/activitySlice"
import Moment from 'react-moment';
import 'moment-timezone';

const TermsSection = () => {

  return (
    <section className="activity-area load-more">
      <div className="container">
        <div className="row">
          <div className="col-12">

            <div className="intro m-0">
              <div className="intro-content">
                <span>Terms and Privacy Policy</span>
                <h3 className="mt-3 mb-0">Terms</h3>
              </div>
            </div>

            <div className="activity-wrapper">

              <p>We value your privacy and will never share your information with third parties.  We do not make your email or ether address available to other users, and will only use your username to identify you in our leaderboards.  We reserve the right to amend these terms at any time.</p>

              <h6>Storing Information</h6>
              <p>We do not use cookies to store any information and do not see a need as of now.  There is no sensitive data that is stored in our platform that may lead to the theft of your crypto currency.</p>

              <h6>Crypto Volatility</h6>
              <p>As with any asset, crypto currencies can be volatile.  We do not offer advice on when to sell your crypto currency and do not have our own wallet.  Prices for LTS and LEARN are determined by market conditions and we have no control over prices. </p>

              <h6>Newsletter</h6>
              <p>Those who have signed up for the newsletter will rarely be contacted and will only be contacted regarding Learn to Earn.  Third parties will never be given your information and will never contact you for any reason.</p>


              <h6>Email Privacy </h6>
              <p>You must verify your email and use one email per account, attached to your main ethereum address.  We ask that you do not create multiple accounts or record answers for tests.  We want our platform to actually help people learn while earning crypto currency.  Cheaters or anyone using any type of automation will be banned at our discretion.</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TermsSection;
