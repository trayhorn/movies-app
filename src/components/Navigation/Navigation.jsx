import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
		<nav>
			<NavLink className="navLink" to={"/"}>
				Home
			</NavLink>
			<NavLink className="navLink" to={"/movies"}>
				Movies
			</NavLink>
		</nav>
	);
}