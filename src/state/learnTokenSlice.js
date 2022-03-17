import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {update_transaction_url} from "./transactionUrlSlice";
import {update_claiming} from "./claimingSlice";
const API='http://127.0.0.1:7777'

export const learnTokenSlice = createSlice({
  name: 'learn_token_amount',
  initialState: {
    value: '',
  },
  reducers: {
    update_learn_token_amount: (state, action) => {

      //

      state.value = action.payload
      console.log("update_learn_token_amount:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_learn_token_amount } = learnTokenSlice.actions

export default learnTokenSlice.reducer