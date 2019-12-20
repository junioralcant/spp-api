const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const VeiculoSchema = new mongoose.Schema({
  proprietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proprietario",
    required: true
  },

  tipo: {
    type: String,
    required: false
  },

  status: {
    type: String,
    required: false
  },

  modelo: {
    type: String,
    required: false
  },

  ano: {
    type: String,
    required: true
  },

  placa: {
    type: String,
    required: true
  },

  chassi: {
    type: String,
    required: true
  },

  numeroDeSerie: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

VeiculoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Veiculo", VeiculoSchema);
