import "./ActorPage.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getActorDetails } from "../../api/api";
import { ActorDetailsType } from "../../types/types";
import MoviesList from "../../components/MoviesList/MoviesList";

export default function ActorPage() {
	const [actorDetails, setActorDetails] = useState<ActorDetailsType | null>(null);

	const { actorId } = useParams();

	const actorsMovies = actorDetails?.movie_credits.cast
		.filter((el) => el.poster_path !== null)
		.sort((a, b) => b.vote_count - a.vote_count);

	useEffect(() => {
		getActorDetails(actorId)
			.then((res) => setActorDetails(res.data))
			.catch((e) => console.log(e));
	}, [actorId]);

	return (
		<>
			{actorDetails && (
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
			)}
			<section>
				{actorsMovies && <MoviesList moviesToRender={actorsMovies} />}
			</section>
		</>
	);
}