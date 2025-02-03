// import style from "./MoviesPage.module.css";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllGenres, discoverMovie } from "../../api";
import MoviesSearchList from "../../components/MoviesSearchList/MoviesSearchList";
import SearchForm from "../../components/SearchForm/SearchForm";

export default function MoviesPage() {
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [genresList, setGenresList] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();

	const hasMoreRef = useRef(true);

	const genres = searchParams.get("genres");
	const vote_average = searchParams.get("vote_average");
	const release_date_from = searchParams.get("release_date_from");
	const release_date_to = searchParams.get("release_date_to");
	const sort_by = searchParams.get('sort_by');


	const handleFormSubmit = (formValues) => {
		setPage(1);
		setSearchParams(formValues);
	}


	useEffect(() => {
		async function renderGenres() {
			try {
				const {data} = await getAllGenres();
				setGenresList(data.genres);
			} catch (error) {
				console.log(error);
			}
		}

		renderGenres();
	}, [])

	useEffect(() => {
		async function getFilteredMovies() {
			if (!genres && !vote_average && !release_date_from && !release_date_to && !sort_by) return;
			try {
				const { data } = await discoverMovie(
					page,
					genres,
					vote_average,
					release_date_from,
					release_date_to,
					sort_by
				);

				if (data.total_pages === page) hasMoreRef.current = false;

				setFilteredMovies((prevState) =>
					page === 1 ? data.results : [...prevState, ...data.results]
				);
			} catch (error) {
				console.log(error);
			}
		}

		getFilteredMovies();
	}, [genres, release_date_from, release_date_to, vote_average, sort_by, page]);

  return (
		<>
			{genresList && (
				<SearchForm onSubmit={handleFormSubmit} genres={genresList} />
			)}

			{filteredMovies.length > 0 && (
				<MoviesSearchList
					moviesToRender={filteredMovies}
					fetchMore={() => setPage((prev) => prev + 1)}
					hasMore={hasMoreRef.current}
				/>
			)}
		</>
	);
}