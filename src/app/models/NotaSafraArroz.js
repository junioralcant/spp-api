const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaSafraArrozSchema = new mongoose.Schema({
  nomeQuemComprou: {
    type: String
  },

  // Nome loja
  nome: {
    type: String
  },

  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loja",
    required: true
  },

  gastoCom: {
    type: String,
    required: false
  },

  quemComprou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  observacao: {
    type: String
  },

  tipoDeCompra: {
    type: String
  },

  tipoDePagamento: {
    type: String
  },

  total: {
    type: Number,
    required: false
  },

  data: {
    type: Date,
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

NotaSafraArrozSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("NotaSafraArroz", NotaSafraArrozSchema);
