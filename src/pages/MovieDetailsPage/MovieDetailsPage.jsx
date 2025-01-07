import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../api";


export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const {movieId} = useParams();

  useEffect(() => {
    getMovieDetails(movieId)
			.then((res) => setMovieDetails(res.data))
			.catch((e) => console.log(e));
  }, [movieId]);

  return <div>This is a movie page for {movieDetails.original_title}</div>;
}