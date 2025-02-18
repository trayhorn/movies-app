import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./MoviesSearchList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchListItem from "../SearchListItem/SearchListItem";
import { useEffect } from "react";

export default function MoviesSearchList({ moviesToRender, fetchMore, hasMore, genresList }) {
	const location = useLocation();

	useEffect(() => {
		if (!location.state) {
			return;
		}

		const movieId = location.state.movieIdfrom;
		document
			.getElementById(movieId)
			.scrollIntoView({ behavior: "instant", block: "center" });
	}, [location.state]);


	return (
		<ul className={style.gallery}>
			<InfiniteScroll
				dataLength={moviesToRender.length}
				next={fetchMore}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				scrollThreshold="100px"
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{moviesToRender.map((movie) => {
					return (
						<SearchListItem
							key={movie.id}
							movie={movie}
							location={location}
							genresList={genresList}
						/>
					);
				})}
			</InfiniteScroll>
		</ul>
	);
}

MoviesSearchList.propTypes = {
	moviesToRender: PropTypes.arrayOf(PropTypes.shape),
	fetchMore: PropTypes.func,
	hasMore: PropTypes.bool,
	genresList: PropTypes.arrayOf(PropTypes.shape)
};
