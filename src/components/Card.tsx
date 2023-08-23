import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

import { fetchStreamDetail } from "../store/slices/streamDetailSlice";

interface MovieCardState {
  title: string;
  year: string;
  type: string;
  imdbID: string;
  poster: string;
}

function MovieCard(props: MovieCardState) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card
      sx={{ maxWidth: 345, height: 450 }}
      onClick={() => {
        dispatch(fetchStreamDetail({ title: props.title, type: props.type }));
        navigate(`/detail/${props.title}`);
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height={250} image={props.poster} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="body2">
            Type : {props.type}
          </Typography>
          <Typography gutterBottom variant="body2">
            Year : {props.year}
          </Typography>
          <Typography gutterBottom variant="body2">
            IMDB ID : {props.imdbID}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
