const express = require('express')
var router = express.Router()
const c_book = require('../controllers/c_book')
const c_customer = require('../controllers/c_customer')
const c_transaction = require('../controllers/c_transaction')
router.get('/', function(req, res) {
  res.status(200).send({msg : 'Hi There! Im on Working right now!'})
})
//books
router.post('/api/books', c_book.add) //done
router.delete('/api/books/:_id', c_book.remove) //done
router.get('/api/books/', c_book.getAll) //done
router.get('/api/books/:_id', c_book.getById) //done
router.put('/api/books/:_id', c_book.edit) //done
//customers
router.post('/api/customers', c_customer.add) //done
router.get('/api/customers', c_customer.getAll) //done
router.get('/api/customers/:_id', c_customer.getById) //done
router.delete('/api/customers/:_id', c_customer.remove) //done
router.put('/api/customers/:_id', c_customer.edit) //done
//transactions

router.post('/api/transactions', c_transaction.add) //done
router.get('/api/transactions', c_transaction.getAll) //done
router.get('/api/transactions/:_id', c_transaction.getById) //done
router.delete('/api/transactions/:_id', c_transaction.remove) //done
router.put('/api/transactions/:_id', c_transaction.edit) //done

module.exports = router
