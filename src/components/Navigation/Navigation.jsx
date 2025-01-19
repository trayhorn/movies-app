import { NavLink } from "react-router-dom";

export default function Navigation() {
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
		</header>
	);
}