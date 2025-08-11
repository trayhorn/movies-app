import NotFound from './pages/NotFound/NotFound';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './components/SharedLayout.tsx';
import { lazy } from "react";
import './App.css';
import ActorPage from './pages/ActorPage/ActorPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import SearchPage from './pages/SearchPage/SearchPage';
import WatchList from './pages/WatchList/WatchList';
import { ListDetails } from './components/Lists/ListDetails';

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.tsx"));
const MovieDetailsPage = lazy(() =>
	import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast.tsx"));
const MovieReviews = lazy(() =>
	import("./components/MovieReviews/MovieReviews.tsx")
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
				<Route path="/favorites" element={<FavoritesPage />}>
					<Route path="lists/:listId" element={<ListDetails />} />
				</Route>
				<Route path="/watchlist" element={<WatchList />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;