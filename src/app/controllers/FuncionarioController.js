const Funcionario = require("../models/Funcionario");

class FuncionarioController {
  async index(req, res) {
    const filters = {};

    if (req.query.nome) {
      filters.nome = new RegExp(req.query.nome, "i");
    }

    if (req.query.cpf) {
      filters.cpf = new RegExp(req.query.cpf, "i");
    }

    if (req.query.rg) {
      filters.rg = new RegExp(req.query.rg, "i");
    }
    const funcionarios = await Funcionario.paginate(filters, {
      page: req.query.page || 1,
      limit: 15,
      sort: "-createdAt"
    });

    return res.json(funcionarios);
  }

  async store(req, res) {
    const CpfExists = await Funcionario.findOne({ cpf: req.body.cpf }); // verifica se o CPF informado já existe no bd

    if (CpfExists) {
      return res.status(400).json({ error: "Número de CPF já cadastrado." });
    }

    const RgExists = await Funcionario.findOne({ rg: req.body.rg }); // verifica se o RG informado já existe no bd

    if (RgExists) {
      return res.status(400).json({ error: "Número de RG já cadastrado." });
    }

    const CnhExists = await Funcionario.findOne({ cnh: req.body.cnh }); // verifica se o RG informado já existe no bd

    if (CnhExists) {
      return res.status(400).json({ error: "Número de CNH já cadastrado." });
    }

    const PisExists = await Funcionario.findOne({ pis: req.body.pis }); // verifica se o RG informado já existe no bd

    if (PisExists) {
      return res.status(400).json({ error: "Número de PIS já cadastrado." });
    }

    const EmailExists = await Funcionario.findOne({ email: req.body.email }); // verifica se o RG informado já existe no bd

    if (EmailExists) {
      return res
        .status(400)
        .json({ error: "Endereço de E-mail já cadastrado." });
    }

    const AgenciaBancariaExists = await Funcionario.findOne({
      agenciaBancaria: req.body.agenciaBancaria
    }); // verifica se o RG informado já existe no bd

    if (AgenciaBancariaExists) {
      return res
        .status(400)
        .json({ error: "Número de Agência Bancaria já cadastrado." });
    }

    const ContaBancariaExists = await Funcionario.findOne({
      contaBancaria: req.body.contaBancaria
    }); // verifica se o RG informado já existe no bd

    if (ContaBancariaExists) {
      return res
        .status(400)
        .json({ error: "Número de Agência Bancaria já cadastrado." });
    }

    const funcionario = await Funcionario.create(req.body);

    return res.json(funcionario);
  }

  async show(req, res) {
    const funcionario = await Funcionario.findById(req.params.id);

    return res.json(funcionario);
  }

  async update(req, res) {
    const funcionario = await Funcionario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    return res.json(funcionario);
  }

  async destroy(req, res) {
    await Funcionario.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new FuncionarioController();
