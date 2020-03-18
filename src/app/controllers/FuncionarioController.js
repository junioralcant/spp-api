const Funcionario = require("../models/Funcionario");

class FuncionarioController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.cpf) {
      filters.cpf = new RegExp(req.query.cpf, "i");
    }

    if (req.query.rg) {
      filters.rg = new RegExp(req.query.rg, "i");
    }
    const funcionarios = await Funcionario.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt"
    });

    return res.json(funcionarios);
  }

  async store(req, res) {
    const funcionario = await Funcionario.create(req.body);

    return res.json(funcionario);
  }

  async show(req, res) {
    const funcionario = await Funcionario.findById(req.params.id);

    return res.json(funcionario);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(funcionario);
  }

  async destroy(req, res) {
    await Funcionario.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new FuncionarioController();
