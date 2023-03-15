const router = require("express").Router();
const { Orders } = require("../db");

router.get("/", async (req, res) => {
	try {
		console.log("req.query.guestId: ", req.query.guestId);
		let list;
		req.query.userId
			? (list = await Orders.findAll({
					where: {
						isCompleted: false,
						userId: req.query.userId,
						guestId: null,
						isCartItem: true
					}
			  }))
			: (list = await Orders.findAll({
					where: {
						isCompleted: false,
						guestId: req.query.guestId,
						userId: null,
						isCartItem: true
					}
			  }));
		res.send(list);
	} catch (e) {
		console.log("ERROR IN CATCH OF CART GET ROUTE: ", e);
	}
});

router.post("/", async (req, res) => {
	try {
		// const { quantity, productId, userId, guestId } = req.body;
		let created;
		req.body.userId
			? (created = await Orders.create({
					quantity: req.body.quantity,
					productId: req.body.productId,
					userId: req.body.userId,
					isCartItem: true
			  }))
			: (created = await Orders.create({
					quantity: req.body.quantity,
					productId: req.body.productId,
					guestId: req.body.guestId,
					isCartItem: true
			  }));
		res.send(created);
	} catch (e) {
		console.log("ERROR IN POST CART ROUTE: ", e);
	}
});

router.delete("/", async (req, res) => {
	try {
		let item;
		if (req.body.userId) {
			item = await Orders.findOne({
				where: {
					productId: req.body.productId,
					userId: req.body.userId,
					isCartItem: true
				}
			});
		} else if (req.body.guestId) {
			item = await Orders.findOne({
				where: {
					productId: req.body.productId,
					guestId: req.body.guestId,
					isCartItem: true
				}
			});
		}
		item.isCartItem = false;
		await item.save();
		if (!item.isCompleted && !item.isWishList) {
			await item.destroy();
		}
		let newCart;
		req.body.userId
			? (newCart = await Orders.findAll({
					where: {
						isCartItem: true,
						userId: req.body.userId
					}
			  }))
			: (newCart = await Orders.findAll({
					where: {
						isCartItem: true,
						guestId: req.body.guestId
					}
			  }));
		res.send(newCart);
	} catch (e) {
		console.log("ERROR IN CATCH OF CART DELETE ROUTE: ", e);
	}
});

module.exports = router;
