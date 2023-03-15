import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchSingleProductAsync,
	selectProduct
} from "../../app/reducers/singleProductSlice";
import { addToWishlistAsync } from "../../app/reducers/wishListSlice";
import { addToCartAsync } from "../../app/reducers/cartSlice";
import { v4 as uuidv4 } from "uuid";
import ReviewSection from "../../app/components/Reviews/ReviewSection";

const SingleProduct = () => {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState("");
	const [newName, setNewName] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newPrice, setNewPrice] = useState(0);
	const [newImageUrl, setNewImageUrl] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [toggleSubmitted, setToggleSubmitted] = useState(false);
	const [wishlistSuccess, setWishlistSuccess] = useState(false);
	const [addCartSuccess, setAddCartSuccess] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const isAdmin = sessionStorage.getItem("isAdmin");
	const product = useSelector(selectProduct);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			newName === "" ||
			newDescription === "" ||
			newPrice === "" ||
			newImageUrl === "" ||
			newCategory === ""
		) {
			setError("Please fill out all fields and assure imageUrl is a valid URL");
			return;
		}
		await axios.put(`/api/products/${id}`, {
			newName,
			newDescription,
			newPrice,
			newImageUrl,
			newCategory
		});
		setToggleSubmitted(!toggleSubmitted);
	};

	const addToWishlist = async () => {
		isLoggedIn
			? dispatch(
					addToWishlistAsync({
						userId: sessionStorage.getItem("userId"),
						quantity,
						productId: product.id
					})
			  )
			: dispatch(
					addToWishlistAsync({
						guestId: sessionStorage.getItem("guestId"),
						quantity,
						productId: product.id
					})
			  );
		setWishlistSuccess(true);
		setTimeout(() => {
			setWishlistSuccess(false);
		}, 3000);
	};
	const addToCart = async () => {
		isLoggedIn
			? dispatch(
					addToCartAsync({
						userId: sessionStorage.getItem("userId"),
						quantity,
						productId: product.id
					})
			  )
			: dispatch(
					addToCartAsync({
						guestId: sessionStorage.getItem("guestId"),
						quantity,
						productId: product.id
					})
			  );
		setAddCartSuccess(true);
		setTimeout(() => {
			setAddCartSuccess(false);
		}, 3000);
	};
	useEffect(() => {
		dispatch(fetchSingleProductAsync(id));
	}, [toggleSubmitted]);

	useEffect(() => {
		setError("");
	}, [newName, newDescription, newPrice, newImageUrl, newCategory]);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return (
		<div>
			<p>
				Back to <Link to="/products">All Products</Link>
			</p>
			{isAdmin &&
			// currentUser.isAdmin
			editMode ? (
				<button
					onClick={(e) => setEditMode(!editMode)}
					className="btn btn-warning"
					type="button">
					Toggle user view mode
				</button>
			) : // currentUser.isAdmin
			isAdmin ? (
				<button
					className="btn btn-warning"
					type="button"
					onClick={(e) => setEditMode(!editMode)}>
					Toggle edit product mode
				</button>
			) : null}
			{isAdmin &&
			// currentUser.isAdmin
			editMode ? (
				<div>
					<h1>Edit Product</h1>
					{error !== "" ? (
						<p style={{ backgroundColor: "red" }}>{error}</p>
					) : null}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}>
						<label htmlFor="name">Name</label>
						<input
							placeholder="Game name..."
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<label htmlFor="Description">Description</label>
						<input
							placeholder="Description..."
							type="text"
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
						/>
						<label htmlFor="Price">Price</label>
						<input
							placeholder="Price..."
							type="number"
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
						/>
						<label htmlFor="imageUrl">imageUrl</label>
						<input
							placeholder="ImageUrl..."
							type="url"
							value={newImageUrl}
							onChange={(e) => setNewImageUrl(e.target.value)}
						/>
						<label>Category</label>
						<select onChange={(e) => setNewCategory(e.target.value)}>
							<option value="">Select Category...</option>
							<option value="XBOX">Xbox</option>
							<option value="Nintendo">Nintendo</option>
							<option value="PS5">PS5</option>
						</select>
						<button className="submitEditButton" type="submit">
							Submit
						</button>
					</form>
				</div>
			) : null}
			<div className="singleProduct">
				<h1>{product.name}</h1>
				<img className="singleProductImg" src={`${product.imageUrl}`} />
				<h3>Price: {product.price}</h3>
				<h5>{product.category}</h5>
				<p className="productDescription">{product.description}</p>
				<select defaultValue={1} onChange={(e) => setQuantity(e.target.value)}>
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
					<option value={6}>6</option>
					<option value={7}>7</option>
					<option value={8}>8</option>
					<option value={9}>9</option>
					<option value={10}>10</option>
				</select>
				{addCartSuccess ? (
					<h5 style={{ color: "green" }}>Added to cart!</h5>
				) : null}
				{wishlistSuccess ? (
					<h5 style={{ color: "green" }}>Added to wishlist!</h5>
				) : null}
				<button type="button" className="btn btn-success" onClick={addToCart}>
					Add to Cart
				</button>
				<button type="button" className="btn btn-light" onClick={addToWishlist}>
					Add to Wishlist
				</button>
				<br></br>
				<ReviewSection />
			</div>
		</div>
	);
};

export default SingleProduct;
