import React from 'react';
import WalletConnect from "./WalletConnect"
import HeaderLinks from "./HeaderLinks"

const Header = () => {
  return (
    <header id="header">
      {/* Navbar */}
      <HeaderLinks headerClassButton={"container header"} />
    </header>
  );
};

export default Header;