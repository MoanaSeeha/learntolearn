import React, { useEffect} from 'react';
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
// importing MyRouts where we located all of our theme
import MyRouts from './routers/routes'

function App() {

  useEffect(() => {

    if (sessionStorage.jwtToken) {
      const token = sessionStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);

      // Check for expired token
      const currentTime = Date.now() / 1000000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        sessionStorage.setItem("jwtToken", '');
        // Redirect to login
        console.log("app.js: do not redirect to login")
        //window.location.href = "/login";
      }
    }
    else {
      sessionStorage.setItem("logged_status", 'none');
      console.log("APP.JS not logged in");
    }
  }, []); // Only re-subscribe if props.friend.id changes

// TODO: cannot put this here, need this to r


  return (

    <MyRouts />

  );
}

export default App;