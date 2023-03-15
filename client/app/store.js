import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allProductsReducer from "./reducers/allProductsSlice";
import singleProductReducer from "./reducers/singleProductSlice";
import searchString from "../app/reducers/searchSlice";
import wishlistReducer from "../app/reducers/wishListSlice";
import cartReducer from "../app/reducers/cartSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		allProducts: allProductsReducer,
		singleProduct: singleProductReducer,
		search: searchString,
		wishlist: wishlistReducer,
		cart: cartReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
export * from "../features/auth/authSlice";
