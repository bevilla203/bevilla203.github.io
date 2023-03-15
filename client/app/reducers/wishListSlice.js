import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../features/api/axios";

const initialState = [];

export const fetchWishlistProductsAsnyc = createAsyncThunk(
	"fetchWishlistProductsAsnyc",
	async () => {
		try {
			const { data } = await axios.get("/api/wishlist");
			return data;
		} catch (error) {
			console.lo(error);
		}
	}
);

export const addToWishlistAsync = createAsyncThunk(
	"addToWishList",
	async ({ userId, quantity, productId, guestId }) => {
		try {
			let response;
			userId
				? (response = await axios.post("/api/wishList", {
						userId,
						quantity,
						productId
				  }))
				: (response = await axios.post("/api/wishList", {
						guestId,
						quantity,
						productId
				  }));

			return response.data;
		} catch (e) {
			console.log("ERROR IN CATCH OF ADDTOWISHLISTASYNC THUNK: ", e);
		}
	}
);

export const removeFromWishlistAsync = createAsyncThunk(
	"removeFromWishlist",
	async ({ productId, userId }) => {
		const { data } = await axios.delete("/api/wishList", {
			productId,
			userId
		});
		return data;
	}
);

const wishlistSlice = createSlice({
	name: "wishlist",
	initialState,
	reducers: {
		addToWishlistAsGuest: (state, action) => {
			state.push(action.payload);
		},
		removeFromWishlistAsGuest: (state, action) => {
			state = state.filter((product) => product.id !== action.payload);
		},
		renewUsersWishlist: (state, action) => {
			state.push(action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(addToWishlistAsync.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
			return action.payload;
		});
	}
});

export const selectWishlist = (state) => state.wishlist;
export const {
	addToWishListAsGuest,
	removeFromWishlistAsGuest,
	renewUsersWishlist
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
