import { createSlice } from '@reduxjs/toolkit'

/**
 * Action for showing or hiding the network modal
 * @type {Slice<{value: string}, {update_network_modal: reducers.update_network_modal}, string>}
 */
export const networkModalSlice = createSlice({
  name: 'network_modal',
  initialState: {
    value: 'hide',
  },
  reducers: {
    update_network_modal: (state, action) => {

      state.value = action.payload

      console.log("update_network_modal:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_network_modal } = networkModalSlice.actions

export default networkModalSlice.reducer