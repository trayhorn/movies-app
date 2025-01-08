import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import NotFound from './pages/NotFound/NotFound';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

function App() {

  return (
		<>
			<header>
				<nav>
					<NavLink className="navLink" to={"/"}>
						Home
					</NavLink>
					<NavLink className="navLink" to={"/movies"}>
						Movies
					</NavLink>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
					<Route path="cast" element={<div>This is Cast</div>} />
					<Route path="reviews" element={<div>This is reviews</div>} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;


