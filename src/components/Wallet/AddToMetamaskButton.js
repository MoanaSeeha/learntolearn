import React from "react"
import {useSelector} from "react-redux"
import AddToMetamask from "./AddToMetamask";
import PropTypes from "prop-types";

const AddToMetamaskButton = ({address, symbol, decimals, image}) => {

  return (


    <div className="add-metamask">
      <a href="#" onClick={() =>{AddToMetamask(address, symbol, decimals, image)}}>
        <img className="ml-1" width="20px" height="20px"
             data-toggle="tooltip"
             data-placement="top" data-title="Add to Metamask"
             src="https://static.coingecko.com/s/metamask_fox-11b1aab7f9a07cbe8903d8d6eb1e6d42be66d1bdd838c10786c1c49a2efb36f0.svg"
             title="Add to Metamask" />
      </a>
    </div>

  )
}

AddToMetamaskButton.propTypes = {
  address: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default AddToMetamaskButton;