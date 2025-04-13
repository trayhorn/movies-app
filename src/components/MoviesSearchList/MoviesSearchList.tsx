import { Location, useLocation } from "react-router-dom";
import style from "./MoviesSearchList.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchListItem from "../SearchListItem/SearchListItem";
import { useEffect, useRef } from "react";
import { MovieToRender, Genre } from "../../types/types";

type MoviesSearchListType = {
	moviesToRender: MovieToRender[];
	fetchMore: () => void;
	hasMore: boolean;
	genresList: Genre[];
};

export default function MoviesSearchList({
	moviesToRender,
	fetchMore,
	hasMore,
	genresList,
}: MoviesSearchListType) {
	const location: Location = useLocation();

	useEffect(() => {
		if (!location.state) {
			return;
		}

		const movieId = location.state.movieIdfrom;
		const element = document.getElementById(movieId);

		element?.scrollIntoView({ behavior: "instant", block: "center" });
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
