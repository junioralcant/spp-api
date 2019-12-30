const { formatToTimeZone } = require("date-fns-timezone");
const NotaRestaurante = require("../models/NotaRestaurante");

class NotaRestauranteController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.data_min || req.query.data_max) {
      filters.data = {};

      const dataMinFormatada = formatToTimeZone(
        req.query.data_min,
        "YYYY-MM-DDT00:mm:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "America/Sao_Paulo"
        }
      );

      const dataMaxFormatada = formatToTimeZone(
        req.query.data_max,
        "YYYY-MM-DDT23:59:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "America/Sao_Paulo"
        }
      );

      filters.data.$gte = dataMinFormatada;
      filters.data.$lte = dataMaxFormatada;
    }

    const notaRestaurantes = await NotaRestaurante.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["restaurante", "encarregado"]
    });

    return res.json(notaRestaurantes);
  }

  async store(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaRestaurante = await NotaRestaurante.create({
      ...req.body,
      total: valorUnitario * quantidade
    });

    return res.json(notaRestaurante);
  }

  async show(req, res) {
    const notaRestaurante = await NotaRestaurante.findById(
      req.params.id
    ).populate(["restaurante", "encarregado"]);

    return res.json(notaRestaurante);
  }

  async update(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaRestaurante = await NotaRestaurante.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaRestaurante.total = valorUnitario * quantidade;
    await notaRestaurante.save();

    return res.json(notaRestaurante);
  }

  async destroy(req, res) {
    await NotaRestaurante.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaRestauranteController();
