const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const AdiantamentoSchema = new mongoose.Schema({
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  linha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Linha",
    required: false
  },

  nomeFuncionario: {
    type: String,
    required: false
  },

  destino: {
    type: String,
    required: false
  },

  total: {
    type: Number,
    required: false
  },

  tipoDePagamento: {
    type: String,
    required: false
  },

  data: {
    type: Date,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

AdiantamentoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Adiantamento", AdiantamentoSchema);
