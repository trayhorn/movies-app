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
			if (searchParams.size === 0) return;

			const formValues = Object.fromEntries(searchParams);
			try {
				const { data } = await discoverMovie(page, formValues);

				if (data.total_pages === page) hasMoreRef.current = false;

				setFilteredMovies((prevState) =>
					page === 1 ? data.results : [...prevState, ...data.results]
				);
			} catch (error) {
				console.log(error);
			}
		}

		getFilteredMovies();
	}, [searchParams, page]);

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
					genresList={genresList}
				/>
			)}
		</>
	);
}