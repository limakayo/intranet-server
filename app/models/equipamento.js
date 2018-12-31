var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var equipamentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

module.exports = mongoose.model('Equipamento', equipamentoSchema)
