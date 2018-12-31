var express 		= require('express')
var router 			= express.Router()
var Atendimento = require('../models/atendimento')

router.route('/')
	.post((req, res) => {
		var atendimento = new Atendimento()
    atendimento.nome = req.body.nome
    atendimento.save((err) => {
      if (err) res.json(err)
      res.json(atendimento)
    })
	})
	.get((req, res) => {
    Atendimento.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Atendimento.findById(req.params.id)
      .exec((err, atendimento) => {
        if (err) res.json(err)
        res.json(atendimento)
      })
  })
  .put((req, res) => {
    Atendimento.findById(req.params.id)
      .exec((err, atendimento) => {
        atendimento.nome = req.body.nome
        atendimento.save((err) => {
          if (err) res.json(err)
          res.json(atendimento)
        })
      })
  })

module.exports = router
