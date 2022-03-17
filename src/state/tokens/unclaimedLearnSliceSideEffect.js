import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
const API='http://127.0.0.1:7777'


export const unclaimedLearnSliceSideEffect = createSlice({
  name: 'unclaimed_learn_amount',
  initialState: {
    value: 0,
  },
  reducers: {
    update_unclaimed_learn: (state, action) => {

      console.log("action", action);
      console.log("action.payload.score", action.payload.score);

      // TODO: send new unclaimed learn, all calculations done in backend and new unclaimed learn amount returned
      axios.post(API + "/api/v1/update/unclaimed_learn",{ether_address: action.payload.address, unclaimed_learn_amount: action.payload.score})
        .then(response => {

          if(response.data){

            console.log("23 response.data", response.data);

            console.log("response.data.unclaimed_learn_amount", response.data.new_unclaimed);

            // state.value = action.payload
            // state.value = +action.payload +  +state.value
            //state.value = +action.payload.score +  +response.data.new_unclaimed
            // TODO: ypeError: Cannot perform 'set' on a proxy that has been revoked
            state.value = response.data.new_unclaimed

            console.log("update_unclaimed_learn NEW:", state.value)


          }
          else {
            console.log("37 unknown error")
          }
        })
        .catch(err => {
          console.log("err.data");
          console.log(err);
          return true;
        })
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_unclaimed_learn } = unclaimedLearnSliceSideEffect.actions

export default unclaimedLearnSliceSideEffect.reducer