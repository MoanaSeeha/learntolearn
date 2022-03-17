import jwt_decode from "jwt-decode";
import setAuthToken from "../../setAuthToken";

const GetUserAuth = () => {

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

export default GetUserAuth