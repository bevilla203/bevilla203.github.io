import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create async thunk that makes axios get request to retrieve all users
// protected route - admin only

export const getAllUsersAsync = createAsyncThunk(
	"get/allUsers",
	async (isAdmin) => {
		try {
			const response = await axios.get("/api/allusers", {
				params: {
					isAdmin
				}
			});
			return response.data;
		} catch (e) {
			console.log();
		}
	}
);

export const addNewUserAsync = createAsyncThunk(
	"addNewUser",
	async ({ fname, lname, email, password, isAdmin }) => {
		try {
			const { data } = await axios.post(`/api/allusers`, {
				fname,
				lname,
				email,
				password,
				isAdmin
			});
			return data;
		} catch (e) {
			console.log(e);
		}
	}
);

export const updateExistingUserAsync = createAsyncThunk(
	"updateExistingUser",
	async ({ id, fname, lname, email, password, isAdmin }) => {
		try {
			const { data } = await axios.put(`/api/allusers/${id}`, {
				fname,
				lname,
				email,
				password,
				isAdmin
			});
			return data;
		} catch (e) {
			console.error(e);
		}
	}
);

const initialState = [];

const usersListSlice = createSlice({
	name: "usersList",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
			return action.payload;
		});
		builder.addCase(addNewUsersAsync.fulfilled, (state, action) => {
			state.push(action.payload);
		});
	}
});

export const selectAllUsers = (state) => state.usersList;
export default usersListSlice.reducer;
