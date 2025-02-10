import { useState, useEffect, useRef } from "react";
import "./Dropdown.scss";
import PropTypes from "prop-types";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Dropdown({movie, lists}) {
  const [openId, setOpenId] = useState(false);
	const ref = useRef(null);


  useEffect(() => {
    const handleClick = (e) => {
			if (ref.current.contains(e.target)) {
				return;
			}
			setOpenId(false);
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
			<div className="addToList">
				{openId === movie.id && (
					<ul className="dropdown">
						{lists.map((el) => {
							return (
								<li className="dropdown-item" key={el.id}>
									{el.name}
								</li>
							);
						})}
					</ul>
				)}
			</div>
		</div>
	);
}

Dropdown.propTypes = {
	movie: PropTypes.object,
	lists: PropTypes.array
};