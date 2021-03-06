const { formatToTimeZone } = require("date-fns-timezone");
const NotaLoja = require("../models/NotaLoja");
const Loja = require("../models/Loja");
const Linha = require("../models/Linha");

class NotaLojaController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.nome_linha) {
      filters.nomeLinha = new RegExp(req.query.nome_linha, "i");
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

    const notaLojas = await NotaLoja.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["loja", "encarregado", "veiculo", "linha"]
    });

    return res.json(notaLojas);
  }

  async store(req, res) {
    const loja = await Loja.findById(req.body.loja);
    const linha = await Linha.findById(req.body.linha);

    const notaLoja = await NotaLoja.create({
      ...req.body,
      nome: loja.nome,
      nomeLinha: linha.nome
    });

    return res.json(notaLoja);
  }

  async show(req, res) {
    const notaLoja = await NotaLoja.findById(req.params.id).populate([
      "loja",
      "encarregado",
      "veiculo",
      "linha"
    ]);

    return res.json(notaLoja);
  }

  async update(req, res) {
    const loja = await Loja.findById(req.body.loja);
    const linha = await Linha.findById(req.body.linha);

    const notaLoja = await NotaLoja.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    notaLoja.nome = loja.nome;
    notaLoja.nomeLinha = linha.nome;
    await notaLoja.save();

    return res.json(notaLoja);
  }

  async destroy(req, res) {
    await NotaLoja.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaLojaController();
