const { formatToTimeZone } = require("date-fns-timezone");
const Adiantamento = require("../models/Adiantamento");
const Funcionario = require("../models/Funcionario");

class AdiantamentoController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome_funcionario) {
      filters.nome = new RegExp(req.query.nome_funcionario, "i");
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

    const adiantamentos = await Adiantamento.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["funcionario"]
    });

    return res.json(adiantamentos);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);

    const adiantamento = await Adiantamento.create({
      ...req.body,
      nome: funcionario.nome
    });

    return res.json(adiantamento);
  }

  async show(req, res) {
    const adiantamento = await Adiantamento.findById(req.params.id).populate([
      "funcionario"
    ]);

    return res.json(adiantamento);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.funcionario);

    const adiantamento = await Adiantamento.findByIdAndUpdate(
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
    await Adiantamento.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new AdiantamentoController();
