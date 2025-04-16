import { FormEvent, useEffect, useState } from "react";
import {
	getFavoriteMovies,
	createList,
	getAccountLists,
	deleteList,
} from "../../api/api";
import Loader from "../../components/utils/Loader";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useParams, Outlet } from "react-router-dom";
import FavoritesNav from "../../components/FavoritesNav/FavoritesNav";
import MoviesList from "../../components/MoviesList/MoviesList";
import { ListType } from "../../types/types";
import { listNotAdded } from "../../components/utils/toasts";

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [accountLists, setAccountLists] = useState<ListType[]>([]);

	const { listId } = useParams();

	const handleSubmit = async (inputValue: string) => {
		if (accountLists.find((el) => el.name === inputValue)) {
			listNotAdded();
		} else {
			try {
				await createList(inputValue);
				const { data } = await getAccountLists();
				setAccountLists(data.results);
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleDeleteClick = async (listId: number) => {
		try {
			await deleteList(listId);
			const { data } = await getAccountLists();
			setAccountLists(data.results);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		async function fetchFavoritesAndLists() {
			try {
				setLoading(true);
				const { data: favorites } = await getFavoriteMovies();
				setFavorites(favorites.results.reverse());

				const { data: lists } = await getAccountLists();
				setAccountLists(lists.results);
			} catch (e) {
				console.log(e);
				setError(true);
			} finally {
				setLoading(false);
			}
		}

		fetchFavoritesAndLists();
	}, []);

	return (
		<>
			<FavoritesNav
				onDeleteClick={handleDeleteClick}
				onSubmit={handleSubmit}
				lists={accountLists}
			/>
			{loading && <Loader />}
			{!listId && favorites ? (
				<MoviesList
					moviesToRender={favorites}
					renderDropdown={(movie) => (
						<Dropdown movie={movie} lists={accountLists} />
					)}
				/>
			) : (
				<Outlet />
			)}
			{error && <div>Something went wrong</div>}
		</>
	);
}
