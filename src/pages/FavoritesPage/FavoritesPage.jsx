import { useEffect, useState } from "react";
import { getFavoriteMovies } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log('calling useEffect');
    getFavoriteMovies()
			.then((res) => setFavorites(res.data.results))
			.catch((e) => console.log(e));
  }, [])

  return <>{favorites && <MoviesList moviesToRender={favorites} />}</>;
}
