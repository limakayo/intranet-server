var express = require('express')
var router  = express.Router()
var Peca    = require('../models/peca')

router.route('/')
  .post((req, res) => {
    var peca = new Peca(req.body)
    peca.save((err) => {
      if (err) console.log(err)
      else res.json(peca)
    })
  })
  .get((req, res) => {
    Peca.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
  })

router.route('/:id')
  .get((req, res) => {
    Peca.findById(req.params.id)
      .exec((err, peca) => {
        if (err) res.json(err)
        res.json(peca)
      })
  })
  .put((req, res) => {
    Peca.findByIdAndUpdate(req.params.id, req.body, (err, peca) => {
      if (err) res.json(err)
      res.json(peca)
    })
  })

router.route('/search')
  .post((req, res) => {
    var nome = req.body.nome
    Peca.find({
      nome: new RegExp(nome, 'i')
    }, (err, pecas) => {
      if (err) res.json(err)
      res.json(pecas)
    })
  })

module.exports = router
