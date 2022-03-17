import PropTypes from "prop-types";
import Moralis from "moralis";
import MoralisConnect from "../MoralisConnect";
import BuyLtsButton from "../buylts/BuyLtsButton";
import {Col, Row} from "react-bootstrap";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


/**
 *
 * @param type
 * @param test
 * @returns {JSX.Element}
 * @constructor
 */
const BuyTestButton = ({ type, test }) => {

  let image, button_text
  switch (type) {
    case 'free':
      image = <FontAwesomeIcon size={`lg`} icon={["fad", "head-side-brain"]} />
      button_text = "Free"
    case 'owned':
      image = <FontAwesomeIcon size={`lg`} icon={["fad", "head-side-brain"]} />
      button_text = "Take"
      break;
    case 'buy':
      image = <img src="/assets/svg/crypto/lts-new.svg" alt={test.title} width={30} />
      button_text = test.cost_amount + ' ' + test.cost_token
      break;
    default:

  }

  return (
      <Row className="align-items-center">
        <Col xs={4} className="m-0 p-0">
          {image}
        </Col>
        <Col xs={8} className="m-0 p-0 pt-1">
          {button_text}
        </Col>
      </Row>
  )
}

BuyTestButton.propTypes = {
  type: PropTypes.string.isRequired,
  test: PropTypes.object.isRequired,
};

export default BuyTestButton