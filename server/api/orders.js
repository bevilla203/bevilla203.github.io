const { Orders } = require('../db');
const router = require('express').Router();

// '/' is mounted on '/orders' already.
router.get('/', async (req, res) => {
	try {
		const cart = await Orders.findAll({
			where: {
				isCompleted: false
			}
		});
		res.send(cart);
	} catch (e) {
		console.log(e);
	}
});

router.get('/history', async (req, res) => {
	try {
		const history = Orders.findAll({
			where: {
				isCompleted: true
			}
		});
		res.send(history);
	} catch (e) {
		console.log(e);
	}
});

router.put('/', async (req, res) => {
	try {
		console.log('req.body.guestId: ', req.body.guestId);
		let orders;
		req.body.userId
			? (orders = await Orders.findAll({
					where: {
						userId: req.body.userId,
						isCompleted: false
					}
			  }))
			: (orders = await Orders.findAll({
					where: {
						guestId: req.body.guestId,
						isCompleted: false
					}
			  }));
		orders.forEach(async (product) => {
			product.isCompleted = true;
			await product.save();
		});
		res.sendStatus(200);
	} catch (e) {
		console.log('ERROR IN CATCH OF ORDERS PUT ROUTE: ', e);
	}
});

module.exports = router;
