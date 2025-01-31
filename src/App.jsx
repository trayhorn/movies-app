import NotFound from './pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout';
import { lazy } from "react";
import './App.css';
import ActorPage from './pages/ActorPage/ActorPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import SearchPage from './pages/SearchPage/SearchPage';
import WatchList from './pages/WatchList/WatchList';

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
	import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
	import("./components/MovieReviews/MovieReviews")
);


function App() {
  return (
		<Routes>
			<Route path="/" element={<SharedLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
					<Route path="cast" element={<MovieCast />} />
					<Route path="reviews" element={<MovieReviews />} />
				</Route>
				<Route path="/actors/:actorId" element={<ActorPage />} />
				<Route path="/favorites" element={<FavoritesPage />} />
				<Route path="/watchlist" element={<WatchList />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;


