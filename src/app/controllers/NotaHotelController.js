const { formatToTimeZone } = require("date-fns-timezone");
const NotaHotel = require("../models/NotaHotel");

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
          timeZone: "America/Sao_Paulo"
        }
      );

      const dataMaxFormatada = formatToTimeZone(
        req.query.data_max,
        "YYYY-MM-DDT23:59:ss.SSSZ", // formatação de data e hora
        {
          timeZone: "America/Sao_Paulo"
        }
      );

      filters.data.$gte = dataMinFormatada;
      filters.data.$lte = dataMaxFormatada;
    }

    const notaHotels = await NotaHotel.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["hotel", "encarregado"]
    });

    return res.json(notaHotels);
  }

  async store(req, res) {
    const { valorUnitario, quantidade } = req.body;

    const notaHotel = await NotaHotel.create({
      ...req.body,
      total: valorUnitario * quantidade
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
    const { valorUnitario, quantidade } = req.body;

    const notaHotel = await NotaHotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    notaHotel.total = valorUnitario * quantidade;
    await notaHotel.save();

    return res.json(notaHotel);
  }

  async destroy(req, res) {
    await NotaHotel.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new NotaHotelController();
