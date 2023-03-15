const { Users, Orders } = require('../db');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const handleNewUser = async (req, res) => {
	const { fullName, first, last, email, password, guestId } = req.body;
	const guestCart = await Orders.findAll({
		where: {
			guestId: guestId,
			isCartItem: true,
			isCompleted: false
		}
	});
	const guestWishlist = await Orders.findAll({
		where: {
			guestId: guestId,
			isWishList: true,
			isCompleted: false
		}
	});
	if (!email || !password) {
		return res.status(400).json({
			message: 'Username and password are required.',
			'req.body': req.body
		});
	}
	// check for duplicate usernames in the db
	const duplicate = await Users.findOne({
		where: {
			email
		}
	});
	if (duplicate) return res.sendStatus(409); //Conflict
	try {
		console.log('top of try bracket');
		//encrypt the password
		const hashedPwd = await bcrypt.hash(password, 10);
		const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
		console.log('above Users.create()');
		await Users.create({
			fullName,
			fname: first,
			lname: last,
			email,
			password: hashedPwd,
			refreshToken
		});
		console.log('below Users.create()');
		const userCreated = await Users.findOne({
			where: {
				fname: first,
				email: email
			}
		});
		userCreated.isLoggedIn = true;
		await userCreated.save();
		const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
		// localStorage.setItem('accessToken', accessToken);
		if (guestWishlist) {
			guestWishlist.map((item) => {
				Orders.create({
					quantity: item.quantity,
					isWishList: item.isWishList,
					isCartItem: item.isCartItem,
					guestId: null,
					userId: userCreated.id,
					productId: item.productId
				});
			});
		}
		if (guestCart) {
			guestCart.map((item) => {
				Orders.create({
					quantity: item.quantity,
					isWishList: item.isWishList,
					isCartItem: item.isCartItem,
					guestId: null,
					userId: userCreated.id,
					productId: item.productId
				});
			});
		}
		await Orders.destroy({
			where: {
				guestId: req.body.guestId,
				isCompleted: false
			}
		});
		res.status(201).json({
			fullName: userCreated.fullName,
			firstName: userCreated.fname,
			lastName: userCreated.lname,
			email: userCreated.email,
			accessToken: accessToken,
			refreshToken: refreshToken,
			isAdmin: userCreated.isAdmin,
			isLoggedIn: true,
			userId: userCreated.id
		});
	} catch (err) {
		console.log('error in catch');
		res.status(500).json({ message: err.message });
	}
};

module.exports = { handleNewUser };
