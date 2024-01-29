import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookList: [],
  // setSelectedBook: {}
};

export const bookSlice = createSlice({
  name: 'bookList',
  initialState,
  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    }
  }
});

export const { setBookList } = bookSlice.actions
export default bookSlice.reducer