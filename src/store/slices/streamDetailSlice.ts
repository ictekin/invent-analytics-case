import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface StreamDetailState {
  streamDetail: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  streamDetail: null,
  loading: "idle",
} as StreamDetailState;

interface SearchTerms {
  title: string;
  type: string;
}

export const fetchStreamDetail = createAsyncThunk(
  "streamsDetail",
  async (searchTerms: SearchTerms) => {
    const { title, type } = searchTerms;
    const refactoredString = title.split(" ").join("&");
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=27d4667d&type=${type}&t=${refactoredString}`
    );
    return response.data;
  }
);

const streamDetailSlice = createSlice({
  name: "streamDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //pending and refected cases not added.
    builder.addCase(fetchStreamDetail.fulfilled, (state, action) => {
      state.streamDetail = action.payload;
    });
  },
});

export default streamDetailSlice.reducer;
