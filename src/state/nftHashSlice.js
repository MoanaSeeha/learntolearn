import { createSlice } from '@reduxjs/toolkit'

export const nftHashSlice = createSlice({
  name: 'nft_hash_list',
  initialState: {
    value: '',
  },
  reducers: {
    update_nft_hash_list: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      console.log("update_nft_hash_list: ", action.payload);

      state.value = action.payload
      console.log("update_nft_hash_list:", state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_nft_hash_list } = nftHashSlice.actions

export default nftHashSlice.reducer