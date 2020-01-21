const Proprietario = require("../models/Proprietario");

class ProprietarioController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.cnpj_cpf) {
      filters.cnpj = new RegExp(req.query.cnpj_cpf, "i");
    }

    const proprietarios = await Proprietario.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt"
    });

    return res.json(proprietarios);
  }

  async store(req, res) {
    const proprietario = await Proprietario.create(req.body);

    return res.json(proprietario);
  }

  async show(req, res) {
    const proprietario = await Proprietario.findById(req.params.id);

    return res.json(proprietario);
  }

  async update(req, res) {
    const proprietario = await Proprietario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(proprietario);
  }

  async destroy(req, res) {
    await Proprietario.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new ProprietarioController();
