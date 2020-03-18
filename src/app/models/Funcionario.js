const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const FuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: false
  },

  rg: {
    type: String,
    required: false
  },

  cpf: {
    type: String,
    required: false
  },

  cnh: {
    type: String,
    required: false
  },

  pis: {
    type: String,
    required: false
  },

  dataNascimento: {
    type: Date,
    required: false
  },

  dataAdmissao: {
    type: Date,
    required: false
  },

  cargo: {
    type: String,
    required: false
  },

  endereco: {
    type: String,
    required: false
  },

  cidade: {
    type: String,
    required: false
  },

  bairro: {
    type: String,
    required: false
  },

  numeroCasa: {
    type: String,
    required: false
  },

  estado: {
    type: String,
    required: false
  },

  cep: {
    type: String
  },

  telefone: {
    type: String,
    required: false
  },

  whatsapp: {
    type: String,
    required: false
  },

  salarioFixo: {
    type: Number,
    required: false
  },

  email: {
    type: String,
    required: false
  },

  agenciaBancaria: {
    type: String,
    required: false
  },

  contaBancaria: {
    type: String,
    required: false
  },

  tipoConta: {
    type: String,
    required: false
  },

  banco: {
    type: String,
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

FuncionarioSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Funcionario", FuncionarioSchema);
