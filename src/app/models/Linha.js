const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const LinhaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  cidadeInicio: {
    type: String,
    required: true
  },

  cidadeFim: {
    type: String,
    required: true
  },

  encarregado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Encarregado",
    required: true
  },

  qtdTratores: {
    type: Number,
    required: false
  },

  qtdTratoristas: {
    type: Number,
    required: false
  },

  qtdTrabalhadoresManual: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

LinhaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Linha", LinhaSchema);
