import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function CheckoutSuccess() {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;

	useEffect(() => {
		const completeOrder = async () => {
			let data;
			isLoggedIn
				? (data = await axios.put("/api/orders", {
						userId: sessionStorage.getItem("userId")
				  }))
				: (data = await axios.put("/api/orders", {
						guestId: sessionStorage.getItem("guestId")
				  }));
			return data;
		};
		completeOrder();
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);

	return (
		<div>
			<h1>Thank you for your order!</h1>
			<Link to={`/home`}>Continue Shopping</Link>
		</div>
	);
}
//! MAY NEED TO ADD SPACE FOR FOOTER TO RENDER BETTER
export default CheckoutSuccess;
