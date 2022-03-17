import { createSlice } from '@reduxjs/toolkit'

export const ltsTokenSlice = createSlice({
  name: 'lts_token_amount',
  initialState: {
    value: '',
  },
  reducers: {
    update_lts_token_amount: (state, action) => {

      //

      state.value = action.payload
      console.log("update_lts_token_amount:", state.value)


    },
  },
})

export const { update_lts_token_amount } = ltsTokenSlice.actions

export default ltsTokenSlice.reducer