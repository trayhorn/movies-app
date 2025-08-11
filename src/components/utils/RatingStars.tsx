import PropTypes from "prop-types";
import "./RatingStars.scss";

export default function RatingStars({ rating }: {rating: number}) {
  return (
		<>
			<div className="star-rating" data-rating={rating / 2}>
				<figure></figure>
				<span>{rating.toFixed(2)}</span>
			</div>
		</>
	);
}

RatingStars.propTypes = {
	rating: PropTypes.number
};