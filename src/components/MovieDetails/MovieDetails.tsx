import './MovieDetails.scss';
import useWatchList from '../../hooks/useWatchList';
import useFavorites from '../../hooks/useFavorites';
import { MovieDetailsType, Video } from '../../types/types';
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";

type movieDetailsType = {
	detailsToRender: MovieDetailsType
};

export default function MovieDetails({ detailsToRender }: movieDetailsType) {
	const {
		id,
		poster_path,
		original_title,
		overview,
		budget,
		genres,
		release_date,
		videos,
	} = detailsToRender;

	const { isInFavorites, handleFavorite } = useFavorites(id);
	const { inWatchList, handleWatchList } = useWatchList(id);

	const trailer =
		videos.results.find((el: Video) => el.name === "Official Trailer") ||
		videos.results.filter((el: Video) => el.type === "Trailer")[0] ||
		videos.results[0];

	return (
		<div className="detailsContainer">
			<div className="poster_wrapper">
				<img
					src={`https://image.tmdb.org/t/p/w400${poster_path}`}
					alt="poster"
				/>
				<button
					className="poster_button favorite"
					onClick={() => handleFavorite(id)}
				>
					<span className='tooltip'>
						{isInFavorites ? "Remove from" : "Add to"} favorites
					</span>
					{isInFavorites ? (
						<FaHeartBroken className="icon" size={30} />
					) : (
						<FaHeart className="icon" size={30} />
					)}
				</button>
				<button
					className="poster_button watchlist"
					onClick={() => handleWatchList(id)}
				>
					<span className="tooltip">
						{inWatchList ? "Remove from" : "Add to"} watchlist
					</span>
					{inWatchList ? (
						<MdBookmarkRemove className="icon" size={30} />
					) : (
						<MdBookmarkAdd className="icon" size={30} />
					)}
				</button>
			</div>
			<div className="overviewContainer">
				<h1>{original_title}</h1>
				<p>{overview}</p>
				<p>Budget: {Number(budget) / 100}</p>
				<p>Genres: {genres?.map((el) => el.name).join(", ")}</p>
				<p>Release date: {release_date}</p>

				<iframe
					className="player"
					title="movie trailer"
					allow="fullscreen"
					src={`https://www.youtube.com/embed/${trailer?.key}`}
				></iframe>
			</div>
		</div>
	);
}