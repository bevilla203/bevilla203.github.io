import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProductsAsync = createAsyncThunk(
	"getProducts",
	async () => {
		try {
			const { data } = await axios.get(`/api/products`);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);

export const addNewProductAsync = createAsyncThunk(
	"addNewProduct",
	async ({ name, imageUrl, price, description }) => {
		try {
			const { data } = await axios.post(`/api/products`, {
				name,
				description,
				price,
				imageUrl,
				category
			});
			return data;
		} catch (e) {
			console.log(e);
		}
	}
);

const initialState = [];

export const allProductsSlice = createSlice({
	name: "allProducts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(addNewProductAsync.fulfilled, (state, action) => {
			state.push(action.payload);
		});
	}
});

export const selectAllProducts = (state) => {
	return state.allProducts;
};

export default allProductsSlice.reducer;
