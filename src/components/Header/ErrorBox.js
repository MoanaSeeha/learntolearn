import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import PropTypes from "prop-types";
import GenericHero from "../Hero/GenericHero";
import {Alert} from "react-bootstrap"

/**
 * Get FRESH ETHER PRICE
 * @returns {JSX.Element}
 * @constructor
 */
const ErrorBox = ({ title, message }) => {

  return (

    <Alert variant="danger" id="alert-box">
      <Alert.Heading>{title}</Alert.Heading>
      <p>{message}</p>
    </Alert>

  )

}

ErrorBox.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
};

export default ErrorBox;
