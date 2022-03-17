import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Explore from '../components/Explore/ExploreFour';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
// import GamePageContent from "../components/Games/GamePageContent"
import RoadmapContent from "../components/Roadmap/RoadmapContent"
import GenericHero from "../components/Hero/GenericHero"

class RoadmapPage extends Component {
    render() {
        return (
            <div className="main">
              <Header />
              <GenericHero
                highlight={"lofty goals"}
                header_name={"Our Roadmap"}
                blurb={"We are working everyday to make our dream a reality."}
                btn_text1={"Game Integration"}
                bg_class={"game-integration"}
              />
              <RoadmapContent />
              <Footer />
              <ModalSearch />
              <ModalMenu />
              <Scrollup />
            </div>

        );
    }
}

export default RoadmapPage;