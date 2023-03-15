import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllUsersAsync,
	selectAllUsers,
	addNewUserAsync,
	updateExistingUserAsync
} from "../../app/reducers/usersListSlice";
import { v4 as uuidv4 } from "uuid";

const UsersList = () => {
	const isLoggedIn = sessionStorage.getItem("accessToken") ? true : false;
	const isAdmin = sessionStorage.getItem("isAdmin");
	const [editMode, setEditMode] = useState(false);
	const [filtered, setFiltered] = useState([]);
	const [toggleSubmitted, setToggleSubmitted] = useState(false);
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const [usersList, setUsersList] = useState([]);
	const [addFName, setFName] = useState("");
	const [addLName, setLName] = useState("");
	const [addEmail, setEmail] = useState("");
	const [addPassword, setPassword] = useState("");
	const [adminRole, setAdminRole] = useState("");
	const [editUser, setEditUser] = useState(null);

	console.log("isAdmin: ", isAdmin);
	const getUsers = () => {
		dispatch(getAllUsersAsync(isAdmin)).then(() => {
			setFiltered(allUsers);
		});
	};

	useEffect(() => {
		getUsers();
	}, []);

	// not sure if this use effect will run too late. may get the "no current users are signed up..." even though the state really does have the user info in there
	const allUsers = useSelector(selectAllUsers);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editMode && editUser) {
			dispatch(
				updateExistingUserAsync({
					id: editUser.id,
					fname: addFName,
					lname: addLName,
					email: addEmail,
					password: addPassword,
					isAdmin: adminRole
				})
			);
		} else {
			dispatch(
				addNewUserAsync({
					fname: addFName,
					lname: addLName,
					email: addEmail,
					password: addPassword,
					isAdmin: adminRole
				})
			);
		}
		setToggleSubmitted(!toggleSubmitted);
		setFName("");
		setLName("");
		setEmail("");
		setPassword("");
		setAdminRole(false);
		setEditMode(false);
		setEditUser(null);
	};

	//   useEffect(() => {
	//   dispatch(getAllUsersAsync());
	//   console.log('toggleSubmitted: ', toggleSubmitted)
	//   console.log('useEffect Ran')
	//   filter();
	// }, [usersList, toggleSubmitted]);
	// useEffect(() => {
	//   setError('');
	// }, [addFName, addLName, addEmail, adminRole]);

	const handleEdit = (user) => {
		setEditMode(true);
		setEditUser(user);
		setFName(user.fname);
		setLName(user.lname);
		setEmail(user.email);
		setPassword(user.password);
		setAdminRole(user.isAdmin);
	};

	return (
		<div>
			<h2>All Users</h2>
			{allUsers &&
				isLoggedIn &&
				isAdmin &&
				(filtered.length > 0 ? filtered : allUsers).map((user) => (
					<div key={user.id}>
						<div>Name: {user.fullName ? user.fullName : null}</div>
						<div>Email: {user.email}</div>
						{editMode && editUser && editUser.id === user.id ? (
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									placeholder="First Name"
									value={addFName}
									onChange={(e) => setFName(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Last Name"
									value={addLName}
									onChange={(e) => setLName(e.target.value)}
								/>
								<input
									type="email"
									placeholder="Email"
									value={addEmail}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<input
									type="password"
									placeholder="Password"
									value={addPassword}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label>
									Admin:
									<input
										type="checkbox"
										checked={addAdminRole}
										onChange={(e) => setAdminRole(e.target.checked)}
									/>
								</label>
								<button type="submit">Save Changes</button>
							</form>
						) : (
							<button onClick={() => handleEdit(user)}>Edit User</button>
						)}
					</div>
				))}
		</div>
	);
};

export default UsersList;
