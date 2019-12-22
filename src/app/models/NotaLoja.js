const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaLojaSchema = new mongoose.Schema({
  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loja",
    required: true
  },

  encarregado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Encarregado",
    required: true
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

NotaLojaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaLoja", NotaLojaSchema);
