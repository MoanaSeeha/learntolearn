import { createSlice } from '@reduxjs/toolkit'

export const contractNFTSlice = createSlice({
  name: 'contract_nfttest',
  initialState: {
    value: '',
  },
  reducers: {
    update_nftcontract: (state, action) => {
      console.log("blockchain_data", action.payload)
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_nftcontract } = contractNFTSlice.actions

export default contractNFTSlice.reducer