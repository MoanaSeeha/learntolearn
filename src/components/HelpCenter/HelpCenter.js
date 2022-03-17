import React, { Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const initData = {
  pre_heading: "Help Center",
  heading: "How can we help you?",
  content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit."
}

const data = [
  {
    id: "1",
    library: "fad",
    icon: "wallet",
    title: "Setup Wallet",
    content: "Download metamask and setup the Polygon Mumbai (testing) Chain.",
    link: "https://blog.pods.finance/guide-connecting-mumbai-testnet-to-your-metamask-87978071aca8",
    button: "Setup Metamask",
    target: "_blank",
  },
  {
    id: "2",
    icon_image: "/assets/img/polygon.png",
    title: "Polygon Bridge",
    content: "You will need to use the Polygon Bridge before you can buy tests or claim LEARN.",
    link: "https://wallet.polygon.technology/bridge",
    button: "Polygon Bridge",
    target: "_blank"
  },
  {
    id: "3",
    icon_image: "/assets/svg/crypto/learn.png",
    title: "Buying Tests",
    content: "You can buy premium tests with LTS Tokens which have higher rewards.",
    link: "/tests",
    button: "View Tests",
    target: "_self"
  },
  {
    id: "4",
    library: "fad",
    icon: "file",
    title: "Taking Tests",
    content: "Take one of the tests to be rewarded in LEARN Tokens.",
    link: "/testnet",
    button: "Sample Test",
    target: "_self"
  },
  {
    id: "5",
    library: "fad",
    icon: "trophy",
    title: "Claim Learn",
    content: "Learn how you can partner with us to showcase your NFT drops",
    link: "/inventory",
    button: "View Inventory",
    target: "_self"
  },
  {
    id: "6",
    library: "fas",
    icon: "question",
    title: "Submit a Question",
    content: "Earn LTS tokens for submitting questions which must be manually approved as of now.",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScQFfvcxwOsx31Jp3gSzS12GASDR4emg7lzmfPh2yCDQx0ydQ/viewform?usp=sf_link",
    button: "Submit Question",
    target: "_blank"
  }
]

class HelpCenter extends Component {
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
      <section className="help-center-area">
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
          <div className="row justify-content-center items">
            {this.state.data.map((item, idx) => {
              return (
                <div key={`hd_${idx}`} className="col-12 col-md-6 col-lg-4 item">
                  {/* Help Card */}
                  <div className="card help-card">
                    <a className="d-block text-center" href={item.link} target={item.target}>
                      {item.icon_image &&
                        <img src={item.icon_image} width={50} alt={item.title} />
                      }
                      {item.library &&
                        <FontAwesomeIcon size={`lg`} icon={[item.library, item.icon]} />
                      }

                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
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

export default HelpCenter;