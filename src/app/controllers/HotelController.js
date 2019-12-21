const Hotel = require("../models/Hotel");

class HotelController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    const hotels = await Hotel.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt"
    });

    return res.json(hotels);
  }

  async store(req, res) {
    const hotel = await Hotel.create(req.body);

    return res.json(hotel);
  }

  async show(req, res) {
    const hotel = await Hotel.findById(req.params.id);

    return res.json(hotel);
  }

  async update(req, res) {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(hotel);
  }

  async destroy(req, res) {
    await hotel.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new HotelController();
