const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const NotaRestauranteSchema = new mongoose.Schema({
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurante",
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

NotaRestauranteSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("notaRestaurante", NotaRestauranteSchema);
