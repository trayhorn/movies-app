import { useEffect, useState } from "react"
import { getWatchlistMovies } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";
import Loader from "../../components/utils/Loader";

export default function WatchList() {
  const [watchListMovies, setWatchListMovies] = useState([]);
	const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
      async function fetchFavorites() {
        try {
          setLoading(true);
          const { data } = await getWatchlistMovies();
          setWatchListMovies(data.results);
        } catch (error) {
          console.log(error.message);
          setError(true);
        } finally {
          setLoading(false);
        }
      }
  
      fetchFavorites();
    }, []);
  
  return (
    <>
			{loading && <Loader />}
      {watchListMovies && (
        <MoviesList moviesToRender={watchListMovies} />
      )}
			{error && <div>Something went wrong</div>}
		</>
	);
}