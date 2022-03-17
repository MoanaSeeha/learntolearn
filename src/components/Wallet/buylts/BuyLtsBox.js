import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Col, Row, Container} from "react-bootstrap"
import AddToMetamask from "../AddToMetamask";
import BuyLtsButton from "./BuyLtsButton";
import {useDispatch} from "react-redux";
import handleLoader from "../../Helpers/HandleLoader";
import HandleLoaderDom from "../../Helpers/HandleLoaderDom";
import {update_modal_title} from "../../../state/genericModalSlice";

const BuyLtsBox = ( {dispatch, name, description, amount_lts, cost, token} ) => {

  //
  // console.log("DISPATCH", dispatch)
  return (
    // <div key={`edth_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={item.group}>
    <Col xs={12} md={6} lg={4}>
      <div className="card">

        <div className="card-caption col-12 p-0">

          <div className="card-body-buy">
            <h2 className="m-0 p-0">{name}</h2>
            <span>{description}</span>
            <div className="card-image m-2 p-2 text-center">
              <img src="/assets/svg/crypto/learn-144.png" width={100} />
            </div>

            <Row>
              <Col xs={12} className="text-center">
                <h6 className="ml-2 mb-0">{cost} MATIC FOR {amount_lts} LTS</h6>
              </Col>
              <Col xs={12} className="text-center pt-2 mt-3">
                <a className="btn btn-buy"
                   //onClick={() =>{BuyLtsButton(name, description, amount_lts, cost, token)}}
                   onClick={async (e) => {
                     // HandleLoaderDom("Sending Transaction", "Your transaction url will appear shortly", "Waiting...");

                     let modal_data ={
                       show: 1,
                       error: 0,
                       title: "Sending Transaction",
                       message:"Your transaction url will appear shortly",
                       loader: "/assets/svg/claim-loading.svg",
                       btn_text:"",
                       btn_action:"",
                       close: false,

                     }
                     dispatch(update_modal_title(modal_data));

                     let result = await BuyLtsButton(dispatch, name, description, amount_lts, cost, token);

                     console.log("result", result);

                     let modal_data2 ={
                       show: 1,
                       error: 0,
                       title: "Finished Transaction",
                       message:"",
                       loader: "",
                       btn_text:"View Transaction",
                       trans_hash: result,
                       btn_action:"handleTransaction",
                       close: true,

                     }
                     dispatch(update_modal_title(modal_data2));
                     //HandleLoaderDom("Finished Transaction", `<a href="${result}" target="_blank">View Transaction</a>`, "Close");
                   }}>

                  <Row className="align-items-center">
                    <Col xs={4} className="m-0 p-0">
                      <img src="/assets/svg/crypto/matic.svg" alt={description} width={30} />
                    </Col>
                    <Col xs={8} className="m-0 p-0 pt-1">
                      {cost} {token}
                    </Col>
                  </Row>
                </a>
              </Col>
            </Row>

          </div>
        </div>
      </div>
    </Col>

  )
}
// name, description, amount_lts, cost, token
// <FontAwesomeIcon size={`lg`} icon={["fab", "ethereum"]} />
BuyLtsBox.propTypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount_lts: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};


export default BuyLtsBox

