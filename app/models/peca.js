var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var pecaSchema = new Schema({
	nome: String,
	valor: String
})

module.exports = mongoose.model('Peca', pecaSchema)
