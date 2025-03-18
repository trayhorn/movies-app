import "./Dropdown.scss";
import { useState, useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addMovieToList } from "../../api";
import { addedToList } from "../utils/toasts";
import { List } from "../../types/types";

type DropdownType = {
	movie: { id: number},
	lists: List[],
};

export default function Dropdown({ movie, lists }: DropdownType) {
	const [openId, setOpenId] = useState<number | null>(null);
	const ref = useRef<HTMLDivElement | null>(null);

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
		<div className="addToListWrapper">
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
								onClick={() => {
									addMovieToList(el.id, movie.id);
									addedToList(el.name);
								}}
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