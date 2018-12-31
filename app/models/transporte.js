var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var transporteSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

module.exports = mongoose.model('Transporte', transporteSchema)
