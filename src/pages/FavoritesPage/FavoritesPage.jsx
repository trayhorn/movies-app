import { useEffect, useState } from "react";
import {
	getFavoriteMovies,
	createList,
	getAccountLists,
	deleteList,
} from "../../api";
import Loader from "../../components/utils/Loader";
import FavoriteMoviesList from "../../components/FavoriteMoviesList/FavoriteMoviesList";
import { useParams, Outlet } from "react-router-dom";
import FavoritesNav from "../../components/FavoritesNav/FavoritesNav";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [lists, setLists] = useState([]);

	const { listId } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const value = e.target.elements.name.value.trim();

		if (value === '') {
			alert('The field is empty');
			return;
		}

		if (lists.find((el) => el.name === value)) {
			alert('Collection already exists')
		} else {
			try {
				await createList(value);
				const { data } = await getAccountLists();
				setLists(data.results);
			} catch (e) {
				console.log(e);
			}
		}

		e.target.reset();
	}

	const handleDeleteClick = async (listId) => {
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
			<FavoritesNav
				onDeleteClick={handleDeleteClick}
				onSubmit={handleSubmit}
				lists={lists}
			/>
			{loading && <Loader />}
			{!listId && favorites ? (
				<FavoriteMoviesList moviesToRender={favorites} lists={lists} />
			) : (
				<Outlet />
			)}
			{error && <div>Something went wrong</div>}
		</>
	);
}