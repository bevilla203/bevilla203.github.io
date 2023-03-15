import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllProductsAsync,
	selectAllProducts
} from "../../app/reducers/allProductsSlice";
import { selectSearchState } from "../../app/reducers/searchSlice";
import { addToWishlistAsync } from "../../app/reducers/wishListSlice";
import { addToCartAsync } from "../../app/reducers/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// TODO: add form for admin to add a product

const AllProducts = () => {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const isAdmin = sessionStorage.getItem("isAdmin");
	const [editMode, setEditMode] = useState(false);
	const [category, setCategory] = useState("");
	const [filtered, setFiltered] = useState([]);
	const [updatedProducts, setUpdatedProducts] = useState([]);
	const [addedName, setAddedName] = useState("");
	const [addedDescription, setAddedDescription] = useState("");
	const [addedPrice, setAddedPrice] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [addedImageUrl, setAddedImageUrl] = useState("");
	const [addedCategory, setAddedCategory] = useState("");
	const [toggleSubmitted, setToggleSubmitted] = useState(false);
	const [wishlistSuccess, setWishlistSuccess] = useState(false);
	const [addCartSuccess, setAddCartSuccess] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	// const products = useSelector(selectAllProducts);
	const search = useSelector(selectSearchState)[0];
	const addToWishlist = (id, quantity) => {
		isLoggedIn
			? dispatch(
					addToWishlistAsync({
						userId: sessionStorage.getItem("userId"),
						quantity: quantity,
						productId: id
					})
			  )
			: dispatch(
					addToWishlistAsync({
						guestId: sessionStorage.getItem("guestId"),
						quantity: quantity,
						productId: id
					})
			  );
		setWishlistSuccess(true);
		setTimeout(() => {
			setWishlistSuccess(false);
		}, 3000);
		setQuantity(1);
	};
	const addToCart = (id, quantity) => {
		isLoggedIn
			? dispatch(
					addToCartAsync({
						userId: sessionStorage.getItem("userId"),
						quantity: quantity,
						productId: id
					})
			  )
			: dispatch(
					addToCartAsync({
						guestId: sessionStorage.getItem("guestId"),
						quantity: quantity,
						productId: id
					})
			  );
		setAddCartSuccess(true);
		setTimeout(() => {
			setAddCartSuccess(false);
		}, 3000);
		setQuantity(1);
	};
	const filter = () => {
		const filtered = products.filter((product) =>
			product.category.includes(category)
		);
		setFiltered(filtered);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			addedName === "" ||
			addedDescription === "" ||
			addedPrice === 0 ||
			addedImageUrl === "" ||
			addedCategory === ""
		) {
			setError(
				"Please fill out all fields and assure image URL is a valid URL"
			);
			return;
		}
		await axios.post("/api/products", {
			name: addedName,
			description: addedDescription,
			price: addedPrice,
			imageUrl: addedImageUrl,
			category: addedCategory
		});
		setToggleSubmitted(!toggleSubmitted);
	};
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
		filter();
	}, [updatedProducts, category, toggleSubmitted]);
	const products = useSelector(selectAllProducts);
	useEffect(() => {
		setError("");
	}, [addedName, addedDescription, addedPrice, addedImageUrl, addedCategory]);
	useEffect(() => {
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
	}, []);
	return (
		<div className="productContainer productContainerAllProductsEdit">
			{addCartSuccess ? (
				<p className="fixedSuccessMessage">Added to cart!</p>
			) : null}
			{wishlistSuccess ? (
				<p className="fixedSuccessMessage">Added to wishlist!</p>
			) : null}
			{isAdmin && editMode ? (
				<button
					className="btn btn-warning"
					type="button"
					onClick={(e) => setEditMode(!editMode)}>
					Toggle User Mode
				</button>
			) : isAdmin ? (
				<button
					className="btn btn-warning"
					type="button"
					onClick={(e) => setEditMode(!editMode)}>
					Toggle Admin Mode
				</button>
			) : null}
			{isAdmin && editMode ? (
				<div className="addProductForm">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(e);
						}}>
						<h3>Add Product</h3>
						{error !== "" ? (
							<p style={{ backgroundColor: "red" }}>{error}</p>
						) : null}
						<label htmlFor="name">Name</label>
						<input
							placeholder="Game name..."
							type="text"
							value={addedName}
							onChange={(e) => setAddedName(e.target.value)}
						/>
						<label htmlFor="Description">Description</label>
						<input
							placeholder="Description..."
							type="text"
							value={addedDescription}
							onChange={(e) => setAddedDescription(e.target.value)}
						/>
						<label htmlFor="Price">Price</label>
						<input
							placeholder="Price..."
							type="number"
							value={addedPrice}
							onChange={(e) => setAddedPrice(e.target.value)}
						/>
						<label htmlFor="imageUrl">imageUrl</label>
						<input
							placeholder="ImageUrl..."
							type="url"
							value={addedImageUrl}
							onChange={(e) => setAddedImageUrl(e.target.value)}
						/>
						<label>Category</label>
						<select onChange={(e) => setAddedCategory(e.target.value)}>
							<option value="">Select Category...</option>
							<option value="Xbox">Xbox</option>
							<option value="Nintendo">Nintendo</option>
							<option value="PlayStation">PlayStation</option>
							<option value="GameCube">GameCube</option>
							<option value="PC">PC</option>
							<option value="Wii">Wii</option>
							<option value="IOS">IOS</option>
							<option value="Mac">Mac</option>
						</select>
						<button type="submit">Add</button>
					</form>
				</div>
			) : null}
			<div className=" allProductsHeader">
				<h1>Products</h1>
				<select
					className="selectCategory"
					defaultValue=""
					onChange={(e) => setCategory(e.target.value)}>
					<option value="">Select Category...</option>
					<option value="Xbox">Xbox</option>
					<option value="Nintendo">Nintendo</option>
					<option value="PlayStation">PlayStation</option>
					<option value="GameCube">GameCube</option>
					<option value="PC">PC</option>
					<option value="Wii">Wii</option>
					<option value="iOS">iOS</option>
					<option value="Mac">Mac</option>
				</select>
			</div>
			{(filtered[0] && search !== "") || category !== ""
				? filtered?.map((product) =>
						product.name.toLowerCase().includes(search) ||
						product.name.toUpperCase().includes(search) ? (
							<div className="singleProduct">
								{isAdmin && editMode ? (
									<button
										className="btn btn-danger"
										type="submit"
										onClick={async (e) => {
											e.preventDefault();
											await axios
												.delete(`/api/products/${product.id}`)
												.then((res) => {
													setUpdatedProducts(res.data);
												});
											console.log(updatedProducts);
										}}>
										X
									</button>
								) : null}
								<h3>
									<Link to={`/products/${product.id}`}>{product.name}</Link>
								</h3>
								<img className="singleProductImg" src={product.imageUrl} />
								<h6>{product.price}</h6>
								<h6>Category: {product.category}</h6>

								<select
									defaultValue={1}
									onChange={(e) => setQuantity(e.target.value)}>
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
								<button
									type="button"
									className="btn btn-success"
									onClick={() => {
										addToCart(product.id, quantity);
									}}>
									Add to Cart
								</button>
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										addToWishlist(product.id, quantity);
									}}>
									Add to Wishlist
								</button>
							</div>
						) : null
				  )
				: !filtered[0] && search !== "" && category === ""
				? products?.map((product) =>
						product.name.toLowerCase().includes(search) ||
						product.name.toUpperCase().includes(search) ? (
							<div className="singleProduct">
								{isAdmin && editMode ? (
									<button
										className="btn btn-danger"
										type="submit"
										onClick={async (e) => {
											e.preventDefault();
											await axios
												.delete(`/api/products/${product.id}`)
												.then((res) => {
													setUpdatedProducts(res.data);
												});
											console.log(updatedProducts);
										}}>
										X
									</button>
								) : null}
								<h3>
									<Link to={`/products/${product.id}`}>{product.name}</Link>
								</h3>
								<img className="singleProductImg" src={product.imageUrl} />
								<h6>{product.price}</h6>
								<h6>Category: {product.category}</h6>

								<select
									defaultValue={1}
									onChange={(e) => setQuantity(e.target.value)}>
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
								<button
									type="button"
									className="btn btn-success"
									onClick={() => {
										addToCart(product.id, quantity);
									}}>
									Add to Cart
								</button>
								<button
									type="button"
									className="btn btn-light"
									onClick={() => {
										addToWishlist(product.id, quantity);
									}}>
									Add to Wishlist
								</button>
							</div>
						) : null
				  )
				: (filtered[0] && search === "") || category !== ""
				? filtered?.map((product) => (
						<div className="singleProduct">
							{isAdmin && editMode ? (
								<button
									className="btn btn-danger"
									type="submit"
									onClick={async (e) => {
										e.preventDefault();
										await axios
											.delete(`/api/products/${product.id}`)
											.then((res) => {
												setUpdatedProducts(res.data);
											});
										console.log(updatedProducts);
									}}>
									X
								</button>
							) : null}
							<h3>
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</h3>
							<img className="singleProductImg" src={product.imageUrl} />
							<h6>{product.price}</h6>
							<h6>Category: {product.category}</h6>

							<select
								defaultValue={1}
								onChange={(e) => setQuantity(e.target.value)}>
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
							<button
								type="button"
								className="btn btn-success"
								onClick={() => {
									addToCart(product.id, quantity);
								}}>
								Add to Cart
							</button>
							<button
								type="button"
								className="btn btn-light"
								onClick={() => {
									addToWishlist(product.id, quantity);
								}}>
								Add to Wishlist
							</button>
						</div>
				  ))
				: products.map((product) => (
						<div className="singleProduct">
							{isAdmin && editMode ? (
								<button
									className="btn btn-danger"
									type="submit"
									onClick={async (e) => {
										e.preventDefault();
										await axios
											.delete(`/api/products/${product.id}`)
											.then((res) => {
												setUpdatedProducts(res.data);
											});
										console.log(updatedProducts);
									}}>
									X
								</button>
							) : null}
							<h3>
								<Link to={`/products/${product.id}`}>{product.name}</Link>
							</h3>
							<img className="singleProductImg" src={product.imageUrl} />
							<h6>{product.price}</h6>
							<h6>Category: {product.category}</h6>

							<select
								defaultValue={1}
								onChange={(e) => setQuantity(e.target.value)}>
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
							<button
								type="button"
								className="btn btn-success"
								onClick={() => {
									addToCart(product.id, quantity);
								}}>
								Add to Cart
							</button>
							<button
								type="button"
								className="btn btn-light"
								onClick={() => {
									addToWishlist(product.id, quantity);
								}}>
								Add to Wishlist
							</button>
						</div>
				  ))}
		</div>
	);
};

export default AllProducts;
