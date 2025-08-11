import { toast } from "react-toastify";

function errorToast() {
  return toast.error("Something went wrong");
}

function addedToFavoritesToast() {
  return toast.success('Added to favorites');
}

function removedFromFavoritesToast() {
  return toast.success('Removed from favorites');
}

function addedToWishListToast() {
	return toast.success("Added to watchlist");
}

function removedFromWishListToast() {
	return toast.success("Removed from watchlist");
}

function addedToList(list_name) {
  return toast.success(`Added to ${list_name}`);
}

function errorAddingToList(list_name) {
	return toast.error(`The movie already in the list ${list_name}`);
}

function listNotAdded() {
	return toast.error('List with this name already exists');
}

export {
	errorToast,
	addedToFavoritesToast,
	removedFromFavoritesToast,
	addedToWishListToast,
	removedFromWishListToast,
	addedToList,
	listNotAdded,
	errorAddingToList,
};