const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const AdiantamentoFuncionarioSchema = new mongoose.Schema({
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  nome: {
    type: String,
    required: true
  },

  data: {
    type: Date,
    required: true
  },

  valor: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

AdiantamentoFuncionarioSchema.plugin(mongoosePaginate);
module.exports = mongoose.model(
  "AdiantamentoFuncionario",
  AdiantamentoFuncionarioSchema
);
