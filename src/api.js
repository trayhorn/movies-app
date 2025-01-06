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

