const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaLojaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: false
  },
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
