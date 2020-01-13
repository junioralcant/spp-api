const Veiculo = require("../models/Veiculo");

class VeiculoController {
  async index(req, res) {
    const filters = {};

    if (req.query.modelo) {
      filters.modelo = new RegExp(req.query.modelo, "i");
    }

    if (req.query.placa) {
      filters.placa = new RegExp(req.query.placa, "i");
    }

    if (req.query.chassi) {
      filters.chassi = new RegExp(req.query.chassi, "i");
    }

    const veiculos = await Veiculo.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt",
      populate: ["proprietario"]
    });

    return res.json(veiculos);
  }

  async store(req, res) {
    const PlacaExists = await Veiculo.findOne({ placa: req.body.placa }); // verifica se o RG informado já existe no bd

    if (PlacaExists) {
      return res.status(400).json({ error: "Número de Placa já cadastrado." });
    }

    const ChassiExists = await Veiculo.findOne({ chassi: req.body.chassi }); // verifica se o Chassi informado já existe no bd

    if (ChassiExists) {
      return res.status(400).json({ error: "Número de Chassi já cadastrado." });
    }

    const NumeroDeSerieExists = await Veiculo.findOne({
      numeroDeSerie: req.body.numeroDeSerie
    }); // verifica se o RG informado já existe no bd

    if (NumeroDeSerieExists) {
      return res
        .status(400)
        .json({ error: "Número de Numero de Serie já cadastrado." });
    }

    const veiculo = await Veiculo.create(req.body);

    return res.json(veiculo);
  }

  async show(req, res) {
    const veiculo = await Veiculo.findById(req.params.id).populate(
      "proprietario"
    );

    return res.json(veiculo);
  }

  async update(req, res) {
    const veiculo = await Veiculo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(veiculo);
  }

  async destroy(req, res) {
    await Veiculo.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new VeiculoController();
