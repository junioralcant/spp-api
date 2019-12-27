const express = require("express");

const routes = express.Router();

const controllers = require("./app/controllers/");
const authMiddleware = require("./app/middleware/auth");

routes.post("/sessions", controllers.SessionController.store);

routes.use(authMiddleware);
/**
 * User
 */

routes.get("/users", controllers.UserController.index);
routes.post("/users", controllers.UserController.store);
routes.get("/users/:id", controllers.UserController.show);
routes.put("/users", controllers.UserController.update);
routes.delete("/users/:id", controllers.UserController.destroy);

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

/**
 * Proprietario
 */

routes.get("/proprietarios", controllers.ProprietarioController.index);
routes.post("/proprietarios", controllers.ProprietarioController.store);
routes.get("/proprietarios/:id", controllers.ProprietarioController.show);
routes.put("/proprietarios/:id", controllers.ProprietarioController.update);
routes.delete("/proprietarios/:id", controllers.ProprietarioController.destroy);

/**
 * Veiculo
 */

routes.get("/veiculos", controllers.VeiculoController.index);
routes.post("/veiculos", controllers.VeiculoController.store);
routes.get("/veiculos/:id", controllers.VeiculoController.show);
routes.put("/veiculos/:id", controllers.VeiculoController.update);
routes.delete("/veiculos/:id", controllers.VeiculoController.destroy);

/**
 * NotaHotel
 */

routes.get("/notasHotels", controllers.NotaHotelController.index);
routes.post("/notasHotels", controllers.NotaHotelController.store);
routes.get("/notasHotels/:id", controllers.NotaHotelController.show);
routes.put("/notasHotels/:id", controllers.NotaHotelController.update);
routes.delete("/notasHotels/:id", controllers.NotaHotelController.destroy);

/**
 * NotaLoja
 */

routes.get("/notasLojas", controllers.NotaLojaController.index);
routes.post("/notasLojas", controllers.NotaLojaController.store);
routes.get("/notasLojas/:id", controllers.NotaLojaController.show);
routes.put("/notasLojas/:id", controllers.NotaLojaController.update);
routes.delete("/notasLojas/:id", controllers.NotaLojaController.destroy);

/**
 * NotaPosto
 */

routes.get("/notaspostos", controllers.NotaPostoController.index);
routes.post("/notaspostos", controllers.NotaPostoController.store);
routes.get("/notaspostos/:id", controllers.NotaPostoController.show);
routes.put("/notaspostos/:id", controllers.NotaPostoController.update);
routes.delete("/notaspostos/:id", controllers.NotaPostoController.destroy);

/**
 * NotaRestaurante
 */

routes.get("/notasrestaurantes", controllers.NotaRestauranteController.index);
routes.post("/notasrestaurantes", controllers.NotaRestauranteController.store);
routes.get(
  "/notasrestaurantes/:id",
  controllers.NotaRestauranteController.show
);
routes.put(
  "/notasrestaurantes/:id",
  controllers.NotaRestauranteController.update
);
routes.delete(
  "/notasrestaurantes/:id",
  controllers.NotaRestauranteController.destroy
);

module.exports = routes;
