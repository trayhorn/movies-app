import PropTypes from "prop-types";
import "./FavoritesNav.scss";
import { NavLink } from "react-router-dom";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";


export default function FavoritesNav({ onDeleteClick, onSubmit, lists }) {
	const [addList, setAddlist] = useState(false);

	const handleSubmit = (e) => {
		onSubmit(e);
		setAddlist(false);
	}

	return (
		<nav aria-label="favorites-nav" className="favorites-nav">
			{lists.length > 0 ? (
				<ul className="list">
					<li className="list-item">
						<NavLink className="navlink" to="/favorites" end>
							All
						</NavLink>
					</li>
					{lists.map((el) => {
						return (
							<li key={el.id} className="list-item">
								<NavLink className="navlink" to={`lists/${el.id}`}>
									{el.name}
								</NavLink>
								<div className="remove-icon_container">
									<RxCross2
										className="remove-icon icon"
										onClick={() => onDeleteClick(el.id)}
									/>
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<div>No collections yet</div>
			)}
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