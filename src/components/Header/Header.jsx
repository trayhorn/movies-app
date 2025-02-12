import { NavLink } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

export default function Header() {
	return (
		<header>
			<nav aria-label="main-nav">
				<NavLink className="navLink" to="/">
					Home
				</NavLink>
				<NavLink className="navLink" to="/movies">
					Movies
				</NavLink>
				<NavLink className="navLink" to="/favorites">
					Favorites
				</NavLink>
				<NavLink className="navLink" to="/watchlist">
					Watchlist
				</NavLink>
			</nav>

			<SearchBox />
		</header>
	);
}
