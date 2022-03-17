import { createSlice } from '@reduxjs/toolkit'

export const chainIdSlice = createSlice({
  name: 'chain_id',
  initialState: {
    value: '',
  },
  reducers: {
    update_chain_id: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_chain_id } = chainIdSlice.actions

export default chainIdSlice.reducer