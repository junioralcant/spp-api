const { formatToTimeZone } = require("date-fns-timezone");
const NotaDespesaSpp = require("../models/NotaDespesaSpp");
const Funcionario = require("../models/Funcionario");
const Loja = require("../models/Loja");

class NotaDespesaSppController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome_quem_comprou) {
      filters.nomeQuemComprou = new RegExp(req.query.nome_quem_comprou, "i");
    }

    if (req.query.nome_loja) {
      filters.nome = new RegExp(req.query.nome_loja, "i");
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

    const notaDespesaSpps = await NotaDespesaSpp.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["quemComprou", "loja"]
    });

    return res.json(notaDespesaSpps);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.quemComprou);
    const loja = await Loja.findById(req.body.loja);

    const notaDespesaSpp = await NotaDespesaSpp.create({
      ...req.body,
      nomeQuemComprou: funcionario.nome,
      nome: loja.nome
    });

    return res.json(notaDespesaSpp);
  }

  async show(req, res) {
    const notaDespesaSpp = await NotaDespesaSpp.findById(
      req.params.id
    ).populate(["quemComprou", "loja"]);

    return res.json(notaDespesaSpp);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.quemComprou);
    const loja = await Loja.findById(req.body.loja);

    const notaDespesaSpp = await NotaDespesaSpp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaDespesaSpp.nomeQuemComprou = funcionario.nome;
    notaDespesaSpp.nome = loja.nome;
    await notaDespesaSpp.save();

    return res.json(notaDespesaSpp);
  }

  async destroy(req, res) {
    await NotaDespesaSpp.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaDespesaSppController();
