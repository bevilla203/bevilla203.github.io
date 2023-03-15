import React from "react";
// my hope is to add this to the homepage... but adding it to
// Home.js will make it display on every page
const Homebody = () => {
	let homePageData = [
		{
			name: "product1",
			price: "$19.99"
		},
		{
			name: "product2",
			price: "$69.99"
		},
		{
			name: "product3",
			price: "$99.99"
		},
		{
			name: "product4",
			price: "$32.99"
		},
		{
			name: "product5",
			price: "$96.34"
		},
		{
			name: "product6",
			price: "$26.99"
		}
	];
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return (
		<div className="productContainer">
			{homePageData.length
				? homePageData.map((item) => {
						return (
							<div className="productCard">
								{item.name}
								<br></br>
								{item.price}
							</div>
						);
				  })
				: "nope"}
		</div>
	);
};

export default Homebody;
