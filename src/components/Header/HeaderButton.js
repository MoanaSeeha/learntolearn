import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import React from "react"
import HeaderLinks from "./HeaderLinks"
import {useSelector} from "react-redux"

const HeaderButton = () => {
  // check to see if on right network

  const networkNameState = useSelector((state) => state.network_name.value)


  // TODO: check local storage???
  let connected = true;

  if (networkNameState) {
    // return <span className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" data-toggle="modal" data-target="#search" />Connected to {sessionStorage.getItem("network")}</span>
    return (
      <div className={"top-right-btn"}>
              <span className="btn btn-details btn-bordered-white" data-toggle="modal" data-target="#search">
        {/*<i className="fad fa-chart-network, network-wired" />  */}
                <FontAwesomeIcon size={`lg`} icon={["fab", "ethereum"]} />
        <span className="px-2">{networkNameState}</span>
      </span>
      </div>

    )
  }
  else {
    return <div className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" data-toggle="modal" data-target="#search" /> <span className="pl-5">Wallet Connect</span></div>

  }
}
export default HeaderButton;