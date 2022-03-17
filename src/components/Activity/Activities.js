import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {useDispatch, useSelector} from "react-redux"
import { update_activities } from "../../state/activity/activitySlice"
import Moment from 'react-moment';
import 'moment-timezone';

const API_URL = process.env.API_URL;

const typeSwitch = (activity) => {

  switch(activity.type) {
    case 'claim':
      return <span>You made a <span className="highlight">claim</span> <Moment fromNow>{activity.action_time}</Moment>.</span>;
    case 'test_taken':
      return <span>You took a <span className="highlight">{activity.test_name} test</span> <Moment fromNow>{activity.action_time}</Moment> and made <span className="highlight">{activity.score} LEARN</span> Tokens. </span>;
    case 'test_bought':
      return <span>You bought a <span className="highlight">test</span> <Moment fromNow>{activity.action_time}</Moment>.</span>;
    default:
      return 'foo';
  }
}

const transactionSwitch = (activity) => {
  if(activity.transaction_url) {
    return (
      <div className="transaction-link">
        <a href={activity.transaction_url} rel="noreferrer" target="_blank" >View Transaction</a>
      </div>
    )
  }
}

const scoreSwitch = (activity) => {
  if(activity.score) {
    return (
      <div className="score-wrapper"><img className="crypto-icon" src="/assets/svg/crypto/learn.png" alt="LEARN Token" width="30" /></div>
    )
  }
}

// TODO: this is running twice!
const Activities = () => {
  const dispatch = useDispatch()
  useEffect(() => {

    const headers = {
      'Content-Type': 'application/json'
    };
    axios.post(API_URL + "/api/v1/get/list_activity",{
      ether_address: "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d",
    },{headers}
    )
      .then(response => {

        if(response.data){
          console.log("response.data", response.data);
          dispatch(update_activities(response.data));
        }
        else {
          console.log("NO SUCCESS response.data", response.data);
        }
      })
      .catch(err => {
        console.log("err.data");
        console.log(err);
        return true;
      })

  }, []);

  const yourActivitiesState = useSelector((state) => state.list_activities.value)

  console.log("yourActivitiesState", yourActivitiesState)
  const dateToFormat = 'MMMM Do YYYY, h:mm a';
  // TODO: group by date like axie infinity activity page
  // https://marketplace.axieinfinity.com/profile/activity/
  if(yourActivitiesState) {
    return (
      <section className="activity-area load-more">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="intro m-0">
                <div className="intro-content">
                  <span>ACTIVITY</span>
                  <h3 className="mt-3 mb-0">Your Activity</h3>
                </div>
              </div>

              <div className="activity-wrapper">
                <ul>
                  {yourActivitiesState.map(function(activity, index){
                    return <li key={ index }>
                      <h5>{typeSwitch(activity)}</h5>

                      <div className="timestamp">
                        <Moment format={dateToFormat}>{activity.action_time}</Moment>
                      </div>
                      {transactionSwitch(activity)}
                    </li>;
                  })}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>

    )
  } else {
    return <span></span>
  }


}
export default Activities;
