import React, { Component, useEffect,useContext  } from 'react';
import { loginUser } from  "../../actions/authActions";
import { Form, Field } from "react-final-form";
import Web3 from 'web3'
import Web3Modal from "web3modal"
import SubscribeProvider  from "./../Wallet/SubscribeProvider"
import {ReactReduxContext, useDispatch, useSelector} from 'react-redux'
import {update_main_address} from "../../state/mainAddressSlice";
import {user_login} from "../../state/user/userDataSlice";
import {update_modal_title} from "../../state/genericModalSlice";
import LoadWeb3 from "../Moralis/Login/LoadWeb3";
import OnAddress from "./OnAddress";

// TODO: testing
// modal windows
// address mismatch
// email not found
// password mismatch
// undefined token


export const Login = userData => {
  const { store } = useContext(ReactReduxContext)
  const dispatch = useDispatch()
  const main_address = useSelector((state) => state.main_address.value)
  const user_data = useSelector((state) => state.user_data.value) //

  let all_store = store.getState()

  let formData = {
    address: "",
    email: "",
    password: "",
  };


  // web3 code in headerSecure
  // useEffect(async () => {
  //   if (sessionStorage.jwtToken) {
  //
  //     console.log("107 already logged in", sessionStorage.jwtToken);
  //
  //
  //
  //     //window.location.href='/';
  //   }
  //   else {
  //     // automatically fill in first address, switch network, etc
  //
  //     let network_results = await LoadWeb3(dispatch)
  //
  //
  //     console.log("network_results", network_results)
  //
  //     if(network_results.error) {
  //
  //       // put network name into state
  //       let modal_data = {
  //         show: 1,
  //         error: 1,
  //         title: "Switch to " + process.env.CURRENT_CHAIN_TITLE,
  //         message: "Smart contract not deployed to detected network.",
  //         loader: "/assets/svg/claim-loading.svg",
  //         btn_text: "Switch Network",
  //         btn_action: "switchNetwork",
  //         close: false,
  //       }
  //     }
  //     else {
  //       try {
  //         await SubscribeProvider(network_results,dispatch);
  //         let web3 = network_results;
  //         const network_name = await web3.eth.net.getNetworkType();
  //
  //         const networkId = await web3.eth.net.getId()
  //         const current_chain = process.env.CURRENT_CHAIN_ID
  //
  //
  //
  //         console.log("LOGIN HERE, NEED TO CHECK NETWORK HERE!!! ", network_name);
  //         const accounts = await web3.eth.getAccounts();
  //         const address = accounts[0];
  //         document.getElementById("address-placeholder").value = address // TODO: somtimes work, sometimes doesnt
  //         dispatch(update_main_address(address));
  //
  //       } catch ( err ) {
  //         console.error(`Error - ${ err.message }`);
  //       }
  //     }
  //
  //   }
  // }, []); // Only re-run the effect if count changes

  const onSubmit = async (values) => {
    values.address = main_address
    let login_results = await loginUser(values);
    console.log("login_results", login_results)

    if(login_results.errors) {
      console.log("ERROS login_results", login_results)
      let modal_data ={
        show: 1,
        error: 0,
        title: login_results.errors.title,
        message:login_results.errors.message,
        loader: "",
        btn_text:"Close",
        btn_action:"handleClose",
        close: true,

      }
      dispatch(update_modal_title(modal_data));
    }else{
      //window.location.href='/';
    }




  };


  const onChange = e => {
    //dispatch(update_field(user_data, {e.target.id, e.target.value} ));
    console.log("e.target.id",e.target.id)
    console.log("e.target.value",e.target.value)

    //dispatch(update_field(e.target.id, e.target.value));
    //this.setState({ [e.target.id]: e.target.value });
  };

  return (
    <section className="author-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <span>Log In</span>
              <h3 className="mt-3 mb-0">Login to your Account</h3>
              <p>You must attach your first address in metamask to your account.</p>
            </div>
            {/* Item Form */}

            <Form
              onSubmit={onSubmit}
              initialValues={{
                ...formData,
              }}
              render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit} className="item-form card no-hover">

                  {/*<form className="item-form card no-hover" noValidate onSubmit={onSubmit}>*/}
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mb-3">

                        <button onClick={() => OnAddress(dispatch)} type="button"  className="form-control" >
                          {main_address ? main_address : 'Click to Attach Wallet address'}
                        </button>

                      </div>
                    </div>

                  <div className="col-12">
                    <Field
                      name="email"
                      component="input"
                      type="email"
                      placeholder="Enter your Email"
                      className="form-control"
                    />
                  </div>

                  <div className="col-12">

                    <div className="form-group mt-3">
                      <Field
                        name="password"
                        component="input"
                        type="password"
                        placeholder="Enter your Password"
                        className="form-control"
                      />
                    </div>
                    {/*<div className="form-group mt-3">*/}
                    {/*  <input type="email" className="form-control" onChange={onChange} value={all_store.user_data.email} id='email' name="email" placeholder="Enter your Email" required="required" />*/}
                    {/*</div>*/}
                  </div>
                  <div className="col-12">
                    {/*<button className="btn w-100 mt-3 mt-sm-4" type="submit">Sign In</button>*/}
                    <button className="btn w-100 mt-3 mt-sm-4" type="submit" disabled={submitting || pristine}>
                      Sign In
                    </button>

                  </div>


                </div>
                </form>
                )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;