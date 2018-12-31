var express 		= require('express')
var router 			= express.Router()
var Pagamento = require('../models/pagamento')

router.route('/')
	.post((req, res) => {
		var pagamento = new Pagamento()
    pagamento.nome = req.body.nome
    pagamento.save((err) => {
      if (err) res.json(err)
      res.json(pagamento)
    })
	})
	.get((req, res) => {
    Pagamento.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Pagamento.findById(req.params.id)
      .exec((err, pagamento) => {
        if (err) res.json(err)
        res.json(pagamento)
      })
  })
  .put((req, res) => {
    Pagamento.findById(req.params.id)
      .exec((err, pagamento) => {
        pagamento.nome = req.body.nome
        pagamento.save((err) => {
          if (err) res.json(err)
          res.json(pagamento)
        })
      })
  })

router.route('/search')
  .post((req, res) => {
    Pagamento.findOne({
      nome: req.body.nome
    }, (err, pagamento) => {
      if (err) res.json(err)
      res.json(pagamento)
    })
  })


module.exports = router
