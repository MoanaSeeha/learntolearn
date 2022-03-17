import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import { createBrowserHistory } from 'history'
// importing all the themes
import HomePage from "../themes/HomePage";
import BuyLtsPage from "../themes/BuyLtsPage";
import TestnetDemo from "../themes/TestnetDemo";
import TakeTestPage from "../themes/TakeTestPage";
import Activity from "../themes/activity";
import HelpPage from "../themes/HelpPage";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Contact from "../themes/contact";
import TestsPage from "../themes/TestsPage";
import GameIntegrationPage from "../themes/GameIntegrationPage"
import RoadmapPage from "../themes/RoadmapPage"
import InventoryPage from "../themes/InventoryPage"
import TermsPage from "../themes/TermsPage"
// import LtsFaucet from "../themes/lts-faucet";
import history from './history'
import WhitePaperPage from "../themes/WhitePaperPage";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router history={history} >
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/buy-lts" component={BuyLtsPage} />
            <Route exact path="/tests" component={TestsPage} />
            <Route exact path="/testnet" component={TestnetDemo} />
            <Route exact path="/test/:test_slug" component={TakeTestPage} />
            <Route exact path="/inventory" component={InventoryPage} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/game-integration" component={GameIntegrationPage} />
            <Route exact path="/roadmap" component={RoadmapPage} />
            <Route exact path="/help" component={HelpPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/terms" component={TermsPage} />
            <Route exact path="/white-paper" component={WhitePaperPage} />
            <Route path="*" component={HomePage} />
            {/*<Route exact path="/lts-faucet" component={LtsFaucet} />*/}
            {/*<Route exact path="/explore-2" component={ExploreTwo} />*/}
            {/*<Route exact path="/explore-3" component={ExploreThree} />*/}
            {/*<Route exact path="/explore-4" component={ExploreFour} />*/}
            {/*<Route exact path="/auctions" component={Auctions} />*/}
            {/*<Route exact path="/item-details" component={ItemDetails} />*/}
            {/*<Route exact path="/blog" component={Blog} />*/}
            {/*<Route exact path="/blog-single" component={BlogSingle} />*/}
            {/*<Route exact path="/authors" component={Authors} />*/}
            {/*<Route exact path="/author" component={Author} />*/}
            {/*<Route exact path="/wallet-connect" component={WalletConnect} />*/}
            {/*<Route exact path="/create" component={Create} />*/}
          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;