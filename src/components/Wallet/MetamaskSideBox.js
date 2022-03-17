import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import {useSelector} from "react-redux"
import UserNameBox from "./UserNameBox"

const MetamaskSideBox = () => {

  let connected
  if(sessionStorage.jwtToken) {
    connected = true;
  }
  else {
    connected = false;
  }
  // data for this box should already be set!
  // get it from session
  const networkNameState = useSelector((state) => state.network_name.value)
  console.log("MetamaskSideBox networkNameState", networkNameState)
  let metamask

  // at this point, we should be on the right network
  if(networkNameState) {
    metamask = <div id="metamask-logo"><img src="/assets/svg/metamask-fox.svg" alt="Connected to Metamask" width={100} /></div>
  }
  else {
    metamask = <div id="metamask-logo"><img src="/assets/svg/metamask-fox.svg" alt="Connected to Metamask" width={100} className="bw" /></div>
  }

  // TODO: check local storage???

  if (connected) {
    // return <span className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" data-toggle="modal" data-target="#search" />Connected to {sessionStorage.getItem("network")}</span>
    return (

      <div className="account-details">

        <UserNameBox />
        <div className={"metamask-button"}>
          {metamask}
          <span className="btn-bordered-white no-hover">
            <FontAwesomeIcon size={`lg`} icon={["fab", "ethereum"]} />
            <span className="px-2">{networkNameState}</span>
          </span>
        </div>
      </div>

    )
  }
  else {
    return (

      <div className="account-details">
        <div className="account-user">
          Hello #456a
        </div>
        <div className={"metamask-button"}>
        <span className="btn btn-details btn-bordered-white" data-toggle="modal" data-target="#connect-sidebox">
          <FontAwesomeIcon size={`lg`} icon={["fab", "ethereum"]} />
          <span className="px-2">Not Connected</span>
        </span>

        </div>
      </div>

    )

  }
}
export default MetamaskSideBox;