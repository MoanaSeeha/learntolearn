import axios from "axios";
import setAuthToken from "../state/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import {useDispatch, useSelector} from "react-redux"

// import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) =>{

  let API_URL = process.env.API_URL
  console.log("history", history)
  //console.log("registering now", userData)
  let results = axios
    .post(API_URL + "/api/v1/users/register", userData)
    //.then(res => postRegister(res))
    .then(res => {

      console.log("Res.data sdfsafd ", res.data)

      let final_result = {
        error: res.data.error,
        error_message: res.data.error_message
      }

      if(res.data.error) {
        console.log("Error", res.data.message)
        sessionStorage.setItem("error", res.data.error);
        sessionStorage.setItem("title", res.data.title);
        sessionStorage.setItem("message", res.data.message);
        window.location = "#sign-up-form";
      }
      else {
        sessionStorage.setItem("error", 0);
        sessionStorage.setItem("title", "");
        sessionStorage.setItem("message", "");
      }
    })
    .catch(err =>
      console.log(err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );

};

// All front
export const postRegister = (res) =>{
  console.log("postRegister", res.data)
  return res.data;
};

// Login - get user token
export const loginUser = async userData => {

  const API_URL = process.env.API_URL
  console.log("onSubmit Login", userData)
  let results = await axios
    .post(API_URL + "/api/v1/users/login", userData)
    .then(res => {
      // Save to sessionStorage



      // TODO: need error checking here
      let final_result = res.data

      console.log("final_result", final_result);

      // TODO: properly load bootstrap modal!
      if(final_result.errors) {
        console.log("Error", final_result)
        sessionStorage.setItem("error", res.data.error);
        sessionStorage.setItem("title", res.data.title);
        sessionStorage.setItem("message", res.data.message);
      }
      else {
        sessionStorage.setItem("error", 0);
        sessionStorage.setItem("title", "");
        sessionStorage.setItem("message", "");
        // Set token to sessionStorage
        const { token } = res.data;
        sessionStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);

        console.log("decoded", decoded)
      }

      return final_result
      //window.location.href='/inventory'
      // Set current user
      // dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      console.log("authActions.js err", err)
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );

  return results;
};


// Log user out
export const securePage = () => dispatch => {

  console.log("securePage")
};


// Set logged in user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };
//
// // User loading
// export const setUserLoading = () => {
//   return {
//     type: USER_LOADING
//   };
// };

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  sessionStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
