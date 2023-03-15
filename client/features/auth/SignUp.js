import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../../app/reducers/userSlice";
import { Link } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { setToken } from './signUpSlice';
// import { authenticate } from './authSlice';
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const [email, setEmail] = useState("");
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [password, setPassword] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	// const dispatch = useDispatch();

	const signUp = async (e) => {
		e.preventDefault();
		if (password !== confirmedPassword) {
			return setError("Passwords do not match");
		}
		try {
			setError("");
			const response = await axios.post(
				"/api/signup",
				{
					fullName: first + " " + last,
					first,
					last,
					email,
					password,
					guestId: sessionStorage.getItem("guestId")
				},
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true
				}
			);
			sessionStorage.setItem("accessToken", response?.data?.accessToken);
			sessionStorage.setItem("isAdmin", response?.data?.isAdmin);
			sessionStorage.setItem("userId", response?.data?.userId);
			sessionStorage.setItem("firstName", response?.data?.firstName);
			sessionStorage.setItem("lastName", response?.data?.lastName);
			sessionStorage.setItem("email", response?.data?.email);
			sessionStorage.removeItem("guestId");
			// setSuccess(true);
			setEmail("");
			setPassword("");
			setConfirmedPassword("");
			window.location.replace("/home");
		} catch (e) {
			setError(e.toString());
		}
	};
	const isDisabled = email && password && password === confirmedPassword;
	useEffect(() => {
		setError("");
	}, [email, password, confirmedPassword]);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return (
    <div className="bodyContent">
      {
        // success ? (
        // 	<div>
        // 		<h1>Thanks for signing up!</h1>
        // 		<h3>You are now logged in</h3>
        // 		<p>
        // 			Go to <Link to="/home">Home</Link>
        // 		</p>
        // 	</div>
        // ) : (
        <div className="signUpPage">
          <h1 className="header">Sign Up</h1>
          {error && <h4 style={{ color: 'red' }}>Error: {error}</h4>}
          <form onSubmit={signUp}>
            <div className="form-group">
              <label htmlFor="first">First Name</label>
              <input
                className="form-control w-50"
                id="first"
                placeholder="First name..."
                value={first}
                type="text"
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last">Last Name</label>
              <input
                className="form-control w-50"
                id="last"
                placeholder="Last name..."
                value={last}
                type="text"
                onChange={(e) => {
                  setLast(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control w-50"
                id="email"
                placeholder="Email..."
                value={email}
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="form-control w-50"
                id="password"
                placeholder="Password..."
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmedPassword">Confirm Password</label>
              <input
                className="form-control w-50"
                id="confirmedPassword"
                placeholder="Confirm password..."
                value={confirmedPassword}
                type="password"
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                }}
              />
            </div>
            <button
              disabled={!isDisabled}
              className="btn btn-success"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      }
    </div>
  );
};

export default SignUp;
