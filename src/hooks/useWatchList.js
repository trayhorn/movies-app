import { useState, useEffect } from "react";
import {
	addToWatchList,
	getWatchlistMovies,
	removeFromWatchList,
} from "../api/api";
import {
	addedToWishListToast,
	errorToast,
	removedFromWishListToast,
} from "../components/utils/toasts";

export default function useWatchList(id) {
	const [inWatchList, setInWatchList] = useState(false);

	const handleWatchList = async (movieId) => {
		if (inWatchList) {
			try {
				await removeFromWatchList(movieId);
				removedFromWishListToast();
			} catch (e) {
				console.log(e);
				errorToast();
			}
		} else {
			try {
				await addToWatchList(movieId);
				addedToWishListToast();
			} catch (e) {
				console.log(e);
				errorToast();
			}
		}
		setInWatchList((prevState) => !prevState);
	};

	useEffect(() => {
		async function checkWishList() {
			try {
				const { data } = await getWatchlistMovies();
				if (data.results.find((el) => el.id === id)) {
					setInWatchList(true);
				}
			} catch (error) {
				console.log(error);
			}
		}

		checkWishList();
	});

	return { inWatchList, handleWatchList };
}
