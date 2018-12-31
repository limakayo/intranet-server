var express 		= require('express')
var router 			= express.Router()
var Equipamento = require('../models/equipamento')

router.route('/')
	.post((req, res) => {
		var equipamento = new Equipamento()
    equipamento.nome = req.body.nome
    equipamento.save((err) => {
      if (err) res.json(err)
      res.json(equipamento)
    })
	})
	.get((req, res) => {
    Equipamento.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Equipamento.findById(req.params.id)
      .exec((err, equipamento) => {
        if (err) res.json(err)
        res.json(equipamento)
      })
  })
  .put((req, res) => {
    Equipamento.findById(req.params.id)
      .exec((err, equipamento) => {
        equipamento.nome = req.body.nome
        equipamento.save((err) => {
          if (err) res.json(err)
          res.json(equipamento)
        })
      })
  })

module.exports = router
