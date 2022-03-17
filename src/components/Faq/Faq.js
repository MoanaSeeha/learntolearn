import React, { Component } from 'react';
import {Button} from "react-bootstrap";

const initData = {
  pre_heading: "FAQ",
  heading: "Frequently Asked Questions",
  content: "Feel free to contact us on discord with any questions you may have."
}

const data = [
  {
    id: "1",
    btnClass: "btn d-block text-left w-100 py-4",
    target: "#collapseOne",
    quote: "How do I create an account?",
    contentId: "collapseOne",
    contentClass: "collapse show",
    content: "An account is needed to verify your identity to prevent abuse.  Only one person per device can play an account tied to an Ethereum Address.  Players using multiple email addresses may be banned.",
    link: "/signup",
    link_text: "Register"
  },
  {
    id: "2",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseTwo",
    quote: "Where can I see transaction details?",
    contentId: "collapseTwo",
    contentClass: "collapse",
    content: "The Activity Page will have information about your claims and transactions.",
    link: "/activity",
    link_text: "Activity Page"
  },
  {
    id: "3",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseThree",
    quote: "What are LEARN Tokens?",
    contentId: "collapseThree",
    contentClass: "collapse",
    content: "LEARN Tokens are used to reward players for taking tests.  You will be able to claim LEARN Tokens every two weeks.",
    link: "/inventory",
    link_text: "View Inventory"
  },
  {
    id: "4",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFour",
    quote: "What are LTS Tokens?",
    contentId: "collapseFour",
    contentClass: "collapse",
    content: "LTS Tokens are used to buy tests, governance, staking and limited edition NFT's.",
    link: "/#tokenomics",
    link_text: "Tokenomics"
  },
  {
    id: "5",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFive",
    quote: "How many times can I take a test?",
    contentId: "collapseFive",
    contentClass: "collapse",
    content: "You will only be allowed to take a test a maximum of 100 times.  Each test will contain approximately 100 questions and they will be shuffled into 20 question tests.",
    link: "/tests",
    link_text: "View Tests"
  },
  {
    id: "5",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFive",
    quote: "What are Attention Span Points?",
    contentId: "collapseFive",
    contentClass: "collapse",
    content: "Attention Span Points are much like Energy in Axie Infinity.  There is a maximum of 24 Attention Span Points in a day and they recharge every hour."
  },
  {
    id: "5",
    btnClass: "btn d-block text-left w-100 collapsed py-4",
    target: "#collapseFive",
    quote: "Reward Calculation",
    contentId: "collapseFive",
    contentClass: "collapse",
    content: "Rewards are calculated based on the time it takes for you to take the test and how many wrong answers before you get the right one.  Details on how much LEARN you will be rewarded are in the White Paper.",
    link: "/white-paper",
    link_text: "White Paper"
  }
]

class Faq extends Component {
  state = {
    initData: {},
    data: []
  }
  componentDidMount(){
    this.setState({
      initData: initData,
      data: data
    })
  }
  render() {
    return (
      <section className="faq-area pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                <p>{this.state.initData.content}</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12">
              {/* FAQ Content */}
              <div className="faq-content">
                {/* Netstorm Accordion */}
                <div className="accordion" id="netstorm-accordion">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                      {/* Single Accordion Item */}
                      {this.state.data.map((item, idx) => {
                        return (
                          <div key={`fd_${idx}`} className="single-accordion-item p-3">
                            {/* Card Header */}
                            <div className="card-header bg-inherit border-0 p-0">
                              <h2 className="m-0">
                                <button className={item.btnClass} type="button" data-toggle="collapse" data-target={item.target}>
                                  {item.quote}
                                </button>
                              </h2>
                            </div>
                            <div id={item.contentId} className={item.contentClass} data-parent="#netstorm-accordion">
                              {/* Card Body */}
                              <div className="card-body py-3">
                                {/* TODO: need to display html here*/}
                                {item.content}

                                {item.link &&
                                  <div className="btn-more-wrapper">
                                    <a className={"btn btn-more"} href={item.link} target="_blank" rel="noreferrer">
                                      {item.link_text}
                                    </a>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Faq;