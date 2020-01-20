const { formatToTimeZone } = require("date-fns-timezone");
const NotaHotel = require("../models/NotaHotel");
const Hotel = require("../models/Hotel");
const Linha = require("../models/Linha");

class NotaHotelController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.nome_linha) {
      filters.nomeLinha = new RegExp(req.query.nome_linha, "i");
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

    const notaHotels = await NotaHotel.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["hotel", "encarregado", "linha"]
    });

    return res.json(notaHotels);
  }

  async store(req, res) {
    const hotel = await Hotel.findById(req.body.hotel);
    const linha = await Linha.findById(req.body.linha);
    const { valorUnitario, quantidade } = req.body;

    const notaHotel = await NotaHotel.create({
      ...req.body,
      total: valorUnitario * quantidade,
      nome: hotel.nome,
      nomeLinha: linha.nome
    });

    return res.json(notaHotel);
  }

  async show(req, res) {
    const notaHotel = await NotaHotel.findById(req.params.id).populate([
      "hotel",
      "encarregado",
      "linha"
    ]);

    return res.json(notaHotel);
  }

  async update(req, res) {
    const hotel = await Hotel.findById(req.body.hotel);
    const linha = await Linha.findById(req.body.linha);
    const { valorUnitario, quantidade } = req.body;

    const notaHotel = await NotaHotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaHotel.total = valorUnitario * quantidade;
    notaHotel.nome = hotel.nome;
    notaHotel.nomeLinha = linha.nome;
    await notaHotel.save();

    return res.json(notaHotel);
  }

  async destroy(req, res) {
    await NotaHotel.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaHotelController();
