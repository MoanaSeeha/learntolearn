import { createSlice } from '@reduxjs/toolkit'

export const genericModalSlice = createSlice({
  name: 'generic_modal',
  initialState: {
    value: '',
  },
  reducers: {
    update_modal_title: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { update_modal_title } = genericModalSlice.actions

export default genericModalSlice.reducer