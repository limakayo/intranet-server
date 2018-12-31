var express    		= require('express')
		, app         = express()
		, cors        = require('cors')
  	, mongoose 	  = require('mongoose')
  	, bodyParser 	= require('body-parser')
  	, db

var clientes = require('./app/routes/clientes')
var ordens	 = require('./app/routes/ordens')
var equipamentos = require('./app/routes/equipamentos')
var atendimentos = require('./app/routes/atendimentos')
var transportes = require('./app/routes/transportes')
var andamentos = require('./app/routes/andamentos')
var pagamentos = require('./app/routes/pagamentos')
var aprovacoes = require('./app/routes/aprovacoes')
var pecas = require('./app/routes/pecas')
var cobrancas = require('./app/routes/cobrancas')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://limakayo:132934@ds023500.mlab.com:23500/intranet', {
	useMongoClient: true
})

var port = process.env.PORT || 8000

app.use('/api/clientes', clientes)
app.use('/api/ordens', ordens)
app.use('/api/equipamentos', equipamentos)
app.use('/api/atendimentos', atendimentos)
app.use('/api/transportes', transportes)
app.use('/api/andamentos', andamentos)
app.use('/api/pagamentos', pagamentos)
app.use('/api/aprovacoes', aprovacoes)
app.use('/api/pecas', pecas)
app.use('/api/cobrancas', cobrancas)

app.listen(port)
console.log('Magic happens on port: ' + port)


