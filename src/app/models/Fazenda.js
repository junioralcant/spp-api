const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const FazendaSchema = new mongoose.Schema({
  loja: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loja",
    required: true
  },

  grupo: {
    type: String,
    required: true
  },

  quemComprou: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  tipoDePagamento: {
    type: String,
    required: true
  },

  total: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

FazendaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Fazenda", FazendaSchema);
