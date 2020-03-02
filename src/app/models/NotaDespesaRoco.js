const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaDespesaRocoSchema = new mongoose.Schema({
  nomeQuemComprou: {
    type: String
  },

  nomeLoja: {
    type: String
  },

  gastoCom: {
    type: String,
    required: true
  },

  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loja",
    required: true
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

NotaDespesaRocoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("NotaDespesaRoco", NotaDespesaRocoSchema);