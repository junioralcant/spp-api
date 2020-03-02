const Funcionario = require("../models/Funcionario");
const AdiantamentoFuncionario = require("../models/AdiantamentoFuncionario");

class AdiantamentoFuncionarioController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const adiantamentos = await AdiantamentoFuncionario.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      populate: ["funcionario"],
      sort: "-createdAt"
    });

    return res.json(adiantamentos);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);
    const adiantamento = await AdiantamentoFuncionario.create({
      ...req.body,
      nome: funcionario.nome
    });

    return res.json(adiantamento);
  }

  async show(req, res) {
    const adiantamento = await AdiantamentoFuncionario.findById(
      req.params.id
    ).populate("funcionario");

    return res.json(adiantamento);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);
    const adiantamento = await AdiantamentoFuncionario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    adiantamento.nome = funcionario.nome;
    await adiantamento.save();

    return res.json(adiantamento);
  }

  async destroy(req, res) {
    await AdiantamentoFuncionario.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new AdiantamentoFuncionarioController();
