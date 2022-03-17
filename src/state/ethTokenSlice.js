import { createSlice } from '@reduxjs/toolkit'

export const ethTokenSlice = createSlice({
  name: 'eth_token_amount',
  initialState: {
    value: '',
  },
  reducers: {
    update_eth_amount: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.value = action.payload


      console.log("update_eth_amount:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_eth_amount } = ethTokenSlice.actions

export default ethTokenSlice.reducer