const express = require("express");

const routes = express.Router();

const controllers = require("./app/controllers/");

/**
 * Funcionario
 */
routes.get("/funcionarios", controllers.FuncionarioController.index);
routes.post("/funcionarios", controllers.FuncionarioController.store);
routes.get("/funcionarios/:id", controllers.FuncionarioController.show);
routes.put("/funcionarios/:id", controllers.FuncionarioController.update);
routes.delete("/funcionarios/:id", controllers.FuncionarioController.destroy);

/**
 * Encarregado
 */

routes.get("/encarregados", controllers.EncarregadoController.index);
routes.post("/encarregados", controllers.EncarregadoController.store);
routes.get("/encarregados/:id", controllers.EncarregadoController.show);
routes.put("/encarregados/:id", controllers.EncarregadoController.update);
routes.delete("/encarregados/:id", controllers.EncarregadoController.destroy);

module.exports = routes;
