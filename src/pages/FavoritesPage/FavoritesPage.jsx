import { useEffect, useState } from "react";
import {
	getFavoriteMovies,
	createList,
	getAccountLists,
	deleteList,
} from "../../api";
import Loader from "../../components/utils/Loader";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useParams, Outlet } from "react-router-dom";
import FavoritesNav from "../../components/FavoritesNav/FavoritesNav";
import MoviesList from "../../components/MoviesList/MoviesList";

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
		async function fetchFavoritesAndLists() {
			try {
				setLoading(true);
				const { data: favorites } = await getFavoriteMovies();
				setFavorites(favorites.results.reverse());

				const { data: lists } = await getAccountLists();
				setLists(lists.results);
			} catch (error) {
				console.log(error.message);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchFavoritesAndLists();
	}, [])

	return (
		<>
			<FavoritesNav
				onDeleteClick={handleDeleteClick}
				onSubmit={handleSubmit}
				lists={lists}
			/>
			{loading && <Loader />}
			{!listId && favorites ? (
				<MoviesList
					moviesToRender={favorites}
					lists={lists}
					renderDropdown={(movie) => (
						<Dropdown movie={movie} lists={lists} />
					)}
				/>
			) : (
				<Outlet />
			)}
			{error && <div>Something went wrong</div>}
		</>
	);
}