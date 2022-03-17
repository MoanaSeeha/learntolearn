import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap"
import PropTypes from "prop-types"
import QuestionList from "../Quiz/QuestionList"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


const GenericHero = ({ header_name, highlight, blurb, btn_text1, bg_class }) => {
// const HeaderLinks = props => {
  // center  mx-auto

  return (

    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <span>{highlight}</span>
            <h1 className="mt-4">{header_name}</h1>
            <p>{blurb}</p>
            {/* Buttons */}
            {/*<div className="button-group">*/}
            {/*  <a className="btn btn-bordered-white" href="/testnet"><i className="icon-rocket mr-2" />sadf</a>*/}
            {/*  <a className="btn btn-bordered-white" href="/white-paper"><i className="icon-note mr-2" />asdf</a>*/}
            {/*</div>*/}
          </div>
          <Col xs={12} md={6} lg={5} className={bg_class}>

          </Col>
        </div>
      </div>
      {/* Shape */}
      {/*<div className="shape">*/}

      {/*  <img src="/assets/svg/home.svg" width={600} alt="Earn while you Learn" />*/}
      {/*  /!*<HomeHero />*!/*/}
      {/*</div>*/}
    </section>

  );
};

GenericHero.propTypes = {
  header_name: PropTypes.string,
  highlight: PropTypes.string,
  blurb: PropTypes.string,
  btn_text1: PropTypes.string,
  bg_class: PropTypes.string,
};

export default GenericHero;
