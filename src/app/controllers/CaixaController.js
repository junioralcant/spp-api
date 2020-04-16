const { formatToTimeZone } = require("date-fns-timezone");

const NotaLoja = require("../models/NotaLoja");
const NotaPosto = require("../models/NotaPosto");
const NotaHotel = require("../models/NotaHotel");
const NotaRestaurante = require("../models/NotaRestaurante");
const NotaSafraArroz = require("../models/NotaSafraArroz");
const NotaFazenda = require("../models/NotaFazenda");
const NotaDespesaDiversa = require("../models/NotaDespesaDiversa");
const NotaDespesaFuncionario = require("../models/NotaDespesaFuncionario");
const NotaDespesaRoco = require("../models/NotaDespesaRoco");
const NotaDespesaSpp = require("../models/NotaDespesaSpp");
const Adiantamento = require("../models/Adiantamento");

class CaixaController {
  async index(req, res) {
    const dateNow = formatToTimeZone(
      new Date(Date.now()),
      "YYYY-MM-DD", // formatação de data e hora
      {
        timeZone: "Europe/Berlin"
      }
    );

    const filterDate = {
      $gte: req.query.data_min || dateNow,
      $lte: req.query.data_max || dateNow
    };

    const gastoCom = new RegExp(req.query.gasto_com, "i");
    const tipoPagamento = new RegExp(req.query.tipo_pagamento, "i");
    const nomeNotaFiltro = new RegExp(req.query.nome_nota, "i");
    const caixa = [];

    //LOJA
    const lojas = await NotaLoja.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "encarregado", "veiculo", "linha"]);

    lojas.map(loja => {
      caixa.push(loja);
    });

    //POSTO
    const postos = await NotaPosto.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["posto", "veiculo", "motorista", "linha"]);

    postos.map(posto => {
      caixa.push(posto);
    });

    //HOTEL
    const hotels = await NotaHotel.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["hotel", "encarregado", "linha"]);

    hotels.map(hotel => {
      caixa.push(hotel);
    });

    //RESTAURANTE
    const restaurantes = await NotaRestaurante.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["restaurante", "encarregado", "linha"]);

    restaurantes.map(restaurante => {
      caixa.push(restaurante);
    });

    //SAFRA ARROZ
    const safras = await NotaSafraArroz.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "quemComprou"]);

    safras.map(safra => {
      caixa.push(safra);
    });

    //FAZENDA
    const fazendas = await NotaFazenda.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "quemComprou"]);

    fazendas.map(fazenda => {
      caixa.push(fazenda);
    });

    //NOTA DESPESA FUNCIONARIO
    const notaDespesaFuncionario = await NotaDespesaFuncionario.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "funcionario"]);

    notaDespesaFuncionario.map(funcionario => {
      caixa.push(funcionario);
    });

    //NOTA DESPESA ROCO
    const notaDespesaRoco = await NotaDespesaRoco.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "quemComprou"]);

    notaDespesaRoco.map(roco => {
      caixa.push(roco);
    });

    //DEPESAS DIVERSAS
    const despesas = await NotaDespesaDiversa.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "quemComprou"]);

    despesas.map(despesa => {
      caixa.push(despesa);
    });

    //DEPESAS SPP
    const despesasSpp = await NotaDespesaSpp.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["loja", "quemComprou"]);

    despesasSpp.map(spp => {
      caixa.push(spp);
    });

    //ADIANTAMENTO
    const adiantamento = await Adiantamento.find({
      data: filterDate,
      nome: gastoCom,
      tipoDePagamento: tipoPagamento,
      nomeNota: nomeNotaFiltro
    }).populate(["funcionario"]);

    adiantamento.map(adianta => {
      caixa.push(adianta);
    });

    return res.json(caixa);
  }
}

module.exports = new CaixaController();
