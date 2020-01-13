const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaPostoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: false
  },

  posto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posto",
    required: true
  },

  motorista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  veiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veiculo",
    required: true
  },

  numeroDaOrdem: {
    type: String,
    required: false
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

NotaPostoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaPosto", NotaPostoSchema);
