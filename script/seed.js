'use strict';
const igdb = require('./igdb.js');
const { db } = require('../server/db');

const users = [
	{
		fullName: 'John Doe',
		email: 'user1@test.com',
		password: 'password123',
		fname: 'John',
		lname: 'Doe',
		isAdmin: false,
		isLoggedIn: false
	},
	{
		fullName: 'Jane Doe',
		email: 'admin@test.com',
		password: '123password',
		fname: 'Jane',
		lname: 'Doe',
		isAdmin: true,
		isLoggedIn: false
	}
];

const possiblePrices = [39.99, 44.99, 49.99, 59.99, 69.99];

const products = igdb.map((product) => ({
	name: product.name,
	description: product.summary || 'no description',
	price: possiblePrices[Math.floor(Math.random() * possiblePrices.length)],
	imageUrl: product.screenshots ? `https:${product.screenshots[0].url}` : 'default_image_url',
	category: product.platforms ? product.platforms.map((platform) => platform.name).join(', ') : ''
}));

// const products = [
//   {

//     name: 'Call of Duty',
//     description: 'This is product 1',
//     price: 9.99,
//     imageUrl: 'https://via.placeholder.com/150',
//     category: 'XBOX'
//   },
//   {
//     name: 'Capstone Game',
//     description: 'This is product 2',
//     price: 19.99,
//     imageUrl: 'https://via.placeholder.com/150',
//     category: 'PS5'
//   },
//   {
//     name: 'Cap toss',
//     description: 'This is product 3',
//     price: 29.99,
//     imageUrl: 'https://via.placeholder.com/150',
//     category: 'Nintendo'
//   },
//   {
//     name: 'Random game',
//     description: 'This is product 4',
//     price: 14.99,
//     imageUrl: 'https://via.placeholder.com/150',
//     category: 'Nintendo'
//   },
// ]

const addresses = [
	{
		streetAddress: '123 Main St',
		city: 'San Diego',
		state: 'CA',
		zip: 12345,
		userId: 1
	},
	{
		streetAddress: '456 Broadway Ave',
		city: 'New York',
		state: 'NY',
		zip: 67890,
		userId: 2
	},
	{
		streetAddress: '789 Elm St',
		city: 'Orlando',
		state: 'FL',
		zip: 23456,
		userId: 2
	}
];

// const reviews = [
//   {
//     rating: 5,
//     comment: "Terrible",
//     userId: 1,
//     productId: 1,
//   },
//   {
//     rating: 3,
//     comment: "Awesome",
//     userId: 1,
//     productId: 2,
//   },
//   {
//     rating: 1,
//     comment: "Useful",
//     userId: 2,
//     productId: 3,
//   },
// ];

module.exports = {
	products,
	users,
	// reviews,
	addresses
};
