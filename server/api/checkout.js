const router = require('express').Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post('/', async (req, res) => {
	try {
		const lineItems = req.body.cart.map((obj) => {
			return {
				price_data: {
					currency: 'usd',
					product_data: {
						name: obj.name
					},
					unit_amount: Math.round(obj.price * 100)
				},
				quantity: obj.quantity
			};
		});
		const userEmail = req.body.email;
		if (userEmail) {
			const session = await stripe.checkout.sessions.create({
				customer_email: userEmail,
				payment_method_types: ["card"],
				mode: "payment",
				line_items: lineItems,
				shipping_address_collection: {
					allowed_countries: ["US"]
				},
				//! change to deployed address later
				success_url: "http://localhost:8080/success",
				cancel_url: "http://localhost:8080/cancel"
			});
			res.json({
				sessionUrl: session.url
			});
		} else {
			const session = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				mode: 'payment',
				line_items: lineItems,
				shipping_address_collection: {
					allowed_countries: ['US']
				},
				success_url: 'http://localhost:8080/success',
				cancel_url: 'http://localhost:8080/cart'
			});
			res.json({
				sessionUrl: session.url
			});
		}
	} catch (e) {
		console.log('some error');
		console.log(e);
	}
});

module.exports = router;
