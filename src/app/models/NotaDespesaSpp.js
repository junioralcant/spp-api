const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaDespesaSppSchema = new mongoose.Schema({
  nomeNota: {
    type: String,
    required: true,
    default: "Despesa SPP"
  },

  nomeQuemComprou: {
    type: String
  },

  // Nome loja
  nome: {
    type: String
  },

  gastoCom: {
    type: String,
    required: false
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

NotaDespesaSppSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("NotaDespesaSpp", NotaDespesaSppSchema);
