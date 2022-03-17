import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import QuizSection from '../components/Quiz/QuizSection';
import Work from '../components/Work/Work';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import LeaderboardSection from '../components/Leaderboard/LeaderboardSection';
import TokenomicsSection from '../components/Sections/TokenomicsSection';

class HomePage extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Hero />
                <Work />
                <QuizSection />
                {/*<TopSeller />*/}
                <LeaderboardSection />
                {/*<Collections />*/}
                {/*<Explore />*/}
                <TokenomicsSection />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default HomePage;