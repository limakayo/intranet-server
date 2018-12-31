var express 		= require('express')
var router 			= express.Router()
var Transporte = require('../models/transporte')

router.route('/')
	.post((req, res) => {
		var transporte = new Transporte()
    transporte.nome = req.body.nome
    transporte.save((err) => {
      if (err) res.json(err)
      res.json(transporte)
    })
	})
	.get((req, res) => {
    Transporte.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/:id')
  .get((req, res) => {
    Transporte.findById(req.params.id)
      .exec((err, transporte) => {
        if (err) res.json(err)
        res.json(transporte)
      })
  })
  .put((req, res) => {
    Transporte.findById(req.params.id)
      .exec((err, transporte) => {
        transporte.nome = req.body.nome
        transporte.save((err) => {
          if (err) res.json(err)
          res.json(transporte)
        })
      })
  })

module.exports = router
