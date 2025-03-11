import "./ListDetails.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getListDetails } from "../../api";
import { removeMovieFromList } from "../../api";
import { errorToast } from "../utils/toasts";
import MoviesList from "../MoviesList/MoviesList";
import { RxCross2 } from "react-icons/rx";



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
				<MoviesList
					moviesToRender={details.items}
					handleClick={handleRemoveFromList}
					renderIcon={(listId, movieId) => (
						<div className="delete-icon_container">
							<RxCross2
								size="1.5rem"
								className="icon"
								onClick={() => handleRemoveFromList(listId, movieId)}
							/>
						</div>
					)}
				/>
			) : (
				<p>No movies in this list</p>
			)}
		</>
	);
}