import { createSlice } from '@reduxjs/toolkit'

export const nftBuyListSlice = createSlice({
  name: 'nft_buy_list',
  initialState: {
    value: '',
  },
  reducers: {
    update_nft_buy_list: (state, action) => {
      state.value = action.payload
      console.log("nftBuyListSlice.js update_nft_buy_list:", state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_nft_buy_list } = nftBuyListSlice.actions

export default nftBuyListSlice.reducer