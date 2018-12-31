var express 		= require('express')
var router 			= express.Router()
var Andamento = require('../models/andamento')

router.route('/')
	.post((req, res) => {
		var andamento = new Andamento()
    andamento.nome = req.body.nome
    andamento.ordem = req.body.ordem
    andamento.save((err) => {
      if (err) res.json(err)
      res.json(andamento)
    })
	})
	.get((req, res) => {
    Andamento.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Andamento.findById(req.params.id)
      .exec((err, andamento) => {
        if (err) res.json(err)
        res.json(andamento)
      })
  })
  .put((req, res) => {
    Andamento.findById(req.params.id)
      .exec((err, andamento) => {
        andamento.nome = req.body.nome
        andamento.ordem = req.body.ordem
        andamento.save((err) => {
          if (err) res.json(err)
          res.json(andamento)
        })
      })
  })

router.route('/search')
  .post((req, res) => {
    Andamento.findOne({
      nome: req.body.nome
    }, (err, Andamento) => {
      if (err) res.json(err)
      res.json(Andamento)
    })
  })

module.exports = router
