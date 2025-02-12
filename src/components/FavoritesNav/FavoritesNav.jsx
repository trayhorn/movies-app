import PropTypes from "prop-types";
import "./FavoritesNav.scss";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function FavoritesNav({ onDeleteClick, onSubmit, lists }) {
	return (
		<nav aria-label="favorites-nav" className="favorites-nav">
			<ul className="list">
				{lists.map((el) => {
					return (
						<div key={el.id} className="list-item">
							<Link to={`lists/${el.id}`}>{el.name}</Link>
							<button onClick={() => onDeleteClick(el.id)}>delete</button>
						</div>
					);
				})}
			</ul>
			<form onSubmit={onSubmit} className="form">
				<input placeholder="Collection name" type="text" name="name" />

				<button type="submit" className="button" title="Create Collection">
					<FaPlus className="icon" size="1.5rem" />
				</button>
			</form>
		</nav>
	);
}

FavoritesNav.propTypes = {
	lists: PropTypes.array,
	onDeleteClick: PropTypes.func,
	onSubmit: PropTypes.func,
};