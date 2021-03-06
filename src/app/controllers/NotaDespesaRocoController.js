const { formatToTimeZone } = require("date-fns-timezone");
const NotaDespesaRoco = require("../models/NotaDespesaRoco");
const Funcionario = require("../models/Funcionario");
const Loja = require("../models/Loja");

class NotaDespesaRocoController {
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

    if (req.query.nome_nota) {
      filters.nomeNota = new RegExp(req.query.nome_nota, "i");
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

    const notaDespesaRocos = await NotaDespesaRoco.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["quemComprou", "loja"]
    });

    return res.json(notaDespesaRocos);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.quemComprou);
    const loja = await Loja.findById(req.body.loja);

    const notaDespesaRoco = await NotaDespesaRoco.create({
      ...req.body,
      nomeQuemComprou: funcionario.nome,
      nome: loja.nome
    });

    return res.json(notaDespesaRoco);
  }

  async show(req, res) {
    const notaDespesaRoco = await NotaDespesaRoco.findById(
      req.params.id
    ).populate(["quemComprou", "loja"]);

    return res.json(notaDespesaRoco);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.quemComprou);
    const loja = await Loja.findById(req.body.loja);

    const notaDespesaRoco = await NotaDespesaRoco.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaDespesaRoco.nomeQuemComprou = funcionario.nome;
    notaDespesaRoco.nome = loja.nome;
    await notaDespesaRoco.save();

    return res.json(notaDespesaRoco);
  }

  async destroy(req, res) {
    await NotaDespesaRoco.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaDespesaRocoController();
