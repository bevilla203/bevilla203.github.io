import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleProductAsync = createAsyncThunk(
	"getSingleProduct",
	async (productId) => {
		console.log("productId in fetchSingleProductAsync: ", productId);
		try {
			const { data } = await axios.get(`/api/products/${productId}`);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

const initialState = {};

const singleProductSlice = createSlice({
	name: "singleProduct",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
			return action.payload;
		});
	}
});

export const selectProduct = (state) => {
	return state.singleProduct;
};

export default singleProductSlice.reducer;
