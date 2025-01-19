import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
  name: "animation",
  initialState: false,
  reducers: {
    setAnimation(_state, action) {
      return  action.payload;
    },
  },
});

export const { setAnimation } = animationSlice.actions;
export default animationSlice.reducer;
