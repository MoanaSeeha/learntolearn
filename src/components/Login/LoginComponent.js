import React, { Component } from 'react';
import { loginUser } from  "../../actions/authActions";

import Web3 from 'web3'
import Web3Modal from "web3modal"
import SubscribeProvider  from "./../Wallet/SubscribeProvider"

const initData = {
    pre_heading: "Login",
    heading: "Login to your Account",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit."
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

class Login extends Component {
    state = {
        initData: {},
        data: [],
        email: "",
        password: "",
        address: "Wallet address",
        errors: {}
    }
    onSubmit = async(e) => {
        e.preventDefault();
        
        const userData = {
          email: this.state.email,
          password: this.state.password,
          address: this.state.address
        };
        let login_results = await loginUser(userData);

        console.log("login_results", login_results)
    };
    onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };
    onAddress = async()=>{
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                //params: [{ chainId: '0x4' }], // rinkeby
                params: [{ chainId: process.env.CURRENT_CHAIN_ID_HEX }],
            });
        } catch (switchError) {
            alert("Please install metamask");
        }
        const providerOptions = {
            /* See Provider Options Section */
        };
        const web3Modal = new Web3Modal({
            network: "mumbai", // optional
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
      
              console.log("LOGIN HERE, NEED TO CHECK NETWORK HERE!!! ", network_name);
              const accounts = await web3.eth.getAccounts();
              const address = accounts[0];
              this.setState({ address: address });
            } catch ( err ) {
                console.error(`Error - ${ err.message }`);
            }
        }
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: socialData
        })
        if (sessionStorage.jwtToken) {

          console.log("107 already logged in");
            //window.location.href='/';
        }
    }
    
    render() {
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-7">
                            {/* Intro */}
                            <div className="intro text-center">
                                <span>{this.state.initData.pre_heading}</span>
                                <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                                <p>{this.state.initData.content}</p>
                            </div>
                            {/* Item Form */}
                            <form className="item-form card no-hover" noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="button" value={this.state.address}  onClick={this.onAddress}  className="form-control" id='address' name="address" placeholder="Wallet address" required="required" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="email" className="form-control" onChange={this.onChange} value={this.state.email} id='email' name="email" placeholder="Enter your Email" required="required" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="password" className="form-control" onChange={this.onChange} value={this.state.password} id='password' name='password' placeholder="Enter your Password" required="required" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Remember Me</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit">Sign In</button>
                                    </div>
                                    <div className="col-12">
                                        <hr />
                                        <div className="other-option">
                                            <span className="d-block text-center mb-4">Or</span>
                                            {/* Social Icons */}
                                            <div className="social-icons d-flex justify-content-center">
                                                {this.state.data.map((item, idx) => {
                                                    return (
                                                        <a key={`lsd_${idx}`} className={item.link} href="#">
                                                            <i className={item.icon} />
                                                            <i className={item.icon} />
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
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

export default Login;