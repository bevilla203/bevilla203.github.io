import React from "react";
const sampleReviews = [
	{
		reviewId: 1,
		userName: "pauperpeep304",
		content:
			"Great game. Unique design of antmospere. Enjoyable gameplay. You should buy it and each of your freands)"
	},
	{
		reviewId: 2,
		userName: "Fredrrrick",
		content:
			"Игра классная. Боевка супер, атмосфера, музыка на высшем уровне. Рекомендую к покупке"
	},
	{
		reviewId: 3,
		userName: "gamefr3@k109",
		content: `Such a stylish and mind-blowing project! It hasn't been like this for a long time. Amazing optimization and attention to detail. There are flaws, but they can be forgiven, because this is the debut of a new studio.`
	}
];
const Reviews = () => {
	return (
		<div>
			{sampleReviews.map((review) => (
				<div className="review">
					<h4>{review.userName}</h4>
					<p>{review.content}</p>
				</div>
			))}
			{/* {sampleReviews.length > 0
        ? sampleReviews.map((review) => {<div> {review.userName} </div>})
        : 'Be the first to review this product!'} */}
		</div>
	);
};

export default Reviews;
