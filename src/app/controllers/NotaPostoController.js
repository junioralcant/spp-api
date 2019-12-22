const NotaPosto = require("../models/NotaPosto");

class NotaPostoController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const notaPostos = await NotaPosto.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["posto", "veiculo", "motorista"]
    });

    return res.json(notaPostos);
  }

  async store(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaPosto = await NotaPosto.create({
      ...req.body,
      total: valorUnitario * quantidade
    });

    return res.json(notaPosto);
  }

  async show(req, res) {
    const notaPosto = await NotaPosto.findById(req.params.id).populate([
      "posto",
      "veiculo",
      "motorista"
    ]);

    return res.json(notaPosto);
  }

  async update(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaPosto = await NotaPosto.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaPosto.total = valorUnitario * quantidade;
    await notaPosto.save();

    return res.json(notaPosto);
  }

  async destroy(req, res) {
    await NotaPosto.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaPostoController();
