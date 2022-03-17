import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap"
// import HomeHero from '../../svg/home.svg'
const initData = {
  pre_heading: "LEARN TO EARN",
  heading: "Earn Crypto Currency for testing your knowledge",
  content: "Answer a few math or programming questions and earn LEARN Tokens",
  btn_1: "Sample Test",
  btn_2: "White Paper"
}

class Hero extends Component {
  state = {
    data: {}
  }
  componentDidMount(){
    this.setState({
      data: initData
    })
  }
  render() {
    return (
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7">
              <span>{this.state.data.pre_heading}</span>
              <h1 className="mt-4">{this.state.data.heading}</h1>
              <p>{this.state.data.content}</p>
              {/* Buttons */}
              <div className="button-group">
                <a className="btn btn-bordered-white" href="/testnet"><i className="icon-rocket mr-2" />{this.state.data.btn_1}</a>
                <a className="btn btn-bordered-white" href="/white-paper"><i className="icon-note mr-2" />{this.state.data.btn_2}</a>
              </div>
            </div>
            <Col xs={12} md={6} lg={5} className=" home-hero-desk">

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
  }
}

export default Hero;