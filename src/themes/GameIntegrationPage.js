import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ExploreFour';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import GamePageContent from "../components/Games/GamePageContent"
import GenericHero from "../components/Hero/GenericHero"

class ExploreTwo extends Component {
    render() {
        return (
            <div className="main">
              <Header />
              <GenericHero
                highlight={"educational games"}
                header_name={"Game Integration"}
                blurb={"Integrate our system into your NFT video game to provide an additional incentive to play.  Players can earn LEARN playing your game in addition to any other tokens.  You will receive a commission of the player's earnings."}
                btn_text1={"Game Integration"}
                bg_class={"game-integration"}
              />
              <GamePageContent />
              <Footer />
              <ModalSearch />
              <ModalMenu />
              <Scrollup />
            </div>

        );
    }
}

export default ExploreTwo;