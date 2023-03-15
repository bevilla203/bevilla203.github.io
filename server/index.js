require('dotenv').config;
const PORT = process.env.PORT || 8080;
const app = require('./app');
const db = require('./db/db');
const { Users, Products, Orders, Reviews, UserAddresses } = require('./db/models');
const {
	products,
	users,
	// reviews,
	addresses
} = require('../script/seed');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const syncDb = async () => {
	try {
		await db.sync({ force: true });
		products.map((product) => {
			Products.create({
				name: product.name,
				description: product.description,
				price: product.price,
				category: product.category
			});
		});
		users.map((user) => {
			Users.create({
				fullName: user.fullName,
				fname: user.fname,
				lname: user.lname,
				email: user.email,
				password: bcrypt.hash(user.password, 10).toString(),
				refreshToken: jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET),
				isAdmin: user.isAdmin,
				isLoggedIn: user.isLoggedIn
			});
		});
		// reviews.map((review) => {
		// 	Reviews.create({
		// 		rating: review.rating,
		// 		comment: review.comment,
		// 		userId: review.userId,
		// 		productId: review.productId
		// 	});
		// });
		addresses.map((add) => {
			UserAddresses.create({
				streetAddress: add.streetAddress,
				city: add.city,
				state: add.state,
				zip: add.zip,
				userId: add.userId
			});
		});

		console.log('SUCCESS, db has been synced and seeded');
	} catch (e) {
		console.log('ERROR IN CATCH OF syncDb FUNCTION: ', e);
	}
};
syncDb();

app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
