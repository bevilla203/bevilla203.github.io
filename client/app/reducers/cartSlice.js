import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../features/api/axios";

export const fetchUsersCartAsync = createAsyncThunk(
	"fetchCartAsync",
	async () => {
		try {
			const { data } = await axios.get(`/api/cart`);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const addToCartAsync = createAsyncThunk(
	"addToCartAsync",
	async ({ userId, quantity, productId, guestId }) => {
		try {
			let response;
			userId
				? (response = await axios.post("/api/cart", {
						userId,
						quantity,
						productId
				  }))
				: (response = await axios.post("/api/cart", {
						guestId,
						quantity,
						productId
				  }));

			return response.data;
		} catch (e) {
			console.log("ERROR IN CATCH OF ADDTOCART THUNK: ", e);
		}
	}
);

export const removeFromCartAsync = createAsyncThunk(
	"removeFromCartAsync",
	async ({ productId, userId }) => {
		try {
			const { data } = await axios.delete(`/api/cart`, {
				productId,
				userId
			});
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

const initialState = [];

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCartAsGuest: (state, action) => {
			state.push(action.payload);
		},
		deleteCartItemAsGuest: (state, action) => {
			state = state.filter((product) => product.id !== action.payload);
		},
		renewUsersCart: (state, action) => {
			state.push(action.payload);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsersCartAsync.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
			return action.payload;
		});
	}
});

export const selectCart = (state) => {
	return state.cart;
};

export const { addToCartAsGuest, deleteCartItemAsGuest, renewUsersCart } =
	cartSlice.actions;
export default cartSlice.reducer;
