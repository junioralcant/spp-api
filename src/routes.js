const express = require("express");

const routes = express.Router();

routes.get("/teste", (req, res) => {
  return res.json({ message: "teste" });
});

module.exports = routes;
