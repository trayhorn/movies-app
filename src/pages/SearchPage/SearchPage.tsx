import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchedMovies } from "../../api/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { MovieToRender } from "../../types/types";

export default function SearchPage() {
	const [searchedMovies, setSearchedMovies] = useState<MovieToRender[]>([]);
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
			{searchedMovies.length > 0 ? (
				<MoviesList
					moviesToRender={searchedMovies}
				/>
			) : (
					<p>Nothing found by this query</p>
			)}
		</>
	);
}
