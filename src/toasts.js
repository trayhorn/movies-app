import { toast } from "react-toastify";

export function errorToast() {
  return toast.error("Something went wrong");
}

export function alreadyInFavoritesToast() {
  return toast.error('Already in favorites');
}