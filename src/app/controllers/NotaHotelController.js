const { formatToTimeZone } = require("date-fns-timezone");
const NotaHotel = require("../models/NotaHotel");
const Hotel = require("../models/Hotel");

class NotaHotelController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
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

    const { limit_page } = req.query;

    const notaHotels = await NotaHotel.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.limit_page) || 15,
      sort: "-data",
      populate: ["hotel", "encarregado"]
    });

    return res.json(notaHotels);
  }

  async store(req, res) {
    const hotel = await Hotel.findById(req.body.hotel);
    const { valorUnitario, quantidade } = req.body;

    const notaHotel = await NotaHotel.create({
      ...req.body,
      total: valorUnitario * quantidade,
      nome: hotel.nome
    });

    return res.json(notaHotel);
  }

  async show(req, res) {
    const notaHotel = await NotaHotel.findById(req.params.id).populate([
      "hotel",
      "encarregado"
    ]);

    return res.json(notaHotel);
  }

  async update(req, res) {
    const hotel = await Hotel.findById(req.body.hotel);
    const { valorUnitario, quantidade } = req.body;
    console.log(hotel);

    const notaHotel = await NotaHotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaHotel.total = valorUnitario * quantidade;
    notaHotel.nome = hotel.nome;
    await notaHotel.save();

    return res.json(notaHotel);
  }

  async destroy(req, res) {
    await NotaHotel.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaHotelController();
