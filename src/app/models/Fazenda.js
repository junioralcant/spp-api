const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const FazendaSchema = new mongoose.Schema({
  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loja",
    required: true
  },

  gastoCom: {
    type: String,
    required: false
  },

  observacao: {
    type: String,
    required: false
  },

  quemComprou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  tipoDeCompra: {
    type: String,
    required: false
  },

  tipoDePagamento: {
    type: String,
    required: true
  },

  total: {
    type: String,
    required: true
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

FazendaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Fazenda", FazendaSchema);
