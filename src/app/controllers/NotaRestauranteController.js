const { formatToTimeZone } = require("date-fns-timezone");
const NotaRestaurante = require("../models/NotaRestaurante");
const Restaurante = require("../models/Restaurante");
const Linha = require("../models/Linha");

class NotaRestauranteController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.nome_linha) {
      filters.nomeLinha = new RegExp(req.query.nome_linha, "i");
    }

    if (req.query.data_min || req.query.data_max) {
      filters.data = {};

      const dataMinFormatada = formatToTimeZone(
        req.query.data_min,
        "YYYY-MM-DDT00:mm:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "Europe/Berlin"
        }
      );

      const dataMaxFormatada = formatToTimeZone(
        req.query.data_max,
        "YYYY-MM-DDT23:59:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "Europe/Berlin"
        }
      );

      filters.data.$gte = dataMinFormatada;
      filters.data.$lte = dataMaxFormatada;
    }

    const notaRestaurantes = await NotaRestaurante.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["restaurante", "encarregado", "linha"]
    });

    return res.json(notaRestaurantes);
  }

  async store(req, res) {
    const restaurante = await Restaurante.findById(req.body.restaurante);
    const linha = await Linha.findById(req.body.linha);
    const { valorUnitario, quantidade } = req.body;

    const notaRestaurante = await NotaRestaurante.create({
      ...req.body,
      total: valorUnitario * quantidade,
      nome: restaurante.nome,
      nomeLinha: linha.nome
    });

    return res.json(notaRestaurante);
  }

  async show(req, res) {
    const notaRestaurante = await NotaRestaurante.findById(
      req.params.id
    ).populate(["restaurante", "encarregado", "linha"]);

    return res.json(notaRestaurante);
  }

  async update(req, res) {
    const restaurante = await Restaurante.findById(req.body.restaurante);
    const linha = await Linha.findById(req.body.linha);
    const { valorUnitario, quantidade } = req.body;

    const notaRestaurante = await NotaRestaurante.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaRestaurante.total = valorUnitario * quantidade;
    notaRestaurante.nome = restaurante.nome;
    notaRestaurante.nomeLinha = linha.nome;
    await notaRestaurante.save();

    return res.json(notaRestaurante);
  }

  async destroy(req, res) {
    await NotaRestaurante.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaRestauranteController();
