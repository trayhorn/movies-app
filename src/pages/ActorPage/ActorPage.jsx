import style from './ActorPage.module.css';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getActorDetails } from '../../api';

export default function ActorPage() {
  const [actorDetails, setActorDetails] = useState([]);
  const location = useLocation();

  const { actorId } = useParams();

  useEffect(() => {
		getActorDetails(actorId)
			.then((res) => setActorDetails(res.data))
			.catch((e) => console.log(e));
  }, [actorId]);

  return (
		<>
			<section className={style.actorInfoSection}>
				<div className={style.imageContainer}>
					<img
						className={style.image}
						src={`https://image.tmdb.org/t/p/w300${actorDetails.profile_path}`}
						alt={`${actorDetails.name} photo`}
					/>
				</div>
				<div className={style.actorInfo}>
					<p className={style.actorText}>{actorDetails.name}</p>
					<p className={style.actorText}>{actorDetails.birthday}</p>
					<p className={style.actorText}>{actorDetails.place_of_birth}</p>
					<p className={style.actorText}>{actorDetails.biography}</p>
				</div>
			</section>
			<section className={style.actorMoviesSection}>
				<ul className={style.actorMoviesList}>
					{actorDetails.movie_credits?.cast
						.filter((el) => el.poster_path !== null)
						.sort((a, b) => b.vote_count - a.vote_count)
						.map((movie) => {
							return (
								<Link
									key={movie.id}
									state={{ from: location }}
									to={`/movies/${movie.id}`}
								>
									<div>
										<img
											src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
											alt={movie.original_title}
										/>
									</div>
									<p className={style.movieTitle}>{movie.original_title}</p>
								</Link>
							);
            })
          }
				</ul>
			</section>
		</>
	);
}

