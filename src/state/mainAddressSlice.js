import { createSlice } from '@reduxjs/toolkit'

export const mainAddressSlice = createSlice({
  name: 'main_address',
  initialState: {
    value: '',
  },
  reducers: {
    update_main_address: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload

      console.log("update_token_address:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_main_address } = mainAddressSlice.actions

export default mainAddressSlice.reducer