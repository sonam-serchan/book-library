import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
  userInfo : {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;