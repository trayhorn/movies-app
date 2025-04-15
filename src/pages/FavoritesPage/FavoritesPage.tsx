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

export default function FavoritesPage() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [lists, setLists] = useState<ListType[]>([]);

	const { listId } = useParams();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const value =
			(form.elements.namedItem('name') as HTMLInputElement).value.trim();

		if (value === "") {
			alert("The field is empty");
			return;
		}

		if (lists.find((el) => el.name === value)) {
			alert("Collection already exists");
		} else {
			try {
				await createList(value);
				const { data } = await getAccountLists();
				setLists(data.results);
			} catch (e) {
				console.log(e);
			}
		}

		form.reset();
	};

	const handleDeleteClick = async (listId: number) => {
		try {
			await deleteList(listId);
			const { data } = await getAccountLists();
			setLists(data.results);
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
				setLists(lists.results);
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
				lists={lists}
			/>
			{loading && <Loader />}
			{!listId && favorites ? (
				<MoviesList
					moviesToRender={favorites}
					renderDropdown={(movie) => <Dropdown movie={movie} lists={lists} />}
				/>
			) : (
				<Outlet />
			)}
			{error && <div>Something went wrong</div>}
		</>
	);
}
