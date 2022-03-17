import { createSlice } from '@reduxjs/toolkit'

export const contractSlice = createSlice({
  name: 'contract_test',
  initialState: {
    value: '',
  },
  reducers: {
    update_contract: (state, action) => {
      console.log("blockchain_data", action.payload)
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_contract } = contractSlice.actions

export default contractSlice.reducer