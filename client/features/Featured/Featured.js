import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchAllProductsAsync } from "../../app/reducers/allProductsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../../app/reducers/allProductsSlice";
import { Link } from "react-router-dom";
import { addToWishlistAsync } from "../../app/reducers/wishListSlice";
import { addToCartAsync } from "../../app/reducers/cartSlice";

const Featured = () => {
	const [quantity, setQuantity] = useState(1);
	const [wishlistSuccess, setWishlistSuccess] = useState(false);
	const [addCartSuccess, setAddCartSuccess] = useState(false);
	const [pageMessage, setPageMessage] = useState("Loading...");
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const dispatch = useDispatch();
	const products = useSelector(selectAllProducts);
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
	useEffect(() => {
		dispatch(fetchAllProductsAsync());
		setTimeout(() => {
			setPageMessage("There are currently no featured products.");
		}, 3000);
		if (
			!sessionStorage.getItem("accessToken") &&
			!sessionStorage.getItem("guestId")
		) {
			sessionStorage.setItem("guestId", uuidv4());
		}
		console.log("featured use effect ran");
	}, []);

	const featuredProducts = (products) => {
		return products.slice(-15);
	};
	const slicedProducts = featuredProducts(products);

	return (
		<div>
			<div className="bodyContent">
				{addCartSuccess ? (
					<p className="fixedSuccessMessage">Added to cart!</p>
				) : null}
				{wishlistSuccess ? (
					<p className="fixedSuccessMessage">Added to wishlist!</p>
				) : null}
				<h1 className="header"> Featured</h1>
				<div className="productContainer">
					{slicedProducts.length
						? slicedProducts.map((product) => {
								return (
									<div className="singleProduct" key={product.id}>
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
								);
						  })
						: pageMessage}
				</div>
			</div>
		</div>
	);
};

export default Featured;
