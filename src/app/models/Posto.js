const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PostoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },

  cnpj: {
    type: String,
    required: false,
    unique: true
  },

  endereco: {
    type: String,
    required: true
  },

  cidade: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    required: true
  },

  cep: {
    type: String,
    required: false
  },

  telefone: {
    type: String,
    required: true
  },

  whatsapp: {
    type: String,
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

PostoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Posto", PostoSchema);
