import { createSlice } from '@reduxjs/toolkit'

export const chainIdHexSlice = createSlice({
  name: 'chain_id_hex',
  initialState: {
    value: '',
  },
  reducers: {
    update_chain_id_hex: (state, action) => {

      if(action.payload) {
        state.value = action.payload
      }

      console.log("chainIdHexSlice:", state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_chain_id_hex } = chainIdHexSlice.actions

export default chainIdHexSlice.reducer