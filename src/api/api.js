import axios from "axios";
import { TOKEN, BASE_URL } from "./token.js";


axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = TOKEN;

export function getPopularMovies() {
  return axios.get("/movie/popular");
}

export function getSearchedMovies(query) {
  return axios.get(`/search/movie?query=${query}`);
}

export function getMovieDetails(movieId) {
  return axios.get(`/movie/${movieId}?append_to_response=videos`);
}

export function getMovieCast(movieId) {
  return axios.get(`movie/${movieId}/credits`);
}

export function getMovieReviews(movieId) {
  return axios.get(`movie/${movieId}/reviews`);
}

export function getActorDetails(actorId) {
  return axios.get(`/person/${actorId}?append_to_response=movie_credits`);
}

export function getAllGenres() {
	return axios.get("/genre/movie/list");
}

export function discoverMovie(
	page,
	formValues
) {
	const params = new URLSearchParams({
		include_video: false,
		include_adult: false,
	});

	const filters = {
		"primary_release_date.gte": formValues.release_date_from,
		"primary_release_date.lte": formValues.release_date_to,
		"vote_average.gte": formValues.vote_average,
		'with_genres': formValues.genres,
		'sort_by': formValues.sort_by,
	};


	Object.entries(filters).forEach(([key, value]) => {
		if (value) params.append(key, value);
	});

	return axios.get(`/discover/movie?page=${page}&${params}`);
}

// Favorites

export function getFavoriteMovies(account_id) {
	return axios.get(`/account/${account_id}/favorite/movies`)
}

export function addToFavorites(movie_id) {
  const body = {
		media_id: movie_id,
		media_type: "movie",
		favorite: true
	};
  return axios.post(`/account/16758631/favorite`, body);
}

export function removeFromFavorites(movie_id) {
	const body = {
		media_id: movie_id,
		media_type: "movie",
		favorite: false,
	};
	return axios.post(`/account/16758631/favorite`, body);
}

// Watchlist

export function getWatchlistMovies(account_id) {
	return axios.get(`/account/${account_id}/watchlist/movies`);
}

export function addToWatchList(movie_id) {
	const body = {
		media_type: "movie",
		media_id: movie_id,
		watchlist: true,
	};
	return axios.post(`/account/16758631/watchlist`, body);
}

export function removeFromWatchList(movie_id) {
	const body = {
		media_type: "movie",
		media_id: movie_id,
		watchlist: false,
	};
	return axios.post(`/account/16758631/watchlist`, body);
}

// LISTS

export function getAccountLists() {
	return axios.get(
		"/account/{account_id}/lists?session_id=097b4027d9a0d1aea55e20084d7c5af44e44a96f"
	);
}

export function createList(name) {
	const body = {
		name,
		language: "en",
		description: "",
	};

	return axios.post(
		`/list?session_id=097b4027d9a0d1aea55e20084d7c5af44e44a96f`,
		body
	);
}

export function deleteList(list_id) {
	return axios.delete(
		`/list/${list_id}?session_id=097b4027d9a0d1aea55e20084d7c5af44e44a96f`
	);
}

export function getListDetails(list_id) {
	return axios.get(`/list/${list_id}`);
}

export function addMovieToList(list_id, media_id) {
	const body = { media_id };
	return axios.post(`/list/${list_id}/add_item`, body);
}

export function removeMovieFromList(list_id, media_id) {
	const body = { media_id };
	return axios.post(`/list/${list_id}/remove_item`, body);
}