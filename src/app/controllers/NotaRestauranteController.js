const NotaRestaurante = require("../models/NotaRestaurante");

class NotaRestauranteController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
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
