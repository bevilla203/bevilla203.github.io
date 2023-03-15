// const router = require("express").Router();
// require("dotenv").config();
// const axios = require("axios");

// all "/products" routes go here
// router.get("/", (req, res) => {
//   return axios({
//     url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//     },
//   })
//     .then((results) => {
//       return axios({
//         url: "https://api.igdb.com/v4/games",
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Client-ID": process.env.CLIENT_ID,
//           Authorization: `Bearer ${results.data.access_token}`,
//         },
//         data: `fields name, first_release_date, summary, platforms, category, genres, category, cover, rating, rating_count, screenshots.*; limit 15; where`,
//       });
//     })
//     .then((response) => {
//       res.json({ data: response.data });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.send("Error");
//     });
// });