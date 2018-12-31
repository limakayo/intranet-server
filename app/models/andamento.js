var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var andamentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
	ordem: Number
})

module.exports = mongoose.model('Andamento', andamentoSchema)
