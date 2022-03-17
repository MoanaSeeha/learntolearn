import { createSlice } from '@reduxjs/toolkit'

export const fullModalSlice = createSlice({
  name: 'full_modal',
  initialState: {
    value: '',
  },
  reducers: {
    update_full_modal: (state, action) => {
      // TODO: update mongodb every time there is a state change
      // since backend is getting the amount
      state.value = action.payload

      console.log("full_modal:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_full_modal } = fullModalSlice.actions

export default fullModalSlice.reducer