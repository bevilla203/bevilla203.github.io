require('dotenv').config()
const axios = require('axios');
const router = require("express").Router();

let accessToken

const getToken = () => {
  return axios.post(process.env.GET_TOKEN, {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'client_credentials',
  })
  .then((response) => {
    console.log(`Status: ${response.status}`);
    console.log(response.data);
    accessToken = response.data.access_token
    return accessToken
  })
  .catch((error) => {
    console.log(error);
  });
};

// let accessToken = ''
// getToken(process.env.GET_TOKEN,(res)=>{
//     accessToken = res.body.access_token
//     return accessToken
// })
module.exports = getToken
