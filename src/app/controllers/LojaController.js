const Loja = require("../models/Loja");

class LojaController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const lojas = await Loja.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["encarregado"]
    });

    return res.json(lojas);
  }

  async store(req, res) {
    const loja = await Loja.create(req.body);

    return res.json(loja);
  }

  async show(req, res) {
    const loja = await Loja.findById(req.params.id);

    return res.json(loja);
  }

  async update(req, res) {
    const loja = await Loja.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(loja);
  }

  async destroy(req, res) {
    await Loja.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new LojaController();
