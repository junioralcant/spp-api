const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const HotelSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  proprietario: {
    type: String,
    required: true
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

  whatsapp: {
    type: String,
    required: false
  },

  data: {
    type: Date,
    default: Date.now
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

HotelSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Hotel", HotelSchema);
