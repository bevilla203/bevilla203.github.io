const Sequelize = require('sequelize')
const db = require('../db');
const Products = require('./products');
const Users = require('./users');

const Orders = db.define('order', {
  // needs... junction table? for storing multiple products in one order
  dateCompleted: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isWishList: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isCartItem: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  guestId: {
    type: Sequelize.STRING,
    allowNull: true
  }
});



module.exports = Orders