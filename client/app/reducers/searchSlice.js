import { createSlice } from "@reduxjs/toolkit";

const initialState = [""];

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		addSearchQuery: (state, action) => {
			state[0] = action.payload;
		}
	}
});

export const selectSearchState = (state) => state.search;
export const { addSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
