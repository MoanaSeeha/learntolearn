import { createSlice } from '@reduxjs/toolkit'

// get a list of activities and put into state
export const activitySlice = createSlice({
  name: 'list_activities',
  initialState: {
    value: 0,
  },
  reducers: {
    update_activities: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { update_activities } = activitySlice.actions
export default activitySlice.reducer