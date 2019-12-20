const express = require("express");

const routes = express.Router();

const controllers = require("./app/controllers/");

routes.get("/funcionarios", controllers.FuncionarioController.index);
routes.post("/funcionarios", controllers.FuncionarioController.store);
routes.get("/funcionarios/:id", controllers.FuncionarioController.show);
routes.put("/funcionarios/:id", controllers.FuncionarioController.update);
routes.delete("/funcionarios/:id", controllers.FuncionarioController.destroy);

module.exports = routes;
