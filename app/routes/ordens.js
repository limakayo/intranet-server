var express 		= require('express')
var router 			= express.Router()

var Ordem = require('../models/ordem')
var Aprovacao = require('../models/aprovacao')
var Andamento = require('../models/andamento')
var Pagamento = require('../models/pagamento')

router.route('/')
	.post((req, res) => {
		let ordem = new Ordem(req.body)
    ordem.save((err) => {
      if (err) res.json(err)
      else res.json(ordem)
    })
	})
	.get((req, res) => {
    Ordem.find((err, results) => {
      if (err) res.json(err)
      res.json(results)
    })
	})

router.route('/last')
  .get((req, res) => {
    var result = {}
    Promise.all([
      Andamento.findOne({ nome: 'Aberta' }),
      Aprovacao.findOne({ nome: 'Aguardando' }),
      Pagamento.findOne({ nome: 'Crédito parcelado' }),
      Ordem.findOne().sort({ field: 'asc', _id: -1 })
    ])
    .then(([andamento, aprovacao, pagamento, ordem]) => {
      result.andamento = andamento._id
      result.aprovacao = aprovacao._id
      result.pagamento = pagamento._id
      result.numero = ordem.numero
      res.json(result)
    })
    .catch((err) => {
      console.log(err)
    })
  })

router.route('/:numero')
  .get((req, res) => {
    Ordem.findOne({ numero: req.params.numero })
      .populate('andamento')
      .populate('cliente')
      .exec((err, ordem) => {
        if (err) res.json(err)
        res.json(ordem)      })
  })
  .put((req, res) => {
    Ordem.findOneAndUpdate({ numero: req.params.numero }, req.body, (err, updated) => {
      Ordem.findOne({ numero: req.params.numero })
        .populate('andamento')
        .populate('cliente')
        .exec((err, ordem) => {
          if (err) res.json(err)
          res.json(ordem)
        })
    })
  })
  .delete((req, res) => {
    Ordem.remove({numero: req.params.numero}, (err) => {
      if (err) console.log(err)
      res.send('Removido com sucesso')
    })
  })

router.route('/andamento/:nome')
  .get((req, res) => {
    Ordem.find()
      .populate([
        {
          path: 'andamento',
          match: { nome: req.params.nome },
        },
        {
          path: 'cliente',
          select: 'nome'
        }
      ])
      .select('numero createdAt modelo andamento cliente')
      .exec((err, ordens) => {
        if (err) res.json(err)
        ordens = ordens.filter((e) => {
          return e.andamento !== undefined && e.andamento !== null
        })
        res.json(ordens)
      })
  })

router.route('/aprovacao/:nome')
  .get((req, res) => {
    Ordem.find()
      .populate([
        {
          path: 'aprovacao',
          match: { nome: req.params.nome }
        },
        {
          path: 'cliente',
          select: 'nome'
        },
        {
          path: 'andamento',
          match: {nome: 'Manutenção'}
        }
      ])
      .select('numero createdAt modelo aprovacao cliente andamento')
      .exec((err, ordens) => {
        if (err) res.json(err)
        ordens = ordens.filter((e) => {
          let aprovacao = e.aprovacao !== undefined && e.aprovacao !== null
          let andamento = e.andamento !== undefined && e.andamento !== null

          return aprovacao && andamento
        })
        res.json(ordens)
      })
  })

router.route('/garantia')
  .get((req, res) => {
    Ordem.find()
      .populate([
        {
          path: 'atendimento',
          match: { nome: 'Garantia' }
        },
        {
          path: 'cliente',
          select: 'nome'
        }
      ])
      .select('numero createdAt modelo atendimento cliente')
      .exec((err, ordens) => {
        if (err) res.json(err)
        ordens = ordens.filter((e) => {
          return e.atendimento !== undefined && e.atendimento !== null
        })
        res.json(ordens)
      })
  })

router.route('/cliente/:id')
  .get((req, res) => {
    Ordem.find({ cliente: req.params.id })
      .sort({ createdAt: -1 })
      .populate('andamento')
      .populate('cliente')
      .populate('equipamento')
      .populate('aprovacao')
      .exec((err, ordens) => {
        if (err) res.json(err)
        res.json(ordens)
      })
  })

router.route('/search')
  .post((req, res) => {
    Ordem.findOne({ numero: req.body.numero })
      .populate('andamento')
      .populate('cliente')
      .exec((err, ordem) => {
        if (err) res.json(err)
        res.json(ordem)
      })
  })

module.exports = router
