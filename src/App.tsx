import Card from "./components/Card";

import "./app.scss";
import {
  TextField,
  Grid,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

import { AppDispatch, RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoviesByTitle } from "./store/slices/streamsSlice";
import { useEffect, useState } from "react";

import { calculatePaginationLength } from "./utils/calculatePaginationLength";

interface SearchTerms {
  title: string;
  year: string;
  type: string;
  pageNumber: number;
}

function App() {
  const [searchTerms, setSearchTerms] = useState<SearchTerms>({
    title: "Pokemon",
    year: "",
    type: "",
    pageNumber: 1,
  });

  const [type, setType] = useState(null);

  const movies = useSelector((state: RootState) => state.streams);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMoviesByTitle(searchTerms));
  }, [dispatch, searchTerms]);

  const handleChange = (event: Object, value: number) => {
    setSearchTerms({
      title: searchTerms.title,
      year: searchTerms.year,
      type: searchTerms.type,
      pageNumber: value,
    });
  };

  const handleChangeType = (event: any) => {
    setType(event.target.value);

    setSearchTerms({
      title: searchTerms.title,
      year: searchTerms.year,
      type: event.target.value,
      pageNumber: searchTerms.pageNumber,
    });
  };

  return (
    <>
      <div className="topBar">Invent Analytics Test Case</div>
      <div className="searchBar">
        <TextField
          size="small"
          placeholder="Search..."
          onChange={(e) => {
            if (e.target.value.length > 3) {
              setSearchTerms({
                title: e.target.value,
                year: searchTerms.year,
                type: searchTerms.type,
                pageNumber: 1,
              });
            }
          }}
        />
        <TextField
          size="small"
          placeholder="Search by Year"
          onChange={(e) => {
            setSearchTerms({
              title: searchTerms.title,
              year: e.target.value,
              type: searchTerms.type,
              pageNumber: searchTerms.pageNumber,
            });
          }}
        />
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="demo-simple-select-label">Episodes</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Episodes"
            onChange={handleChangeType}
            size="small"
          >
            <MenuItem value={"movie"}>Movie</MenuItem>
            <MenuItem value={"series"}>Series</MenuItem>
          </Select>
        </FormControl>
        {/* <Select
          size="small"
          placeholder="Search by Type"
          onChange={(e) => {
           
          }}
        /> */}
      </div>
      <div className="movie-content-area">
        <Grid container spacing={2} className="grid-container">
          {movies.entities &&
            movies.entities.map((val, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
                <Card
                  title={val.Title}
                  type={val.Type}
                  year={val.Year}
                  imdbID={val.imdbID}
                  poster={val.Poster}
                />
              </Grid>
            ))}
        </Grid>
        <Pagination
          onChange={handleChange}
          count={calculatePaginationLength(movies.totalResult)}
          color="primary"
          page={searchTerms.pageNumber}
        />
      </div>
    </>
  );
}

export default App;
