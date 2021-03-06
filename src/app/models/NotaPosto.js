const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaPostoSchema = new mongoose.Schema({
  nomeNota: {
    type: String,
    required: true,
    default: "Despesa Posto"
  },

  nome: {
    type: String,
    required: false
  },

  posto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posto",
    required: true
  },

  linha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Linha",
    required: true
  },

  nomeMotorista: {
    type: String
  },

  nomeLinha: {
    type: String
  },

  motorista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  veiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Veiculo",
    required: false
  },

  numeroDaOrdem: {
    type: String,
    required: false
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

NotaPostoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaPosto", NotaPostoSchema);
