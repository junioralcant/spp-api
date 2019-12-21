const Posto = require("../models/Posto");

class PostoController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const postos = await Posto.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt"
    });

    return res.json(postos);
  }

  async store(req, res) {
    const posto = await Posto.create(req.body);

    return res.json(posto);
  }

  async show(req, res) {
    const posto = await Posto.findById(req.params.id);

    return res.json(posto);
  }

  async update(req, res) {
    const posto = await Posto.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(posto);
  }

  async destroy(req, res) {
    await Posto.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new PostoController();
