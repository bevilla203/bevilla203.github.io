import React from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";

const ReviewSection = () => {
	return (
		<div>
			<hr />
			<h1>Reviews</h1>
			<h2>Average Rating</h2>
			<div className="reviewSection">
				<div className="rating">
					<span className="fa fa-star checked"></span>
					<span className="fa fa-star checked"></span>
					<span className="fa fa-star checked"></span>
					<span className="fa fa-star"></span>
					<span className="fa fa-star"></span>
					<span className="emo"> </span>
				</div>
			</div>
			<ReviewForm />
			<Reviews />
		</div>
	);
};

export default ReviewSection;
