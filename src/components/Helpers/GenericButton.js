import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

/**
 * Get FRESH ETHER PRICE
 * @returns {JSX.Element}
 * @constructor
 */
const GenericButton = ({ title,library,font }) => {


  console.log("GenericButton: error")
  console.log(error)


  return (
    <span className="btn btn-details btn-bordered-white" data-toggle="modal" data-target="#search">
          <FontAwesomeIcon size={`lg`} icon={["fab", "ethereum"]} />
          <span className="px-2"></span>
        </span>
  )
  //return 1.5;

}
export default GenericButton;
