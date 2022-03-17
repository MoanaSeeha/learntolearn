import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Activities from '../components/Activity/Activities';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import setAuthToken from "../setAuthToken";

class Activity extends Component {
    componentDidMount(){
        if (sessionStorage.jwtToken) {
            console.log("logged in", sessionStorage.jwtToken);
            // Set auth token header auth
            const token = sessionStorage.jwtToken;
            const plan = sessionStorage.plan;
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
                <Header />
                <Activities />
                <Footer />
                {/*<ModalSearch />*/}
                {/*<ModalMenu />*/}
                <Scrollup />
            </div>
        );
    }
}

export default Activity;