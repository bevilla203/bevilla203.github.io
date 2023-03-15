import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../app/reducers/userSlice";
import { v4 as uuidv4 } from "uuid";
/**
 * COMPONENT
 */
const Home = () => {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	// const username = useSelector((state) => state.auth.me.username);
	// const user = useSelector(selectUser);
	let firstName = sessionStorage.getItem("firstName");
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, [isLoggedIn]);
	console.log("isLoggedIn: ", isLoggedIn);
	console.log("firstName: ", firstName);
	return (
		<div className="welcomeSign">
			{firstName ? (
				<h1>
					Welcome{" "}
					{firstName.split("")[0].toUpperCase() +
						firstName.split("").slice(1).join("")}
					!
				</h1>
			) : (
				<h1>Welcome! Login For Special Deals</h1>
			)}
			<br />
			<br />
			<br />
			<br />
		</div>
	);
};

export default Home;
