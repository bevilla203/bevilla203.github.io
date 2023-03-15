import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { logout } from '../../app/store';
// import { logout } from "../../app/reducers/userSlice";
import { MDBCol, MDBRow } from "mdbreact";
import Button from "react-bootstrap/Button";
import { addSearchQuery } from "../../app/reducers/searchSlice";
// import { selectUser } from "../../app/reducers/userSlice";
import { v4 as uuidv4 } from "uuid";

const Navbar = () => {
	const [status, setStatus] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const isAdmin = sessionStorage.getItem("isAdmin");
	const logoutAndRedirectHome = () => {
		sessionStorage.removeItem("accessToken");
		sessionStorage.removeItem("isAdmin");
		sessionStorage.removeItem("userId");
		sessionStorage.removeItem("firstName");
		sessionStorage.removeItem("lastName");
		sessionStorage.removeItem("email");
		setStatus(!status);
		navigate("/login");
	};

	useEffect(() => {
		dispatch(addSearchQuery(searchInput));
	}, [searchInput]);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	useEffect(() => {
		isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	}, [status]);
	return (
		<div>
			<div className="navbar">
				<MDBCol md="2">
					<Link to="/home">
						<img src="/logo-nobckgrnd.png" className="logo" />
					</Link>
				</MDBCol>
				<MDBCol md="7">
					<input
						className="form-control searchBar"
						type="text"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder="Search for a title..."
						aria-label="Search"
					/>
				</MDBCol>

				<MDBCol md="1">
					<Button variant="light" className="search">
						Search
					</Button>
				</MDBCol>

				<MDBCol md="2">
					<nav>
						{/* // isLoggedIn ?  */}
						<div className="navButtons">
							{/* The navbar will show these links after you log in */}
						</div>
						<div>
							{/* The navbar will show these links before you log in */}
							{!isLoggedIn ? (
								<div>
									<Link
										style={{ textDecoration: "none", color: "white" }}
										className="link"
										to="/login">
										Login
									</Link>
									<Link
										style={{ textDecoration: "none", color: "white" }}
										className="link"
										to="/signup">
										Sign Up
									</Link>
								</div>
							) : (
								<button
									className="btn btn-danger"
									// style={{
									// 	textDecoration: "none",
									// 	color: "white",
									// 	border: "none",
									// 	backgroundColor: "#2B3467"
									// }}
									type="button"
									onClick={logoutAndRedirectHome}>
									Logout
								</button>
							)}
							{isAdmin ? (
								<Link
									style={{ textDecoration: "none", color: "yellow" }}
									className="link"
									to="/allusers">
									All Users
								</Link>
							) : null}
							<Link to="/cart">
								<img
									style={{ width: "30px", height: "auto" }}
									src="/cart.png"
								/>
							</Link>
							<Link to="/wishlist">Wishlist</Link>
						</div>
					</nav>
				</MDBCol>
			</div>
		</div>
	);
};

export default Navbar;
