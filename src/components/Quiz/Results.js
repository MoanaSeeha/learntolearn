import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tally from '../../../helpers/tally';
import { update_unclaimed_learn } from "../../state/tokens/unclaimedLearnSlice"
import {useDispatch, useSelector} from "react-redux"
import axios from "axios";
import {update_activities} from "../../state/activity/activitySlice";
import jwt_decode from "jwt-decode";

const API='http://127.0.0.1:7777'

// TODO: need to update unclaimedLearn here
const Results = ({ userAnswers, score, restartQuiz, test_name }) => {
  const triesTotal = tally(userAnswers);
  const oneTry = triesTotal[1] && <div><strong>{triesTotal[1]}</strong> on the first try.</div>;
  const twoTries = triesTotal[2] && <div><strong>{triesTotal[2]}</strong> on the second try.</div>;
  const threeTries = triesTotal[3] && <div><strong>{triesTotal[3]}</strong> on the third try.</div>;
  const fourTries = triesTotal[4] && <div><strong>{triesTotal[4]}</strong> on the fourth try.</div>;
  const dispatch = useDispatch()

  // TODO: cannot update state here
  // react_devtools_backend.js:2540 Warning: Cannot update a component (`ModalAccountDetails`) while rendering a different component (`Results`). To locate the bad setState() call inside `Results`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render


  useEffect(() => {
    //dispatch(update_unclaimed_learn(score));
    // TODO: need to get address in here
    const token = sessionStorage.jwtToken;
    const decoded = jwt_decode(token);
    console.log("Reesults decoded useEffect", decoded);

    // TODO: send new unclaimed learn, all calculations done in backend and new unclaimed learn amount returned

    // send total score, not just this score
    axios.post(API + "/api/v1/update/unclaimed_learn",{ether_address: decoded.address, unclaimed_learn_amount: score})
      .then(response => {
        if(response.data){
          console.log("23 response.data", response.data);
          dispatch(update_unclaimed_learn({score: response.data.new_unclaimed, address: decoded.address}));
          // sessionStorage.setItem("unclaimed_learn_amount", response.data.new_unclaimed) // this happens in the action
        }
        else {
          console.log("37 unknown error")
        }
      })
      .catch(err => {
        console.log("err.data");
        console.log(err);
        return true;
      })

    // TODO: update activities table
    axios.post(API + "/api/v1/update/update_test_activity",{
      ether_address: "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d",
      type: "test_taken",
      score: score,
      test_name: test_name,
      action_time: Date.now(), // can be when timer started, or when test ended
      time_taken: 12323, // TODO: KHAM, TIMER RESULT GOES HERE.  HOW LONG IT TOOK TO TAKE TEST
    })
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

  // TODO: calculate points to learn tokens here and store in local storage
  return (
    <div className="results-container">
      <h2>Test Results</h2>
      <div>You answered...</div>
      {oneTry}
      {twoTries}
      {threeTries}
      {fourTries}
      <div className="results-total">Your Total Score is <strong>{score}</strong>.</div>
      <a onClick={restartQuiz}>Restart Quiz</a>
    </div>
  );
}

Results.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired,
  test_name: PropTypes.string.isRequired
};

export default Results;
