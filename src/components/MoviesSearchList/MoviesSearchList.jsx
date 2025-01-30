import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./MoviesSearchList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

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
						<li className={style.galleryItem} key={movie.id}>
							<Link
								to={`/movies/${movie.id}`}
								state={{ from: location }}
								className={style.link}
							>
								<div className={style.posterContainer}>
									<img
										className={style.poster}
										src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
										alt={movie.title}
									/>
								</div>
								<p className={style.movieTitle}>{movie.title}</p>
							</Link>
						</li>
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
