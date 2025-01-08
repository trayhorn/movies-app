import { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { getSearchedMovies } from "../../api";

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const location = useLocation();
	const searchQuery = searchParams.get('query') ?? '';

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.elements.search.value);
	}

	const updateQuery = (e) => {
		const query = e.target.value;
		query !== ''
			? setSearchParams({ query })
			: setSearchParams({})
	}

  useEffect(() => {
    if (query === '') {
      return;
    } else {
      async function findMovie() {
				try {
					const { data } = await getSearchedMovies(query);
					setSearchedMovies(data.results);
				} catch (error) {
					console.log(error);
				}
			}
			findMovie();
    }
  }, [query])
  return (
		<main>
			<h1>Movies</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="input1">Find the movie</label>
				<input
					autoComplete="off"
					type="text"
					name="search"
					id="input1"
					value={searchQuery}
					onChange={updateQuery}
				/>
				<button type="submit">Search</button>
			</form>
			{query && (
				<ul>
					{searchedMovies.map((movie) => {
						return (
							<li key={movie.id}>
								<Link to={`${movie.id}`} state={{ from: location }}>
									{movie.title}
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</main>
	);
}