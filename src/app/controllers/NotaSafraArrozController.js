const { formatToTimeZone } = require("date-fns-timezone");
const NotaSafraArroz = require("../models/NotaSafraArroz");
const Funcionario = require("../models/Funcionario");
const Loja = require("../models/Loja");

class NotaSafraArrozController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome_quem_comprou) {
      filters.nomeQuemComprou = new RegExp(req.query.nome_quem_comprou, "i");
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

    const notaSafraArrozs = await NotaSafraArroz.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["quemComprou", "loja"]
    });

    return res.json(notaSafraArrozs);
  }

  async store(req, res) {
    const funcionario = await Funcionario.findById(req.body.quemComprou);
    const loja = await Loja.findById(req.body.loja);

    const notaSafraArroz = await NotaSafraArroz.create({
      ...req.body,
      nomeQuemComprou: funcionario.nome,
      nomeLoja: loja.nome
    });

    return res.json(notaSafraArroz);
  }

  async show(req, res) {
    const notaSafraArroz = await NotaSafraArroz.findById(
      req.params.id
    ).populate(["quemComprou", "loja"]);

    return res.json(notaSafraArroz);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findById(req.body.quemComprou);
    const loja = await Loja.findById(req.body.loja);

    const notaSafraArroz = await NotaSafraArroz.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaSafraArroz.nomeQuemComprou = funcionario.nome;
    notaSafraArroz.nomeLoja = loja.nome;
    await notaSafraArroz.save();

    return res.json(notaSafraArroz);
  }

  async destroy(req, res) {
    await NotaSafraArroz.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaSafraArrozController();
