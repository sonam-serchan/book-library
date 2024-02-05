import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrowList: [] 
}

export const borrowHistorySlice = createSlice({
  name: 'borrowHistory',
  initialState,
  reducers: {
    setBorrowHistoryList: (state, action) => {
      state.borrowList = action.payload
    }
  }
});

export const { setBorrowHistoryList } = borrowHistorySlice.actions;
export default borrowHistorySlice.reducer;