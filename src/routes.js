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

/**
 * Hotel
 */

routes.get("/hotels", controllers.HotelController.index);
routes.post("/hotels", controllers.HotelController.store);
routes.get("/hotels/:id", controllers.HotelController.show);
routes.put("/hotels/:id", controllers.HotelController.update);
routes.delete("/hotels/:id", controllers.HotelController.destroy);

/**
 * Linha
 */

routes.get("/linhas", controllers.LinhaController.index);
routes.post("/linhas", controllers.LinhaController.store);
routes.get("/linhas/:id", controllers.LinhaController.show);
routes.put("/linhas/:id", controllers.LinhaController.update);
routes.delete("/linhas/:id", controllers.LinhaController.destroy);

/**
 * Loja
 */

routes.get("/lojas", controllers.LojaController.index);
routes.post("/lojas", controllers.LojaController.store);
routes.get("/lojas/:id", controllers.LojaController.show);
routes.put("/lojas/:id", controllers.LojaController.update);
routes.delete("/lojas/:id", controllers.LojaController.destroy);

/**
 * Posto
 */

routes.get("/postos", controllers.PostoController.index);
routes.post("/postos", controllers.PostoController.store);
routes.get("/postos/:id", controllers.PostoController.show);
routes.put("/postos/:id", controllers.PostoController.update);
routes.delete("/postos/:id", controllers.PostoController.destroy);

/**
 * Restaurante
 */

routes.get("/restaurantes", controllers.RestauranteController.index);
routes.post("/restaurantes", controllers.RestauranteController.store);
routes.get("/restaurantes/:id", controllers.RestauranteController.show);
routes.put("/restaurantes/:id", controllers.RestauranteController.update);
routes.delete("/restaurantes/:id", controllers.RestauranteController.destroy);

module.exports = routes;
