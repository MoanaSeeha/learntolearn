import jwt_decode from "jwt-decode";
import {useMoralis} from "react-moralis";





// TODO: NOT USING
const SecureAuth = async props => {
  const token = sessionStorage.jwtToken;
  const decoded = jwt_decode(token);
  console.log("decoded useEffect", decoded);
  const {
    signup,
    login,
    logout,
    isAuthenticating,
    isAuthenticated,
    user,
    setUserData,
    userError,
    isUserUpdating,
    authenticate,
    Moralis
  } = useMoralis();

  if (decoded.address) {
    // TODO: look in mongoDB


    // TODO: make sure we are connected to right network


    //const { authenticate, isAuthenticated, userm } = useMoralis();

    if (!isAuthenticated) {
      console.log("not auth")
      console.log("not auth", user)
      // return (
      //   <div>
      //     <button onClick={() => authenticate()}>Authenticate</button>
      //   </div>
      // );

      let serverUrl = process.env.M_SERVER_URL
      let appId = process.env.M_APP_ID;
      let userAuth
      Moralis.start({serverUrl, appId});
      if (!user) {
        //user = await Moralis.authenticate();

        userAuth = await Moralis.authenticate(
          {
            //provider: "walletconnect", // shows qr code
            provider: "metamask",
            chainId: process.env.CURRENT_CHAIN_ID
          }
        ).then(function (user) {
          console.log("Logginng user", user);

        })
      }

    } else {

      console.log("logged", user.get("username"))
    }
  } else {
    console.log("NOT LOGGED IN AT ALL")
  }

  return decoded;
}
export default SecureAuth