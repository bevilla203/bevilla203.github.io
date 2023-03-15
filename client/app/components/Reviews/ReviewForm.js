import React from "react";

const ReviewForm = () => {
	return (
		<div>
			<textarea
				maxLength="280"
				placeholder="How was your experience?"
				className="commentArea w-100"></textarea>
			<br></br>
			<button type="button" className="btn btn-light">
				Add Review
			</button>
		</div>
	);
};

export default ReviewForm;
