import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

import { createSeasonArray } from "../utils/createSeasonArray";

import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

import {
  fetchSeries,
  fetchSelectedEpisode,
} from "../store/slices/seriesDetailSlice";

import "./StreamDetail.scss";

function StreamDetail() {
  const streamDetail = useSelector(
    (state: RootState) => state.streamDetail.streamDetail
  );

  const seriesDetail = useSelector((state: RootState) => state.seriesDetail);

  const dispatch = useDispatch<AppDispatch>();

  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const a = createSeasonArray(streamDetail?.totalSeasons ?? 1);

  const handleChange = (event: any) => {
    setSelectedSeason(event.target.value);
    dispatch(
      fetchSeries({
        title: streamDetail.Title,
        type: streamDetail.Type,
        seasonNumber: event.target.value + 1,
        episodeNumber: 0,
      })
    );
  };

  const handeEpisodeChange = (event: any) => {
    setSelectedEpisode(event.target.value);
    dispatch(
      fetchSelectedEpisode({
        title: streamDetail.Title,
        type: streamDetail.Type,
        seasonNumber: selectedSeason! + 1,
        episodeNumber: parseInt(event.target.value) + 1,
      })
    );
  };

  return (
    <>
      {streamDetail && (
        <>
          <div className="topBar">Invent Analytics Test Case</div>
          {streamDetail.Type === "movie" ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Runtime&nbsp;(min)</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Directors</TableCell>
                    <TableCell>Actors</TableCell>
                    <TableCell>IMDB Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={streamDetail.Title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {streamDetail.Title}
                    </TableCell>
                    <TableCell>{streamDetail.Runtime}</TableCell>
                    <TableCell>{streamDetail.Genre}</TableCell>
                    <TableCell>{streamDetail.Director}</TableCell>
                    <TableCell>{streamDetail.Actors}</TableCell>
                    <TableCell>{streamDetail.imdbRating}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <div className="searchBar">
                <FormControl sx={{ minWidth: 240 }}>
                  <InputLabel id="demo-simple-select-label">Seasons</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedSeason}
                    label="Seasons"
                    onChange={handleChange}
                  >
                    {a.map((val: any, index: any) => {
                      return (
                        <MenuItem value={val} key={index}>
                          {val + 1}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 240 }}>
                  <InputLabel id="demo-simple-select-label">
                    Episodes
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedEpisode}
                    label="Episodes"
                    onChange={handeEpisodeChange}
                  >
                    {seriesDetail.seriesDetail != null &&
                      seriesDetail.seriesDetail.Episodes.map(
                        (val: any, index: any) => {
                          return (
                            <MenuItem value={val.Episode} key={index}>
                              {parseInt(val.Episode) + 1}
                            </MenuItem>
                          );
                        }
                      )}
                  </Select>
                </FormControl>
              </div>
              {seriesDetail.selectedEpisode && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Runtime&nbsp;(min)</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Directors</TableCell>
                        <TableCell>Actors</TableCell>
                        <TableCell>IMDB Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={seriesDetail.selectedEpisode.Title}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {seriesDetail.selectedEpisode.Title}
                        </TableCell>
                        <TableCell>
                          {seriesDetail.selectedEpisode.Runtime}
                        </TableCell>
                        <TableCell>
                          {seriesDetail.selectedEpisode.Genre}
                        </TableCell>
                        <TableCell>
                          {seriesDetail.selectedEpisode.Director}
                        </TableCell>
                        <TableCell>
                          {seriesDetail.selectedEpisode.Actors}
                        </TableCell>
                        <TableCell>
                          {seriesDetail.selectedEpisode.imdbRating}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default StreamDetail;

{
  /*  */
}
