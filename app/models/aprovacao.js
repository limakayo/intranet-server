var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var aprovacaoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
	ordem: Number
})

module.exports = mongoose.model('Aprovacao', aprovacaoSchema)
