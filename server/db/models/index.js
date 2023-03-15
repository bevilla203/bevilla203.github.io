const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const UserAddresses = require('./userAddress');

// import all models

// define relationships here

Products.hasMany(Orders, {
  foreignKey: 'productId',
  constraints: false
});
Products.hasMany(Reviews, {
  foreignKey: 'productId',
  constraints: false
});

Users.hasMany(Orders, {
  foreignKey: 'userId',
  constraints: false
});
Users.belongsTo(UserAddresses);
Users.hasMany(Reviews, {
  foreignKey: 'userId',
  constraints: false
});

UserAddresses.hasMany(Users);

Orders.belongsTo(Users, {
  foreignKey: 'userId',
  constraints: false
});

Orders.hasMany(Products);
// Orders.belongsTo(Products)


Reviews.belongsTo(Users);
Reviews.belongsTo(Products);

module.exports = {
  Users,
  Products,
  Reviews,
  Orders,
  UserAddresses
};
