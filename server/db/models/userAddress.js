const db = require('../db');
const Sequelize = require('sequelize');

const UserAddresses = db.define('userAddress', {
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 99999,
      min: 00000,
      isNumeric: true,
      isDecimal: false,
      isInt: true,
      notEmpty: true
    }
  },
});

module.exports = UserAddresses;
