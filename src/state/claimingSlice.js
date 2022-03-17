import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import {update_transaction_url} from "./transactionUrlSlice";


export const claimingSlice = createSlice({
  name: 'claiming',
  initialState: {
    value: '',
  },
  reducers: {
    update_claiming: (state, action) => {
      // TODO: update mongodb every time there is a state change
      // since backend is getting the amount
      state.value = action.payload
      console.log("update_claiming:", state.value)
    },
  },
})

export const { update_claiming } = claimingSlice.actions
export default claimingSlice.reducer