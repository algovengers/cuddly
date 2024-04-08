import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserStore {
  name: string | null;
  email: string | null;
  isAuth?: boolean;
}

const initialState: UserStore = {
  name: null,
  email: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserStore>) {
      const data: {
        name: string | null;
        email: string | null;
      } = action.payload;

      // console.log(data);
      state.isAuth = true;
      if (data.name && data.email) {
        state.name = data.name;
        state.email = data.email;
      }
    },
    unsetUser(state, action: PayloadAction<UserStore>) {
      state.name = null;
      state.email = null;
      state.isAuth = false;
    },
  },
});

export default userSlice.reducer;
export type RootState = ReturnType<typeof userSlice.getState>;
export const { setUser, unsetUser } = userSlice.actions;
