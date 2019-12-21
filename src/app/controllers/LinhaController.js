const Linha = require("../models/Linha");

class LinhaController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const linhas = await Linha.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["encarregado"]
    });

    return res.json(linhas);
  }

  async store(req, res) {
    const linha = await Linha.create(req.body);

    return res.json(linha);
  }

  async show(req, res) {
    const linha = await Linha.findById(req.params.id).populate("encarregado");

    return res.json(linha);
  }

  async update(req, res) {
    const linha = await Linha.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(linha);
  }

  async destroy(req, res) {
    await Linha.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new LinhaController();
