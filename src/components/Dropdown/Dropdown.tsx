import "./Dropdown.scss";
import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addMovieToList } from "../../api/api";
import { addedToList, errorAddingToList } from "../utils/toasts";
import { ListType, MovieToRender } from "../../types/types";

type DropdownType = {
	movie: MovieToRender;
	lists: ListType[];
};

export default function Dropdown({ movie, lists }: DropdownType) {
	const [openId, setOpenId] = useState<number | null>(null);
	const ref = useRef<HTMLDivElement | null>(null);

	const handleAddToList = async (list_id: number, media_id: number, list_name: string) => {
		try {
			await addMovieToList(list_id, media_id);
			addedToList(list_name)
		} catch (e) {
			console.log(e);
			errorAddingToList(list_name);
		}
	};

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const el = e.target as HTMLElement;
			if (ref.current && ref.current.contains(el)) {
				return;
			}
			setOpenId(null);
		};

		window.addEventListener("click", handleClick);
		return () => window.removeEventListener("click", handleClick);
	}, [lists]);

	return (
		<div className={"addToListWrapper" + (openId ? " isShowing" : "")}>
			<div className="add-icon_container" ref={ref}>
				<BsThreeDotsVertical
					className="add-icon"
					size="1.5rem"
					onClick={() => setOpenId(movie.id === openId ? null : movie.id)}
				/>
			</div>
			<div className={"addToList" + (openId ? " open" : "")}>
				<ul className="dropdown">
					{lists.map((el) => {
						return (
							<li
								key={el.id}
								className="dropdown-item"
								onClick={() => handleAddToList(el.id, movie.id, el.name)}
							>
								{el.name}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}