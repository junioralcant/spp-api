const Restaurante = require("../models/Restaurante");

class RestauranteController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.cnpj_cpf) {
      filters.cnpj = new RegExp(req.query.cnpj_cpf, "i");
    }

    const restaurantes = await Restaurante.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt"
    });

    return res.json(restaurantes);
  }

  async store(req, res) {
    const restaurante = await Restaurante.create(req.body);

    return res.json(restaurante);
  }

  async show(req, res) {
    const restaurante = await Restaurante.findById(req.params.id);

    return res.json(restaurante);
  }

  async update(req, res) {
    const restaurante = await Restaurante.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(restaurante);
  }

  async destroy(req, res) {
    await Restaurante.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new RestauranteController();
