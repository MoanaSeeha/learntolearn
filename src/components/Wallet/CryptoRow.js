import React from "react"
import {useSelector} from "react-redux"
import AddToMetamask from "./AddToMetamask";
import PropTypes from "prop-types";
import Quiz from "../Quiz/Quiz";
import {Col, Row} from "react-bootstrap";
import NumberFormat from "react-number-format";
import AddToMetamaskButton from "./AddToMetamaskButton";
import Moment from "react-moment";

const CryptoRow = ({address, symbol, decimals, image, amount}) => {

  // only show metamask buttons for LTS and LEARN
  const metamaskButtonSwitch = (address, symbol, decimals, image) => {
    switch(symbol) {
      case 'LEARN':
      case 'LTS':
        return <AddToMetamaskButton address={address} symbol={symbol} decimals={decimals} image={image} />;
      default:
        return '';
    }
  }

  return (

    <Row className="p-0 crypto-row">
      <Col xs={1}>
        {metamaskButtonSwitch(address, symbol, decimals, image)}
      </Col>
      <Col xs={1}>
        <img className="crypto-icon" src={image} alt="LEARN Token" width="30"/>
      </Col>
      <Col xs={2} className="crypto-symbol">
        {symbol}
      </Col>
      <Col xs={8}>
        <NumberFormat
          value={amount}
          className="crypto-amount"
          displayType={'text'}
          decimalScale={3}
          thousandSeparator={true}
          prefix={''}
          renderText={(value, props) => <div {...props}>{value}</div>}
        />
      </Col>
    </Row>

  )
}

CryptoRow.propTypes = {
  address: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
};

export default CryptoRow;