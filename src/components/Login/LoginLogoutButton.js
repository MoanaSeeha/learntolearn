import React, { useEffect} from 'react';
import detectEthereumProvider from "@metamask/detect-provider";
import jwt_decode from "jwt-decode";
import { useMoralis } from "react-moralis";


/**
 * Show login button, meta login, or logout
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LoginLogoutButton = () => {

  //useEffect(() => {

    // if(token) {
    //   decoded = jwt_decode(token);
    //
    //   // check to see if auth, if not, show metamask
    //   if(isAuthenticated) {
    //     console.log("LOGIN AUTH", user)
    //     login_logout_button =   <li className="nav-item">
    //       <a href="#" onClick={() => authenticate()}
    //          className="nav-link">META Login</a>
    //     </li>
    //   }
    //   else {
    //     console.log("LOGIN AUTH", user)
    //     login_logout_button =   <li className="nav-item">
    //       <a href="#" onClick={() => console.log("LOGOUT")}
    //          className="nav-link">Logout</a>
    //     </li>
    //   }
    //
    //
    //
    //
    //   // now check state for network?
    //
    // }
    // else {
    //   login_logout_button =   <li className="nav-item">
    //     <a href="#" onClick={async (event) => {
    //       const provider = await detectEthereumProvider()
    //
    //       console.log("provider", provider)
    //     }}
    //        className="nav-link">Login</a>
    //   </li>
    // }


  //   return login_logout_button
  //
  // }, [isAuthenticated]); // Only re-subscribe if props.friend.id changes



  //console.log("decoded", decoded)
  // don't really need to check web3: if not logged in, then not logged in
  // after going to LOG IN PAGE, we should be link to web3 anyway


  // this causes things to run 4 times

  let meta_icon
  if(sessionStorage.getItem("web3_auth")) {
    meta_icon = <img src="/assets/svg/metamask-fox.svg" width={30} />
  }
  else {
    meta_icon = <img src="/assets/svg/metamask-fox-bw.svg" className="bw" width={30} />
  }

  if(sessionStorage.jwtToken)
  {
    //console.log("showing logout")
    return (
      <li className="nav-item">
        <a href="/logout" className="nav-link">Logout {meta_icon} </a>
      </li>
    )
  }
  else {
    // never show button sense session may be stale
    return (
      <li className="nav-item">
        <a href="/login" className="nav-link">Login</a>
      </li>
    )
  }



};

export default LoginLogoutButton;