const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const EncarregadoSchema = new mongoose.Schema({
  funcionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Funcionario",
    required: true
  },

  setor: {
    type: String,
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

EncarregadoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Encarregado", EncarregadoSchema);
