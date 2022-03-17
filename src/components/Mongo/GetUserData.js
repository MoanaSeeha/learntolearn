import React from 'react';
import axios from 'axios';
import {update_activities} from "../../state/activity/activitySlice";

const GetUserData = async (address, token) => {
//const GetUserData = (address) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  };
  console.log("address", address)
  let data = await axios.post(process.env.API_URL + "/api/v1/get/user",{
    address: address,
  },{headers})
    .then(response => {

      if(response.data){
        console.log("GetUserData response.data", response.data);

        return response.data;
      }
      else {
        console.log("NO SUCCESS response.data", response.data);
      }
    })
    .catch(err => {
      console.log("err.data");
      console.log(err);
      return err;
    })

  return data;
};

export default GetUserData;