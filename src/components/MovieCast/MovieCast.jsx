import { getMovieCast } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from './MovieCast.module.css';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const {movieId} = useParams();

  useEffect(() => {
    getMovieCast(movieId)
			.then((res) => setCast(res.data.cast))
			.catch((e) => console.log(e));
	}, [movieId]);

  return (
		<ul className={style.castGallery}>
      {cast.filter(el => el.profile_path !== null).map(({ id, name, profile_path }) => {
        return (
					<li className={style.actorCard} key={id}>
						<div>
              <img
                className={style.actorPoster}
								src={`https://image.tmdb.org/t/p/w200${profile_path}`}
								alt=""
							/>
						</div>
						<p className={style.actorName}>{name}</p>
					</li>
				);
      })}
    </ul>
    
	);
}