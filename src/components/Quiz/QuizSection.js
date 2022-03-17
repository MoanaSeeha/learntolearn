import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import NumberFormat from "react-number-format"
import data from "../../assets/data/tests"

const initData = {
  pre_heading: "Tests",
  heading: "Test Your Skill",
  btnText: "Sample Test"
}

class QuizSection extends Component {
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
      <section className="test-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{this.state.initData.pre_heading}</span>
                  <h3 className="mt-3 mb-0">
                    <a href="/tests" alt="See all Tests">
                      {this.state.initData.heading}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="auctions-slides">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* Single Slide */}
                {this.state.data.map((item, idx) => {
                  return (
                    <div key={`auc_${idx}`} className="swiper-slide item">
                      <div className="card">
                        <div className="image-over">
                          <a href={item.link}>
                            <FontAwesomeIcon size={`lg`} icon={[item.library, item.icon]} />
                          </a>
                        </div>
                        {/* Card Caption */}
                        <div className="card-caption col-12 p-0">
                          {/* Card Body */}
                          <div className="card-body">

                            <a href={item.link}>
                              <h5 className="mb-0">{item.title}</h5>
                            </a>

                            {/*<div className="card-bottom d-flex justify-content-between">*/}
                            {/*  <FontAwesomeIcon size={`lg`} icon={["fas", "level-up"]} /><span>{item.level}</span>*/}
                            {/*</div>*/}
                            {/* justify-content-between    */}

                            <div className="card-bottom d-flex">
                              <a href={item.link} title="Difficulty Level">
                                <FontAwesomeIcon size={`lg`} icon={["fad", "head-side-brain"]} /><span>{item.level}</span>
                              </a>
                            </div>

                            <div className="card-bottom d-flex">
                              <a href={item.link} title="Potential Winnings">
                                <FontAwesomeIcon size={`lg`} icon={["fad", "trophy"]} />
                                <NumberFormat
                                  value={item.learn}
                                  //className="crypto-amount"
                                  displayType={'text'}
                                  decimalScale={0}
                                  thousandSeparator={true}
                                  prefix={''}
                                  renderText={(value, props) => <span {...props}>{value} LEARN</span>}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default QuizSection;