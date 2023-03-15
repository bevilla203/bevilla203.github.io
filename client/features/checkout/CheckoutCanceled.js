import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function CheckoutCanceled() {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return <h1>Your order has been canceled.</h1>;
}
//! MAY NEED TO ADD SPACE FOR FOOTER TO RENDER BETTER

export default CheckoutCanceled;
