const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const FuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  rg: {
    type: String,
    required: true,
    unique: true
  },

  cpf: {
    type: String,
    required: true,
    unique: true
  },

  cnh: {
    type: String,
    required: false,
    unique: true
  },

  pis: {
    type: String,
    required: false,
    unique: true
  },

  dataNascimento: {
    type: Date,
    required: true
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
    required: true
  },

  cidade: {
    type: String,
    required: true
  },

  bairro: {
    type: String,
    required: true
  },

  numeroCasa: {
    type: String,
    required: false
  },

  estado: {
    type: String,
    required: true
  },

  telefone: {
    type: String,
    required: true
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
