import { IoStarOutline, IoStar } from "react-icons/io5";
import PropTypes from "prop-types";

export default function RatingStars({ rating }) {
	let width = 0;
	if (rating > 0 && rating <= 2) {
		width = 20;
	} else if (rating > 2 && rating <= 4) {
		width = 40;
	} else if (rating > 4 && rating <= 6) {
		width = 60;
	} else if (rating > 6 && rating <= 8) {
		width = 80;
	} else if (rating > 8 && rating <= 10) {
		width = 100;
	} else {
		width = 0;
	}	

  const incompleteStarIndex = width / 20;

  return (
		<>
			<div className="stars-container">
				<div className="empty-stars-container">
					<IoStarOutline size="1.5rem" color="#FFB400" />
					<IoStarOutline size="1.5rem" color="#FFB400" />
					<IoStarOutline size="1.5rem" color="#FFB400" />
					<IoStarOutline size="1.5rem" color="#FFB400" />
					<IoStarOutline size="1.5rem" color="#FFB400" />
				</div>
				<div className="full-stars-container" style={{ width: width + '%' }}>
					{[...Array(5)].map((_, i) => {
						return (
							<IoStar
								key={i}
								size="1.5rem"
								color="#FFB400"
								className="star"
								style={i + 1 === incompleteStarIndex && { clipPath: "inset(0 50% 0 0)" }}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

RatingStars.propTypes = {
	rating: PropTypes.number
};