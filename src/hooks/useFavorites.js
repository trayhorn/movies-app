import { useState, useEffect } from "react";
import {
  getFavoriteMovies,
	addToFavorites,
	removeFromFavorites,
} from "../api";
import {
	addedToFavoritesToast,
	removedFromFavoritesToast,
	errorToast,
} from "../components/utils/toasts";

export default function useFavorites(id) {
  const [isInFavorites, setIsInFavorites] = useState(false);

  const handleFavorite = async (movieId) => {
      if (isInFavorites) {
        try {
          await removeFromFavorites(movieId);
          removedFromFavoritesToast();
        } catch (e) {
          console.log(e);
          errorToast();
        }
      } else {
        try {
          await addToFavorites(movieId);
          addedToFavoritesToast();
        } catch (e) {
          console.log(e);
          errorToast();
        }
      }
      setIsInFavorites((prevState) => !prevState);
    }

  useEffect(() => {
    async function checkFavorites() {
      try {
        const { data } = await getFavoriteMovies();
        if (data.results.find((el) => el.id === id)) {
          setIsInFavorites(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkFavorites();
  })

  return { isInFavorites, handleFavorite };
}