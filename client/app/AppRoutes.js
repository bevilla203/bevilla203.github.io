import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../features/auth/SignUp";
import Home from "../features/home/Home";
import ShoppingCart from "../features/shoppingCart/ShoppingCart";
import Wishlist from "../features/Wishlist/Wishlist";
import Featured from "../features/Featured/Featured";
import Login from "../features/auth/Login";
import AllProducts from "../features/allProducts/allProducts";
import CheckoutSuccess from "../features/checkout/CheckoutSuccess";
import SingleProduct from "../features/singleProduct/singleProduct";
import UsersList from "../features/admin/UsersList";

const AppRoutes = () => {
	return (
		<div>
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route to="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/cart" element={<ShoppingCart />} />
				<Route path="/wishlist" element={<Wishlist />} />
				<Route path="/featured" element={<Featured />} />
				<Route path="/products" element={<AllProducts />} />
				<Route path="/success" element={<CheckoutSuccess />} />
				<Route path="/products/:id" element={<SingleProduct />} />
				<Route path="/allusers" element={<UsersList />} />
			</Routes>
		</div>
	);
};

export default AppRoutes;
