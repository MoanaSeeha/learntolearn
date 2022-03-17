import React, { Component } from 'react';
import PropTypes from "prop-types";

import { registerUser } from "../../actions/authActions";
import { faWindows } from '@fortawesome/free-brands-svg-icons';

import Web3 from 'web3'
import Web3Modal from "web3modal"
import SubscribeProvider  from "./../Wallet/SubscribeProvider"
import ErrorBox  from "./../Header/ErrorBox"


const initData = {
  pre_heading: "Signup",
  heading: "Create an Account",
  content: "We will need to verify your email and link it to a metamask address."
}

const socialData = [
  {
    id: "1",
    link: "facebook",
    icon: "fab fa-facebook-f"
  },
  {
    id: "2",
    link: "twitter",
    icon: "fab fa-twitter"
  },
  {
    id: "3",
    link: "google-plus",
    icon: "fab fa-google-plus-g"
  }
]

class Signup extends Component {

  state = {
    initData: {},
    data: [],
    address: "Wallet address",
    name: "amir",
    email: "amir.meshkin@gmail.com",
    unclaimed_learn_amount: 0,
    password: "learntoearn17",
    errors: {},
    policy: "",
    error: "",
    error_message: "",
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  onSubmit = async(e)=>{
  //onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      unclaimed_learn_amount: this.state.unclaimed_learn_amount,
    };
    const  register_results = await registerUser(newUser, 'this.history');

    this.setState({ error: "sdfsadf" });
    console.log("register_results", register_results)

  };
  onAddress = async()=>{
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: process.env.CURRENT_CHAIN_ID_HEX }],
      });
    } catch (switchError) {
      // TODO: show generic modal
      alert("Please install metamask");
    }
    const providerOptions = {
      /* See Provider Options Section */
    };
    const web3Modal = new Web3Modal({
      //network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions // required
    });

    let hasProvider;
    let provider;
    try {
      provider = await web3Modal.connect()
      hasProvider = true;
      console.log("provider: ", provider)
    } catch ( err ) {
      console.log("try catch on provider: ", provider)
      hasProvider = false;
    }

    if(hasProvider) {
      try {
        await SubscribeProvider(provider,'');
        let web3;
        web3 = new Web3(provider);
        const network_name = await web3.eth.net.getNetworkType();

        // TODO: network switch needs to go here
        console.log("MAIN SIGNUP PROBABLY NO NEEED TO CHECK NETWORK HERE!!!!! ", network_name);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        this.setState({ address: address });
      } catch ( err ) {
        console.error(`Error - ${ err.message }`);
      }
    }
  }
  componentDidMount(){

    // console.log('ethereum..isMetaMask', ethereum.isMetaMask);

    // let blah = ethereum.request({ method: 'eth_requestAccounts' });

    // console.log('The link was clicked.');

    this.setState({
      initData: initData,
      data: socialData
    })
    if (sessionStorage.jwtToken) {
      //window.location.href='/tests';
      console.log("Already logged in");
    } else {
      console.log("sessionStorage.jwtToken", sessionStorage.jwtToken);
    }
  }


  // register_errors
  render() {

    return (
      <section id="sign-up-form" className="author-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                <p>{this.state.initData.content}</p>
              </div>

              {sessionStorage.getItem("error") > 0 &&
                <ErrorBox title={sessionStorage.getItem("title")} message={sessionStorage.getItem("message")} />
              }

              <form className="item-form card no-hover" onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input type="button" value={this.state.address}  onClick={this.onAddress}  className="form-control" id='address' name="address" placeholder="Wallet address" required="required" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input type="text" onChange={this.onChange} value={this.state.name} className="form-control" id='name' name="name" placeholder="Enter your Name" required="required" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input type="email"  onChange={this.onChange} value={this.state.email} className="form-control" id='email' name="email" placeholder="Enter your Email" required="required" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input type="password"  onChange={this.onChange} value={this.state.password} className="form-control" id='password' name="password" placeholder="Enter your Password" required="required" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" required />
                        <label className="form-check-label pt-1 pl-1" htmlFor="inlineRadio1">I agree to the <a href="/terms">Privacy Policy and Terms</a></label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn w-100 mt-3 mt-sm-4" type="submit">Sign Up</button>
                  </div>
                  <div className="col-12">
                    <span className="d-block text-center mt-4">Already have an account? <a href="/login">Login</a></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Signup;