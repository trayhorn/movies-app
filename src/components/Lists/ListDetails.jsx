import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { getListDetails } from "../../api";
import MoviesList from "../MoviesList/MoviesList";

export function ListDetails() {
  const [details, setDetails] = useState([]);

  const { listId } = useParams();

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
				<MoviesList moviesToRender={details.items} />
			) : (
				<p>No movies in this list</p>
			)}
		</>
	);
}