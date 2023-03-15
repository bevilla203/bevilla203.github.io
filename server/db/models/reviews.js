const Sequelize = require('sequelize');
const db = require('../db');

const Reviews = db.define('review', {
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true,
            isDecimal: false,
            max: 5,
            min: 0
        }
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
});

module.exports = Reviews;