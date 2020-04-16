const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaRestauranteSchema = new mongoose.Schema({
  nomeNota: {
    type: String,
    required: true,
    default: "Despesa Restaurante"
  },

  nome: {
    type: String,
    required: true
  },

  nomeLinha: {
    type: String
  },

  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurante",
    required: true
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

  tipoDePagamento: {
    type: String
  },

  valorUnitario: {
    type: Number,
    required: false
  },

  quantidade: {
    type: Number,
    required: false
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

NotaRestauranteSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaRestaurante", NotaRestauranteSchema);
