var express 		= require('express')
var router 			= express.Router()
var Aprovacao = require('../models/aprovacao')

router.route('/')
	.post((req, res) => {
		var aprovacao = new Aprovacao()
    aprovacao.nome = req.body.nome
    aprovacao.save((err) => {
      if (err) res.json(err)
      res.json(aprovacao)
    })
	})
	.get((req, res) => {
    Aprovacao.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Aprovacao.findById(req.params.id)
      .exec((err, aprovacao) => {
        if (err) res.json(err)
        res.json(aprovacao)
      })
  })
  .put((req, res) => {
    Aprovacao.findById(req.params.id)
      .exec((err, aprovacao) => {
        aprovacao.nome = req.body.nome
        aprovacao.save((err) => {
          if (err) res.json(err)
          res.json(aprovacao)
        })
      })
  })

router.route('/search')
  .post((req, res) => {
    Aprovacao.findOne({
      nome: req.body.nome
    }, (err, Aprovacao) => {
      if (err) res.json(err)
      res.json(Aprovacao)
    })
  })

module.exports = router
