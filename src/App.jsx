import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import Navigation from './components/Navigation/Navigation';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import NotFound from './pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {

  return (
		<>
			<header>
				<Navigation />
			</header>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
					<Route path="cast" element={<MovieCast />} />
					<Route path="reviews" element={<MovieReviews />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;


