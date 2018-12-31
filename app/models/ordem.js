var mongoose = require('mongoose');
var Schema   = mongoose.Schema

var ordemSchema = new Schema({
	numero: { type: Number, default: 0 },
	marca: { type: String, default: '' },
	modelo: { type: String, default: '' },
	origem: { type: String, default: '' },
	serie: { type: String, default: '' },
	serieCompleto: { type: String, default: '' },
	modulo: { type: Boolean, default: false },
	garantia: { type: Boolean, default: false },
	defeito: { type: String, default: '' },
	defeitoTecnico: { type: String, default: '' },
	solucao: { type: String, default: '' },
	solucaoTecnica: { type: String, default: '' },
	pecas: { type: String, default: ''},
	tecnico: { type: String, default: '' },
	valorPecas: { type: Number, default: 0 },
	valorMo: { type: Number, default: 0 },
	valorTotal: { type: Number, default: 0 },
	prazoEntrega: { type: String, default: '' },
	condicaoPagamento: { type: String, default: '' },
	observacoesPagamento: { type: String, default: '' },
	dataPagamento: { type: String, default: '' },
	nfePagamento: { type: String, default: '' },
	observacoesOrcamento: { type: String, default: '' },
	dataFabricacao: { type: String, default: '' },
	dataHoraEntrada: Date,
	dataHoraOrcamento: Date,
	dataHoraAprovacao: Date,
	dataHoraPronto: Date,
	dataHoraFechada: Date,
	dataHoraEntregue: Date,
	fechada: { type: Boolean, default: false },
	entregue: { type: Boolean, default: false },
	aprovacao: { type: Schema.Types.ObjectId, ref: 'Aprovacao' },
	equipamento: { type: Schema.Types.ObjectId, ref: 'Equipamento' },
	cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
	andamento: { type: Schema.Types.ObjectId, ref: 'Andamento' },
	pagamento: { type: Schema.Types.ObjectId, ref: 'Pagamento' },
	atendimento: { type: Schema.Types.ObjectId, ref: 'Atendimento' },
	transporte: { type: Schema.Types.ObjectId, ref: 'Transporte' },
}, { timestamps: true })

module.exports = mongoose.model('Ordem', ordemSchema)
