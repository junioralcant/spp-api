const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaDespesaFuncionarioSchema = new mongoose.Schema({
  nomeNota: {
    type: String,
    required: true,
    default: "Despesa Funcionário"
  },

  nomeFuncionario: {
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

  funcionario: {
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

NotaDespesaFuncionarioSchema.plugin(mongoosePaginate);
module.exports = mongoose.model(
  "NotaDespesaFuncionario",
  NotaDespesaFuncionarioSchema
);
