var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var atendimentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

module.exports = mongoose.model('Atendimento', atendimentoSchema)
