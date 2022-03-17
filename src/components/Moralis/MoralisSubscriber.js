
import jwt_decode from "jwt-decode";
import {useMoralis} from "react-moralis";
import Moralis from "moralis"


// https://github.com/MoralisWeb3/react-moralis#usemoralissubscription

// TODO: hooks inside of error
const MoralisSubscriber = async props => {
  const { Moralis } = useMoralis();
  const unsubscribe = Moralis.Web3.onAccountsChanged(function(accounts) {
    console.log("sadfasdf", accounts);
  });

}
export default MoralisSubscriber