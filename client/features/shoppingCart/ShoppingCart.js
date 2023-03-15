import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axios";
import {
	fetchAllProductsAsync,
	selectAllProducts
} from "../../app/reducers/allProductsSlice";
// import { selectUser } from "../../app/reducers/userSlice";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ShoppingCart = () => {
	const [deletionSuccess, setDeletionSuccess] = useState(false);
	let isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const [cart, setCart] = useState([]);
	const [pageMessage, setPageMessage] = useState("Loading...");
	let runningTotal = 0;
	const products = useSelector(selectAllProducts);
	const dispatch = useDispatch();

	let userEmail = null;
	const userToken = sessionStorage.getItem("accessToken");
	if (userToken) {
		userEmail = sessionStorage.getItem("email");
	}

	const handleCheckout = async () => {
		try {
			await axios
				.post(
					"/api/checkout",
					{
						cart: stripeItems,
						email: userEmail
					},
					{
						headers: {
							"Access-Control-Allow-Origin": "*"
						}
					}
				)
				.then((response) => {
					if (response.data.sessionUrl) {
						window.location.replace(response.data.sessionUrl); // Forwarding user to Stripe
					}
				});
		} catch (e) {
			console.log(e);
		}
	};
	const deleteCartItem = async (id) => {
		let response;
		isLoggedIn
			? (response = await axios.delete("/api/cart", {
					data: {
						userId: sessionStorage.getItem("userId"),
						productId: id
					}
			  }))
			: (response = await axios.delete("/api/cart", {
					data: {
						guestId: sessionStorage.getItem("guestId"),
						productId: id
					}
			  }));
		setCart(response.data);
		setDeletionSuccess(true);
		setTimeout(() => {
			setDeletionSuccess(false);
		}, 3000);
	};
	useEffect(() => {
		setTimeout(() => {
			setPageMessage("There are no items in your cart!");
		}, 1000);
		const getCart = async () => {
			let data;
			isLoggedIn
				? (data = await axios.get("/api/cart", {
						params: {
							userId: sessionStorage.getItem("userId")
						}
				  }))
				: (data = await axios.get("/api/cart", {
						params: {
							guestId: sessionStorage.getItem("guestId")
						}
				  }));
			setCart(data.data);
		};
		getCart();
		dispatch(fetchAllProductsAsync());
	}, []);
	const stripeItems = cart.map((item) => {
		const product = products.find((product) => product.id === item.productId);
		const price = parseFloat(product.price);
		return {
			id: item.productId,
			name: product.name,
			imageUrl: product.imageUrl,
			price: price,
			quantity: item.quantity
		};
	});
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);

	return (
		<div className="cartContainer">
			{deletionSuccess ? (
				<h5 style={{ color: "green" }}>Item deleted!</h5>
			) : null}
			<h1 className="header"> Cart</h1>
			<div>
				{cart[0] ? (
					cart.map((item) =>
						products
							? products.map((product) =>
									item.productId === product.id ? (
										<div className="cartItem">
											<h3>{product.name}</h3>
											<img src={product.imageUrl} />
											<h5>${product.price}</h5>
											<h5>Quantity: {item.quantity}</h5>
											<p className="priceCalc">
												{
													(runningTotal =
														runningTotal + product.price * item.quantity)
												}
											</p>
											<button
												type="button"
												className="btn btn-danger removeCartItem"
												onClick={() => {
													deleteCartItem(item.productId);
												}}>
												Remove Item
											</button>
										</div>
									) : null
							  )
							: null
					)
				) : (
					<h2>{pageMessage}</h2>
				)}
			</div>

			<div className="cartBody">
				<div className="cartSummary">
					<h2>
						Order Summary <br />
					</h2>
					<hr />
					<h2>Subtotal: ${runningTotal.toFixed(2)}</h2>
				</div>
				<hr />
				{cart[0] ? (
					<Button
						className="coButton"
						variant="primary"
						size="lg"
						onClick={handleCheckout}>
						Proceed to checkout
					</Button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
