import axios from "axios";

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjEzZGE5MGEzOWViYTQ0YzgyY2UzZGI2YmMzODI1NiIsIm5iZiI6MTY3MjQwOTkxMS45NjIsInN1YiI6IjYzYWVmMzM3NWFkNzZiMDA5NGM3NTliNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O7XeFTi3Y6f78Lj4PpbUGh74sMF0PPe1RkeK-cd9nis";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
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
	genres,
	vote_average,
	release_date_from,
	release_date_to,
	sort_by
) {
	const params = new URLSearchParams({
		include_video: false,
		include_adult: false,
	});
	
	const filters = {
		"primary_release_date.gte": release_date_from,
		"primary_release_date.lte": release_date_to,
		"vote_average.gte": vote_average,
		"with_genres": genres,
		"sort_by": sort_by,
	};
	
	Object.entries(filters).forEach(([key, value]) => {
		if (value) params.append(key, value);
	});
	
	return axios.get(`/discover/movie?page=${page}&${params}`);
}

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