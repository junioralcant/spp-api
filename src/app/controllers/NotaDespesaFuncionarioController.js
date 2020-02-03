const { formatToTimeZone } = require("date-fns-timezone");
const NotaDespesaFuncionario = require("../models/NotaDespesaFuncionario");
const Funcionario = require("../models/Funcionario");
const Loja = require("../models/Loja");

class NotaDespesaFuncionarioController {
  async index(req, res) {
    const filters = {};

    if (req.query.funcionario) {
      filters.nomeFuncionario = new RegExp(req.query.funcionario, "i");
    }

    if (req.query.nome_loja) {
      filters.nomeLoja = new RegExp(req.query.nome_loja, "i");
    }

    if (req.query.gastocom) {
      filters.gastoCom = new RegExp(req.query.gastocom, "i");
    }

    if (req.query.data_min || req.query.data_max) {
      filters.data = {};

      const dataMinFormatada = formatToTimeZone(
        req.query.data_min,
        "YYYY-MM-DDT00:mm:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "Europe/Berlin"
        }
      );

      const dataMaxFormatada = formatToTimeZone(
        req.query.data_max,
        "YYYY-MM-DDT23:59:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "Europe/Berlin"
        }
      );

      filters.data.$gte = dataMinFormatada;
      filters.data.$lte = dataMaxFormatada;
    }

    const notaDespesaFuncionarios = await NotaDespesaFuncionario.paginate(
      filters,
      {
        page: req.query.page || 1,
        limit: parseInt(req.query.limit_page) || 15,
        sort: "-data",
        populate: ["funcionario", "loja"]
      }
    );

    return res.json(notaDespesaFuncionarios);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);
    const loja = await Loja.findById(req.body.loja);

    const notaDespesaFuncionario = await NotaDespesaFuncionario.create({
      ...req.body,
      nomeFuncionario: funcionario.nome,
      nomeLoja: loja.nome
    });

    return res.json(notaDespesaFuncionario);
  }

  async show(req, res) {
    const notaDespesaFuncionario = await NotaDespesaFuncionario.findById(
      req.params.id
    ).populate(["funcionario", "loja"]);

    return res.json(notaDespesaFuncionario);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);
    const loja = await Loja.findById(req.body.loja);

    const notaDespesaFuncionario = await NotaDespesaFuncionario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaDespesaFuncionario.nomeFuncionario = funcionario.nome;
    notaDespesaFuncionario.nomeLoja = loja.nome;
    await notaDespesaFuncionario.save();

    return res.json(notaDespesaFuncionario);
  }

  async destroy(req, res) {
    await NotaDespesaFuncionario.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaDespesaFuncionarioController();
