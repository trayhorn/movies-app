import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import NotFound from './pages/NotFound/NotFound';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {

  return (
		<>
			<header>
				<Link to={"/"}>Home</Link>
				<Link to={"/movies"}>Movies</Link>
			</header>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path='/movies/:movieId' element={<MovieDetailsPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;


