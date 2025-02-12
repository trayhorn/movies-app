import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getListDetails } from "../../api";
import ListGallery from "./ListGallery";
import { removeMovieFromList } from "../../api";
import { errorToast } from "../utils/toasts";


export function ListDetails() {
  const [details, setDetails] = useState([]);

	const { listId } = useParams();

	const handleRemoveFromList = async (listId, movieId) => {
		try {
			await removeMovieFromList(listId, movieId);
			const { data } = await getListDetails(listId);
			setDetails(data);
		} catch (e) {
			console.log(e);
			errorToast();
		}
	};

  useEffect(() => {
    if (!listId) {
      return;
    }

    async function fetchListDetails(listId) {
			try {
        const { data } = await getListDetails(listId);
				setDetails(data);
			} catch (e) {
				console.log(e);
			}
		}

    fetchListDetails(listId);
  }, [listId])

  return (
		<>
			{details?.item_count > 0 ? (
				<ListGallery
					moviesToRender={details.items}
					handleClick={handleRemoveFromList}
				/>
			) : (
				<p>No movies in this list</p>
			)}
		</>
	);
}