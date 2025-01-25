import { toast } from "react-toastify";

export function errorToast() {
  return toast.error("Something went wrong");
}

export function addedToFavoritesToast() {
  return toast.success('Added to favorites');
}

export function removedFromFavoritesToast() {
  return toast.success('Removed from favorites');
}