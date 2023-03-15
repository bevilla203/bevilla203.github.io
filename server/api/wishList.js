const { Orders } = require("../db");

const router = require("express").Router();

// '/' is mounted on '/wishlist'
router.get("/", async (req, res) => {
	try {
		let list;
		req.query.userId
			? (list = await Orders.findAll({
					where: {
						isWishList: true,
						userId: req.query.userId
					}
			  }))
			: (list = await Orders.findAll({
					where: {
						isWishList: true,
						guestId: req.query.guestId
					}
			  }));
		res.send(list);
	} catch (e) {
		console.log(e);
	}
});

// adding item to orders table as a wishList item
router.post("/", async (req, res) => {
	try {
		let createdItem;
		req.body.userId
			? (createdItem = await Orders.create({
					quantity: req.body.quantity,
					isWishList: true,
					productId: req.body.productId,
					userId: req.body.userId,
					guestId: null
			  }))
			: (createdItem = await Orders.create({
					quantity: req.body.quantity,
					isWishList: true,
					productId: req.body.productId,
					guestId: req.body.guestId,
					userId: null
			  }));
		res.send(createdItem);
	} catch (e) {
		console.log("ERROR IN POST WISHLIST ROUTE: ", e);
	}
});

router.delete("/", async (req, res) => {
	try {
		req.body.userId
			? (item = await Orders.findOne({
					where: {
						productId: req.body.productId,
						userId: req.body.userId,
						isWishList: true
					}
			  }))
			: (item = await Orders.findOne({
					where: {
						productId: req.body.productId,
						guestId: req.body.guestId,
						isWishList: true
					}
			  }));
		item.isWishList = false;
		await item.save();
		!item.isCompleted && !item.isCartItem ? await item.destroy() : null;
		let newWishlist;
		req.body.userId
			? newWishlist = await Orders.findAll({
					where: {
						isWishList: true,
                        userId: req.body.userId
					}
			  })
			: newWishlist = await Orders.findAll({
					where: {
						isWishList: true,
                        guestId: req.body.guestId
					}
			  });
		res.send(newWishlist);
	} catch (e) {
		console.log("ERROR IN CATCH OF WISHLIST DELETE ROUTE: ", e);
	}
});

module.exports = router;
