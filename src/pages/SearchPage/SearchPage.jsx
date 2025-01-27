import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToFavorites, getSearchedMovies } from "../../api";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function SearchPage() {
  const [searchedMovies, setSearchedMovies] = useState();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") ?? "";

  useEffect(() => {
		if (searchQuery === "") {
			return;
		}

		async function findMovie() {
			try {
				const { data } = await getSearchedMovies(searchQuery);
				setSearchedMovies(data.results);
			} catch (error) {
				console.log(error);
			}
		}
		findMovie();
	}, [searchQuery]);

  return (
		<>
			{searchedMovies && (
				<MoviesList
					moviesToRender={searchedMovies}
					handleFavorites={addToFavorites}
				/>
			)}
		</>
	);
}