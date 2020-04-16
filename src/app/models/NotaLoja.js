const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaLojaSchema = new mongoose.Schema({
  nomeNota: {
    type: String,
    required: true,
    default: "Despesa Loja"
  },

  nome: {
    type: String,
    required: false
  },

  nomeLinha: {
    type: String,
    required: false
  },

  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loja",
    required: true
  },

  veiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veiculo",
    required: false
  },

  encarregado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  linha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Linha",
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

  numeroDeOrdem: {
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

NotaLojaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaLoja", NotaLojaSchema);
