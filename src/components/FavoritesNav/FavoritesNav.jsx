import PropTypes from "prop-types";
import "./FavoritesNav.scss";
import { Link } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function FavoritesNav({ onDeleteClick, onSubmit, lists }) {
	const [addList, setAddlist] = useState(false);

	const handleSubmit = (e) => {
		onSubmit(e);
		setAddlist(false);
	}

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
			<form onSubmit={handleSubmit} className="form">
				<input
					className={"input" + (addList ? " showing" : "")}
					placeholder="Collection name"
					type="text"
					name="name"
				/>

				{!addList ? (
					<button
						type="button"
						className="button"
						title="Create Collection"
						onClick={(e) => {
							e.preventDefault();
							setAddlist(true);
						}}
					>
						<FaPlus className="icon" size="1.5rem" />
					</button>
				) : (
					<button type="submit" className="button">
						<FaCheck className="icon" size="1.5rem" />
					</button>
				)}
			</form>
		</nav>
	);
}

FavoritesNav.propTypes = {
	lists: PropTypes.array,
	onDeleteClick: PropTypes.func,
	onSubmit: PropTypes.func
};