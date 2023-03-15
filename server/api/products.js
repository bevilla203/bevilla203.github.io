const { Products } = require("../db/models");
const router = require("express").Router();
const getToken = require("./utils/game");
require("dotenv").config();
const axios = require("axios");

// all "/products" routes go here
router.get("/", async (req, res) => {
	try {
		const allProducts = await Products.findAll();
		res.send(allProducts);
	} catch (e) {
		console.log(e);
	}
});

router.get("/:productId", async (req, res) => {
	try {
		const product = await Products.findByPk(req.params.productId);
		res.send(product);
	} catch (e) {
		console.log(e);
	}
});

router.delete("/:productId", async (req, res) => {
	try {
		await Products.destroy({
			where: {
				id: req.params.productId
			}
		});
		const allProducts = await Products.findAll();
		res.send(allProducts);
	} catch (e) {
		console.log(e);
	}
});

router.put("/:productId", async (req, res) => {
	try {
		const { newName, newDescription, newPrice, newImageUrl, newCategory } =
			req.body;
		const product = await Products.findOne({
			where: {
				id: req.params.productId
			}
		});
		product.name = newName;
		product.description = newDescription;
		product.price = newPrice;
		product.imageUrl = newImageUrl;
		product.category = newCategory;
		await product.save();
		res.send(product);
	} catch (e) {
		console.log('ERROR IN CATCH OF ROUTER.PUT("/:PRODUCTID")', e);
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, description, price, imageUrl, category } = req.body;
		await Products.create({
			name,
      description,
      price,
			imageUrl,
			category
		});
		const updated = await Products.findAll();
		res.send(updated);
	} catch (e) {
		console.log("error in catch of post (add product) backend catch: ", e);
	}
});

// router.post("/:productId", async (req, res) => {
// 	try {
//     const { quantity, wishList, userId } = req.body
//     const product = await Products.findByPk(req.params.productId);
//     wishList
// 			? await Orders.create({
// 					quantity,
// 					isCompleted: false,
// 					isWishList: true,
// 					productId: product.id,
// 					userId
// 			  })
// 			: await Orders.create({
// 					quantity,
// 					isCompleted: false,
// 					isWishList: false,
// 					productId: product.id,
//           userId
// 			  });
//         res.sendStatus(200);
// 	} catch (e) {
// 		console.log("error in catch of post route to add to cart backend catch: ", e);
// 	}
// });


// router.use((req, res, next) => {
// 	const error = new Error("Not Found");
// 	console.log(error)
// 	error.status = 404;
// 	next(error);
// });

module.exports = router;
