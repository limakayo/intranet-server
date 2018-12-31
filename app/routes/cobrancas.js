var express 		= require('express')
var router 			= express.Router()
var Ordem      = require('../models/ordem')
var Andamento   = require('../models/andamento')
var Aprovacao   = require('../models/aprovacao')

function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[JSON.stringify(x[key])] = rv[JSON.stringify(x[key])] || []).push(x);
    return rv;
  }, {});
}

router.route('/')
	.get((req, res) => {
    Promise.all([
      Andamento.findOne({ nome: 'Fechada' }),
      Andamento.findOne({ nome: 'Entregue' }),
      Aprovacao.findOne({ nome: 'Aprovada' })
    ])
    .then(([fechada, entregue, aprovacao]) => {
      Ordem.find({
        $and: [
          {aprovacao: aprovacao._id },
          {$or: [{andamento: fechada._id}, {andamento: entregue._id}]},
          {$and: [{valorTotal: {$ne: ''}}, {valorTotal: {$ne: '0,00'}}]},
          {$or: [{dataPagamento: null}, {dataPagamento: ''}]}
        ]
      })
      .populate('cliente', 'nome')
      .exec((err, ordens) => {
        if (err) console.log(err)
        else res.json(groupBy(ordens, "cliente"))
      })
    })
    .catch((err) => {
      console.log(err)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Cobranca.findById(req.params.id)
      .exec((err, cobranca) => {
        if (err) res.json(err)
        res.json(cobranca)
      })
  })
  .put((req, res) => {
    Cobranca.findById(req.params.id)
      .exec((err, cobranca) => {
        cobranca.nome = req.body.nome
        cobranca.save((err) => {
          if (err) res.json(err)
          res.json(cobranca)
        })
      })
  })

module.exports = router
