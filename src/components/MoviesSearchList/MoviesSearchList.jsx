import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./MoviesSearchList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchListItem from "../SearchListItem/SearchListItem";

export default function MoviesSearchList({ moviesToRender, fetchMore, hasMore }) {
	const location = useLocation();

	return (
		<ul className={style.gallery}>
			<InfiniteScroll
				dataLength={moviesToRender.length}
				next={fetchMore}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				scrollThreshold="100px"
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>}
			>
				{moviesToRender.map((movie) => {
					return (
						// <li key={movie.id}>
						// 	<Link
						// 		to={`/movies/${movie.id}`}
						// 		state={{ from: location }}
						// 		className={style.galleryItem}
						// 	>
						// 		<div className={style.posterContainer}>
						// 			<img
						// 				className={style.poster}
						// 				src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
						// 				alt={movie.title}
						// 			/>
						// 		</div>
						// 		<div className={style.infoContainer}>
						// 			<p className={style.movieTitle}>{movie.title}</p>
						// 			<p className={style.overview}>{movie.overview}</p>
						// 			<p>Release date {movie.release_date}</p>
						// 			<p className={style.rating}>
						// 				Rating {movie.vote_average}
						// 			</p>
						// 			<p>Votes {movie.vote_count}</p>
						// 		</div>
						// 	</Link>
						// </li>
						<SearchListItem key={movie.id} movie={movie} location={location} />
					);
				})}
			</InfiniteScroll>
		</ul>
	);
}

MoviesSearchList.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
	fetchMore: PropTypes.func,
	hasMore: PropTypes.bool
};
