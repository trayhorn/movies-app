import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

export default function Header() {
	return (
		<header>
			<nav>
				<NavLink className="navLink" to="/">
					Home
				</NavLink>
				<NavLink className="navLink" to="/movies">
					Movies
				</NavLink>
				<NavLink className="navLink" to="/favorites">
					Favorites
				</NavLink>
			</nav>

			<SearchForm />
		</header>
	);
}