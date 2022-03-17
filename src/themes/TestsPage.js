import React, { Component } from 'react';

import Header from '../components/Header/Header';
import HeaderSecure from '../components/Header/HeaderSecure';
import HeaderQuiz from '../components/Header/HeaderQuiz';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import AllTests from '../components/Quiz/AllTests';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import jwt_decode from "jwt-decode";
import setAuthToken from "../setAuthToken";



class TestsPage extends Component {

    async componentDidMount(){
        if (sessionStorage.jwtToken) {
            console.log("TESTS PAGE", sessionStorage.jwtToken);
            // Set auth token header auth
            const token = sessionStorage.jwtToken;
            //setAuthToken(token); NO REASON TO SET THIS AGAIN, IF IN APP.JS
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            // Set user and isAuthenticated
            // Check for expired token
            //console.log("decoded", decoded);
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp < currentTime) {
            // Logout user
              sessionStorage.setItem("jwtToken", '');
              // Redirect to login
              window.location.href = "/login";
            }
        }
        else {
            window.location.href = "/login";
            console.log("not logged in");
        }
    }

    render() {
        return (
            <div className="main">
                {/*<Header />*/}
                <HeaderSecure />
                <AllTests />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default TestsPage;