const NotaLoja = require("../models/NotaLoja");

class NotaLojaController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const notaLojas = await NotaLoja.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["loja", "encarregado"]
    });

    return res.json(notaLojas);
  }

  async store(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaLoja = await NotaLoja.create({
      ...req.body,
      total: valorUnitario * quantidade
    });

    return res.json(notaLoja);
  }

  async show(req, res) {
    const notaLoja = await NotaLoja.findById(req.params.id).populate([
      "loja",
      "encarregado"
    ]);

    return res.json(notaLoja);
  }

  async update(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaLoja = await NotaLoja.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    notaLoja.total = valorUnitario * quantidade;
    await notaLoja.save();

    return res.json(notaLoja);
  }

  async destroy(req, res) {
    await NotaLoja.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaLojaController();
