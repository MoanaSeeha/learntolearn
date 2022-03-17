import React,{useEffect} from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import WhitePaperSection from "../components/Sections/WhitePaperSection";

const WhitePaperPage = () => {

  return (
    <div className="main">
      <Header />
      <WhitePaperSection />
      <Footer />
      <ModalSearch />
      <ModalMenu />
      <Scrollup />
    </div>
  );
};


export default WhitePaperPage