import { useEffect, useState } from "react";
import {
	getFavoriteMovies,
	createList,
	getAccountLists,
	deleteList,
} from "../../api";
import Loader from "../../components/utils/Loader";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useParams, Outlet, Link } from "react-router-dom";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [lists, setLists] = useState([]);

	const { listId } = useParams();
	console.log(listId);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { value } = e.target.elements.name;
		try {
			await createList(value);
			const { data } = await getAccountLists();
			setLists(data.results);
		} catch (e) {
			console.log(e)
		}
		e.target.reset();
	}

	const handleClick = async (listId) => {
		try {
			await deleteList(listId);
			const { data } = await getAccountLists();
			setLists(data.results);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		async function fetchAccountLists() {
			try {
				const { data } = await getAccountLists();
				setLists(data.results);
			} catch (e) {
				console.log(e)
			}
		}

		fetchAccountLists();
	}, [])


  useEffect(() => {
		async function fetchFavorites() {
			try {
				setLoading(true);
				const { data } = await getFavoriteMovies();
				setFavorites(data.results.reverse());
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
			<section>
				<ul>
					{lists.map((el) => {
						return (
							<div key={el.id}>
								<Link to={`lists/${el.id}`}>{el.name}</Link>
								<button onClick={() => handleClick(el.id)}>delete</button>
							</div>
						);
					})}
				</ul>
				<form onSubmit={handleSubmit}>
					<input type="text" name="name" />
					<button type="submit">Create list</button>
				</form>
			</section>
			{loading && <Loader />}
			{!listId && favorites ? <MoviesList moviesToRender={favorites} /> : <Outlet />}
			{error && <div>Something went wrong</div>}
		</>
	);
}