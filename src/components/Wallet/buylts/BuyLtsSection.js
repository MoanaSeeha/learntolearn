import React, { Component } from 'react';
import axios from 'axios';
import {useSelector,useDispatch} from "react-redux"
import {Col, Row, Container, Modal, Button} from "react-bootstrap"
import PageTitle from "../../Header/PageTitle";
import tempTests from "../../../assets/data/tests";
import BuyLtsBox from "./BuyLtsBox";
import HandleLoader from "../../Helpers/HandleLoader";
import { generic_modal } from "../../../state/genericModalSlice"
import ModalQuiz from "../../Modal/ModalQuiz";
import GenericModalBootstrap from "../../Modal/GenericModalBootstrap";
//let user = sessionStorage.jwtToken;

// console.log("user", user)

let lts_token_available = "1,000,000"

/*
// sending 0.5 ETH
const options = {type: "native", amount: Moralis.Units.ETH("0.5"), receiver: "0x.."}
let result = await Moralis.transfer(options)
 */

// TODO: use moralis
// https://deep-index.moralis.io/api/v2/erc20/metadata?chain=mumbai&addresses=string0xdAC17F958D2ee523a2206206994597C13D831ec7
// https://deep-index.moralis.io/api/v2/erc20/metadata?chain=mumbai&providerUrl=https%3A%2F%2F48dv4cm6cbdp.usemoralis.com%3A2053%2Fserver&addresses=0xdAC17F958D2ee523a2206206994597C13D831ec7




const BuyLtsSection = props => {
  const dispatch = useDispatch()
  const generic_modal = useSelector((state) => state.generic_modal.value)

  console.log("generic_modal", generic_modal)

  let showModal

  if(generic_modal) {
    showModal = <GenericModalBootstrap dispatch={dispatch} modal={generic_modal} />
  }
  else {
    showModal = <></>
  }
  //const dispatch = useDispatch()

  return(
    <section className="inventory-section">
      {showModal}
      <PageTitle />

      {/*TODO: can't get state to work here, and session doesn't update */}

      {/*<Modal.Dialog id="blah-generic-modal" className="d-none">*/}
      {/*  <Modal.Header closeButton>*/}
      {/*    <Modal.Title id="modal-title"></Modal.Title>*/}
      {/*  </Modal.Header>*/}

      {/*  <Modal.Body>*/}
      {/*    <p id="modal-desc">{sessionStorage.getItem("transaction_url")}</p>*/}
      {/*    /!*<HandleLoader />*!/*/}
      {/*    <div id="modal-spinner"><img src="/assets/svg/claim-loading.svg" width={50} /></div>*/}
      {/*  </Modal.Body>*/}

      {/*  <Modal.Footer>*/}
      {/*    <Button id="modal-button" variant="secondary"></Button>*/}
      {/*  </Modal.Footer>*/}
      {/*</Modal.Dialog>*/}

      <Container>
        <Row className="p-1 align-items-center">
          <Col xs={12} md={6}>
            <p>Maximum Supply: { process.env.LTS_MAX_SUPPLY }</p>
            <p>Available For Purchase: { lts_token_available }</p>

            <p>10 LTS = 1 MATIC</p>

            <p>.10 MATIC per LTS</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="p-1 align-items-center">
          <BuyLtsBox
            dispatch={dispatch}
            name={"100 LTS"}
            description={".10 per LTS"}
            amount_lts={"100"}
            cost={"10"}
            token={"MATIC"}
          />

          <BuyLtsBox
            dispatch={dispatch}
            name={"275 LTS"}
            description={".09 per LTS"}
            amount_lts={"275"}
            cost={"25"}
            token={"MATIC"}
          />

          <BuyLtsBox
            name={"1000 LTS"}
            description={".0075 per LTS"}
            amount_lts={"1000"}
            cost={"750"}
            token={"MATIC"}
          />
        </Row>
      </Container>
    </section>
  )


}

export default BuyLtsSection;