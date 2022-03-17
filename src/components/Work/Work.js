import React, { Component } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const BASE_URL = "/assets/data/work.json";

class Work extends Component {
  state = {
    data: {},
    workData: []
  }
  componentDidMount(){
    axios.get(`${BASE_URL}`)
      .then(res => {
        this.setState({
          data: res.data,
          workData: res.data.workData
        })
        // console.log(this.state.data)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <section className="work-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro mb-4">
                <div className="intro-content">
                  <span>{this.state.data.preHeading}</span>
                  <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {this.state.workData.map((item, idx) => {
              return (
                <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                  <div className="single-work">
                    <a href={item.link} target={item.target}>
                      <div className="blurb-icon">
                        {/*<i className="icons icon-wallet text-effect"></i>*/}
                        <FontAwesomeIcon size={`lg`} icon={[item.library, item.icon]} />
                      </div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default Work;