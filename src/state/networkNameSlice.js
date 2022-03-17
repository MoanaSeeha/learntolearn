import { createSlice } from '@reduxjs/toolkit'

export const networkNameSlice = createSlice({
  name: 'network_name',
  initialState: {
    value: '',
  },
  reducers: {
    // TODO: switching to main works, switching back to rinkeby does NOT WORK
    update_network_name: (state, action) => {


      console.log("*******update_network_name action.payloads:", action)
      state.value = action.payload
      console.log("*******update_network_name state:", state.value)


    },
  },
})

// Action creators are generated for each case reducer function
export const { update_network_name } = networkNameSlice.actions

export default networkNameSlice.reducer