import { createSlice } from '@reduxjs/toolkit'

export const attentionSlice = createSlice({
  name: 'attention_span',
  initialState: {
    value: 0,
  },
  reducers: {
    // updates after taking a test
    update_attention_span: (state, action) => {
      state.value = action.payload
      sessionStorage.setItem("update_attention_span", state.value);
    },
  },
})

export const { update_attention_span } = attentionSlice.actions
export default attentionSlice.reducer