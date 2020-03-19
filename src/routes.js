const express = require("express");

const routes = express.Router();

const controllers = require("./app/controllers/");
const authMiddleware = require("./app/middleware/auth");

routes.post("/sessions", controllers.SessionController.store);

//routes.use(authMiddleware);
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

/**
 * NotaPosto
 */

routes.get("/notasfazendas", controllers.NotaFazendaController.index);
routes.post("/notasfazendas", controllers.NotaFazendaController.store);
routes.get("/notasfazendas/:id", controllers.NotaFazendaController.show);
routes.put("/notasfazendas/:id", controllers.NotaFazendaController.update);
routes.delete("/notasfazendas/:id", controllers.NotaFazendaController.destroy);

/**
 * NotaSafraArroz
 */

routes.get("/notassafraarrozs", controllers.NotaSafraArrozController.index);
routes.post("/notassafraarrozs", controllers.NotaSafraArrozController.store);
routes.get("/notassafraarrozs/:id", controllers.NotaSafraArrozController.show);
routes.put(
  "/notassafraarrozs/:id",
  controllers.NotaSafraArrozController.update
);
routes.delete(
  "/notassafraarrozs/:id",
  controllers.NotaSafraArrozController.destroy
);

/**
 * NotaDespesaDiversa
 */

routes.get(
  "/notasdespesasdiversas",
  controllers.NotaDespesaDiversaController.index
);
routes.post(
  "/notasdespesasdiversas",
  controllers.NotaDespesaDiversaController.store
);
routes.get(
  "/notasdespesasdiversas/:id",
  controllers.NotaDespesaDiversaController.show
);
routes.put(
  "/notasdespesasdiversas/:id",
  controllers.NotaDespesaDiversaController.update
);
routes.delete(
  "/notasdespesasdiversas/:id",
  controllers.NotaDespesaDiversaController.destroy
);

/**
 * NotaDespesaRoco
 */

routes.get(
  "/notasdespesasfuncionarios",
  controllers.NotaDespesaFuncionarioController.index
);
routes.post(
  "/notasdespesasfuncionarios",
  controllers.NotaDespesaFuncionarioController.store
);
routes.get(
  "/notasdespesasfuncionarios/:id",
  controllers.NotaDespesaFuncionarioController.show
);
routes.put(
  "/notasdespesasfuncionarios/:id",
  controllers.NotaDespesaFuncionarioController.update
);
routes.delete(
  "/notasdespesasfuncionarios/:id",
  controllers.NotaDespesaFuncionarioController.destroy
);

/**
 * NotaDespesaFuncionario
 */

routes.get("/notasdespesasrocos", controllers.NotaDespesaRocoController.index);
routes.post("/notasdespesasrocos", controllers.NotaDespesaRocoController.store);
routes.get(
  "/notasdespesasrocos/:id",
  controllers.NotaDespesaRocoController.show
);
routes.put(
  "/notasdespesasrocos/:id",
  controllers.NotaDespesaRocoController.update
);
routes.delete(
  "/notasdespesasrocos/:id",
  controllers.NotaDespesaRocoController.destroy
);

/**
 * NotaDespesaSpp
 */

routes.get("/notasdespesasspps", controllers.NotaDespesaSppController.index);
routes.post("/notasdespesasspps", controllers.NotaDespesaSppController.store);
routes.get("/notasdespesasspps/:id", controllers.NotaDespesaSppController.show);
routes.put(
  "/notasdespesasspps/:id",
  controllers.NotaDespesaSppController.update
);
routes.delete(
  "/notasdespesasspps/:id",
  controllers.NotaDespesaSppController.destroy
);

/**
 * Adiantamento
 */

routes.get("/adiantamentos", controllers.AdiantamentoController.index);
routes.post("/adiantamentos", controllers.AdiantamentoController.store);
routes.get("/adiantamentos/:id", controllers.AdiantamentoController.show);
routes.put("/adiantamentos/:id", controllers.AdiantamentoController.update);
routes.delete("/adiantamentos/:id", controllers.AdiantamentoController.destroy);

/**
 * Caixa
 */

routes.get("/caixas", controllers.CaixaController.index);
module.exports = routes;
