import { createSlice } from '@reduxjs/toolkit'

export const unclaimedLearnSlice = createSlice({
  name: 'unclaimed_learn_amount',
  initialState: {
    value: 0,
  },
  reducers: {
    // updates after taking a test
    update_unclaimed_learn: (state, action) => {
      state.value = action.payload.score
      sessionStorage.setItem("unclaimed_learn_amount", state.value);
    },
    // TODO: need to also update MONGO DB
    update_unclaimed_learn_decoded: (state, action) => {
      state.value = action.payload
      sessionStorage.setItem("unclaimed_learn_amount", state.value);
    },
  },
})

export const { update_unclaimed_learn, update_unclaimed_learn_decoded } = unclaimedLearnSlice.actions
export default unclaimedLearnSlice.reducer