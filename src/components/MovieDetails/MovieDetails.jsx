import style from './MovieDetails.module.css';
import PropTypes from 'prop-types';

export default function MovieDetails({ detailsToRender }) {
  const {
		poster_path,
		original_title,
		overview,
		budget,
		genres,
		release_date,
		videos,
  } = detailsToRender;

  const trailer =
		videos.results.find((el) => el.name === "Official Trailer") ||
		videos.results.filter((el) => el.type === "Trailer")[0] ||
		videos.results[0];

	return (
		<div className={style.detailsContainer}>
			<div>
				<img
					src={`https://image.tmdb.org/t/p/w400${poster_path}`}
					alt="poster"
				/>
			</div>
			<div className={style.overviewContainer}>
				<h1>{original_title}</h1>
				<p>{overview}</p>
				<p>Budget: {budget / 100}</p>
				<p>Genres: {genres?.map((el) => el.name).join(", ")}</p>
				<p>Release date: {release_date}</p>

				<iframe
					className={style.player}
					title="movie trailer"
					allow="fullscreen"
					src={`https://www.youtube.com/embed/${trailer.key}`}
				></iframe>
			</div>
		</div>
	);
}

MovieDetails.propTypes = {
	detailsToRender: PropTypes.shape({
		poster_path: PropTypes.string,
		original_title: PropTypes.string,
		budget: PropTypes.number,
		genres: PropTypes.array,
		release_date: PropTypes.string,
		overview: PropTypes.string,
		videos: PropTypes.object,
	}),
};