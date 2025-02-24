import "./ActorPage.scss";
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
			<section className="ActorPage_info">
				<div>
					<img
						src={`https://image.tmdb.org/t/p/w300${actorDetails.profile_path}`}
						alt={`${actorDetails.name} photo`}
					/>
				</div>
				<div>
					<p className="text">{actorDetails.name}</p>
					<p className="text">{actorDetails.birthday}</p>
					<p className="text">{actorDetails.place_of_birth}</p>
					<p className="text">{actorDetails.biography}</p>
				</div>
			</section>
			<section className="ActorPage_movies">
				<ul className='list'>
					{actorDetails.movie_credits?.cast
						.filter((el) => el.poster_path !== null)
						.sort((a, b) => b.vote_count - a.vote_count)
						.map((movie) => {
							return (
								<li key={movie.id}>
									<Link
										key={movie.id}
										state={{ from: location }}
										to={`/movies/${movie.id}`}
									>
										<div>
											<img
												className="poster"
												src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
												alt={movie.original_title}
											/>
										</div>
										<p className="title">{movie.original_title}</p>
									</Link>
								</li>
							);
						})}
				</ul>
			</section>
		</>
	);
}

