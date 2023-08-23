import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface StreamDetailState {
  seriesDetail: any;
  selectedEpisode: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  seriesDetail: null,
  selectedEpisode: null,
  loading: "idle",
} as StreamDetailState;

interface SearchTerms {
  title: string;
  type: string;
  seasonNumber: number;
  episodeNumber: number;
}

export const fetchSeries = createAsyncThunk(
  "series",
  async (searchTerms: SearchTerms) => {
    const { title, type, seasonNumber } = searchTerms;
    const refactoredString = title.split(" ").join("&");
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=27d4667d&type=${type}&t=${refactoredString}&season=${seasonNumber}`
    );
    return response.data;
  }
);

export const fetchSelectedEpisode = createAsyncThunk(
  "episode",
  async (searchTerms: SearchTerms) => {
    const { title, type, seasonNumber, episodeNumber } = searchTerms;
    const refactoredString = title.split(" ").join("&");
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=27d4667d&type=${type}&t=${refactoredString}&season=${seasonNumber}&episode=${episodeNumber}`
    );
    return response.data;
  }
);

const streamDetailSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //pending and refected cases not added.
    builder.addCase(fetchSeries.fulfilled, (state, action) => {
      state.seriesDetail = action.payload;
    });
    builder.addCase(fetchSelectedEpisode.fulfilled, (state, action) => {
      state.selectedEpisode = action.payload;
    });
  },
});

export default streamDetailSlice.reducer;
