import React from "react"
import {useSelector} from "react-redux"
import jwt_decode from "jwt-decode";


// TODO: not being used
const UserNameBox = () => {
  const token = sessionStorage.jwtToken;
  const decoded = jwt_decode(token);

  console.log("decoded", decoded)
  // TODO: get from MONGODB/LOCAL STORAGE
  if (decoded.name) {
    return (
      <div className="account-user">
        <h6>Hello {decoded.name}</h6>
      </div>
    )
  }
  else {
    return (

      <div className="account-user">
        <h6>Hello #456</h6>
      </div>

    )
  }
}
export default UserNameBox;