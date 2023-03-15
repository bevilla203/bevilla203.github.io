import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

class ApiController {
  static getGames = async (req, res) => {
    try {
      const tokenResponse = await axios({
        url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });
      const gamesResponse = await axios({
        url: "https://api.igdb.com/v4/games",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.CLIENT_ID,
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
        data: `fields name, first_release_date, summary, platforms, category, genres, category, cover, rating, rating_count, screenshots.*; limit 15; where`,
      });
      res.json({ data: gamesResponse.data });
    } catch (err) {
      console.error(err);
      res.send("Error");
    }
  };

  static getDate = (req, res) => {
    axios({
      url: "https://api.igdb.com/v4/release_dates",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: process.env.ACCESS_TOKEN,
      },
      data: `fields human,y; where game=${req.params.id};`,
    })
      .then((response) => {
        res.json({ data: response.data });
      })
      .catch((err) => {
        console.error(err);
        res.send("Error");
      });
  };

  static getCreator = (req, res) => {
    axios({
      url: "https://api.igdb.com/v4/companies",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: process.env.ACCESS_TOKEN,
      },
      data: `fields name; where developed=[${req.params.id}];`,
    })
      .then((response) => {
        res.json({ data: response.data });
      })
      .catch((err) => {
        console.error(err);
        res.send("Error");
      });
  };

  static getGeneral = (req, res) => {
    axios({
      url: "https://api.igdb.com/v4/games",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: process.env.ACCESS_TOKEN,
      },
      data: `fields rating, name, summary, platforms, genres, category; where id=${req.params.id};`,
    })
      .then((response) => {
        res.json({ data: response.data });
      })
      .catch((err) => {
        console.error(err);
        res.send("Error");
      });
  };

  static getGenres = (req, res) => {
    axios({
      url: "https://api.igdb.com/v4/genres",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: process.env.ACCESS_TOKEN,
      },
      data: `fields name,slug; where
