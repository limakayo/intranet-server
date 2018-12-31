var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var pagamentoSchema = new Schema({
	nome: { type: String, unique: true, required: true },
})

module.exports = mongoose.model('Pagamento', pagamentoSchema)
