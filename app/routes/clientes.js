var express 		= require('express')
var router 			= express.Router()
var Cliente     = require('../models/cliente')

router.route('/')
	.post((req, res) => {
    var cliente = new Cliente(req.body)
    cliente.save((err) => {
      if (err) console.log(err)
      else res.json(cliente)
    })
	})
	.get((req, res) => {
    Cliente.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Cliente.findById(req.params.id)
      .exec((err, cliente) => {
        if (err) res.json(err)
        res.json(cliente)
      })
  })
  .put((req, res) => {
    Cliente.findByIdAndUpdate(req.params.id, req.body, (err, cliente) => {
      if (err) res.json(err)
      res.json(cliente)
    })
  })

router.route('/search')
  .post((req, res) => {
    var nome = req.body.nome
    var cep = req.body.cep
    var cnpj = req.body.cnpj
    var cpf = req.body.cpf

    Cliente.find({
      nome: new RegExp(nome, 'i'),
      cnpj: new RegExp(cnpj, 'i'),
      cep: new RegExp(cep, 'i'),
      cpf: new RegExp(cpf, 'i')
    }, (err, clientes) => {
      if (err) res.json(err)
      res.json(clientes)
    })
  })

module.exports = router
