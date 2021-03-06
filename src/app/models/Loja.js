const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LojaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  proprietario: {
    type: String,
    required: false
  },

  cnpj: {
    type: String,
    required: false,
    unique: true
  },

  endereco: {
    type: String,
    required: true
  },

  bairro: {
    type: String,
    required: true
  },

  cidade: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    required: true
  },

  numeroCasa: {
    type: String,
    required: false
  },

  cep: {
    type: String,
    required: false
  },

  telefone: {
    type: String,
    required: true
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

  whatsapp: {
    type: String,
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

LojaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Loja", LojaSchema);
