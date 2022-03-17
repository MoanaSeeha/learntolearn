import { createSlice } from '@reduxjs/toolkit'

export const transactionUrlSlice = createSlice({
  name: 'transaction_url',
  initialState: {
    value: '',
  },
  reducers: {
    update_transaction_url: (state, action) => {
      // TODO: update mongodb every time there is a state change
      // since backend is getting the amount
      state.value = action.payload

      console.log("update_transaction_url:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_transaction_url } = transactionUrlSlice.actions

export default transactionUrlSlice.reducer