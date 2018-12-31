var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var clienteSchema = new Schema({
	nome: String,
	cpf: String,
	cnpj: String,
	ie: String,
	parceria: Boolean,
	pessoaFisica: Boolean,
	cep: String,
	logradouro: String,
	numero: String,
	complemento: String,
	bairro: String,
	cidade: String,
	uf: String,
	observacoes: String,
	contatos: [],
}, { timestamps: true })

module.exports = mongoose.model('Cliente', clienteSchema)
