const db = require('../db');
const Sequelize = require('sequelize');

const UserPaymentDetails = db.define('userPaymentDetail', {});

module.exports = UserPaymentDetails;
