import { useState, useEffect, useRef } from "react";
import "./Dropdown.scss";
import PropTypes from "prop-types";

export default function Dropdown({movie, lists}) {
  const [openId, setOpenId] = useState(false);
	const ref = useRef(null);

	const handleClick = (e) => {
		if (ref.current.contains(e.target)) {
			return;
		}
		setOpenId(false);
  };

  
  useEffect(() => {
		window.addEventListener("click", handleClick);
		return () => window.removeEventListener("click", handleClick);
	}, [lists]);

  return (
		<div className="addToListWrapper" ref={ref}>
			<button
				className="add-button"
        onClick={() =>
          setOpenId(movie.id === openId ? null : movie.id)
        }
			>
				Add
			</button>
			<div className="addToList">
				{openId === movie.id && (
					<ul className="dropdown">
						{lists.map((el) => {
							return <li key={el.id}>{el.name}</li>;
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