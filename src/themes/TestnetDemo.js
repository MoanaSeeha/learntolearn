import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import HeaderSecure from '../components/Header/HeaderSecure';
import HeaderQuiz from '../components/Header/HeaderQuiz';
// import HeaderSecure from '../components/Header/HeaderSecure';
// import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import Explore from '../components/Explore/ExploreTwo';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalAccountDetails from '../components/Modal/ModalAccountDetails';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import QuizApp from "../components/Quiz/QuizApp"
import TestnetConnectBox from "../components/Wallet/TestnetConnectBox"
import ModalTestnet from "../components/Modal/ModalTestnet"
import HeaderButton from "../components/Header/HeaderButton"
import jwt_decode from "jwt-decode";
import setAuthToken from "../setAuthToken";
import { useParams } from 'react-router-dom'

//import Counter from "../features/counter/Counter"
// import TestnetConnectBox from "../components/Wallet/TestnetConnectBox"


// TODO: if connected
class TestnetDemo extends Component {

    componentDidMount(){
      // TODO: move this to ONE function make sure it's secure
      if (sessionStorage.jwtToken) {
          console.log("logged in", sessionStorage.jwtToken);
          // Set auth token header auth
          const token = sessionStorage.jwtToken;
          const plan = sessionStorage.plan;
          console.log("plan", plan)
          setAuthToken(token);
          // Decode token and get user info and exp
          const decoded = jwt_decode(token);
          // Set user and isAuthenticated
          // Check for expired token
          console.log("decoded", decoded);
          const currentTime = Date.now() / 1000; // to get in milliseconds
          if (decoded.exp < currentTime) {
            // Logout user
            sessionStorage.setItem("jwtToken", '');
            // Redirect to login
            console.log("decoded.exp < currentTime", decoded.exp);
            //window.location.href = "/login";
          }

          // TODO: get unclaimed amount here and put into session storage

      }
      else {
          window.location.href = "/login";
          console.log("not logged in");
      }
  }

  render() {
    // const networkNameState = useSelector((state) => state.network_name.value)
    // const dispatch = useDispatch()
    //
    // let modal = {
    //   state: 'show',
    //   praise: "1234",
    //   points: "44",
    //   network_name: networkNameState,
    // }



    return (
      <div className="main">
        <HeaderQuiz />
        {/*<Breadcrumb title="Explore" subpage="Explore" page="Explore Style 1" />*/}
        {/*{ sessionStorage.getItem("network") === 'main' && renderModal() }*/}

        {/* TODO: use state*/}
        {/*<ModalTestnet modal={ modal } />*/}
        {/*<Row className="header-wrapper">*/}
        {/*  <Col xs={12}>*/}
        {/*    <HeaderSecure />*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Container fluid>

          <Row className="content-wrapper">
            <Col xs={12} md={2}>
              <TestnetConnectBox />
            </Col>

            <Col xs={12} md={10}>
              {/*<QuizApp totalQuestions={10} />*/}

              <QuizApp
                totalQuestions={1}
                test_name={"Sample JavaScript Quiz"}
                test_slug={"sample"}
              />
            </Col>
          </Row>
        </Container>


        {/*<Counter />*/}
        <Footer />
        <ModalAccountDetails />
        <ModalMenu />
        <Scrollup />
        {/*<HeaderButton /> causing issues with mobile menu, not even needed*/}
      </div>
    );
  }
}

export default TestnetDemo;