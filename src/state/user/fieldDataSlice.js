import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
  name: 'user_data',
  initialState: {
    value: '',
  },
  reducers: {
    user_login: (state, action) => {

      console.log("user_login", action)
      console.log("state", state)
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { user_login } = userDataSlice.actions

export default userDataSlice.reducer