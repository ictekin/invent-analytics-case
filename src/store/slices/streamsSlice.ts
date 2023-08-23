import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface StreamServiceItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MoviesState {
  entities: Array<StreamServiceItem>;
  loading: "idle" | "pending" | "succeeded" | "failed";
  totalResult: number;
}

const initialState = {
  entities: [],
  loading: "idle",
  totalResult: 0,
} as MoviesState;

interface SearchTerms {
  title: string;
  year: string;
  type: string;
  pageNumber: number;
}

export const fetchMoviesByTitle = createAsyncThunk(
  "movies/fetchByTitle",
  async (searchTerms: SearchTerms) => {
    const { title, year, type, pageNumber } = searchTerms;
    const refactoredString = title.split(" ").join("&");
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=27d4667d&type=${type}&s=${refactoredString}&y=${year}&page=${pageNumber}`
    );
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //pending and refected cases not added.
    builder.addCase(fetchMoviesByTitle.fulfilled, (state, action) => {
      state.entities = action.payload.Search;
      state.totalResult = parseInt(action.payload.totalResults);
    });
  },
});

export default moviesSlice.reducer;
