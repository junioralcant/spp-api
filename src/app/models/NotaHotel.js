const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaHotelSchema = new mongoose.Schema({
  nomeNota: {
    type: String,
    required: true,
    default: "Despesa Hotel"
  },

  nome: {
    type: String,
    required: false
  },

  nomeLinha: {
    type: String,
    required: false
  },

  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true
  },

  linha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Linha",
    required: true
  },

  encarregado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
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

NotaHotelSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaHotel", NotaHotelSchema);
