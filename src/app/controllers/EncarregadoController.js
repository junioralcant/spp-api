const Encarregado = require("../models/Encarregado");
const Funcionario = require("../models/Funcionario");

class EncarregadoController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const encarregados = await Encarregado.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      populate: ["funcionario"],
      sort: "-createdAt"
    });

    return res.json(encarregados);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);
    const encarregado = await Encarregado.create({
      ...req.body,
      nome: funcionario.nome
    });

    return res.json(encarregado);
  }

  async show(req, res) {
    const encarregado = await Encarregado.findById(req.params.id).populate(
      "funcionario"
    );

    return res.json(encarregado);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);
    const encarregado = await Encarregado.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    encarregado.nome = funcionario.nome;
    await encarregado.save();

    return res.json(encarregado);
  }

  async destroy(req, res) {
    await Encarregado.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new EncarregadoController();
