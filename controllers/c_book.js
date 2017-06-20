const m_book = require('../models/books.js')

var add = function (req, res) {
  var book = new m_book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    stock: req.body.stock
  })
  book.save(function(err, result) {
    if (err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

var remove = function(req, res) {
  m_book.remove({_id:req.params._id}, function(err, result) {
    if (err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

var getAll = function(req, res) {
  m_book.find({}, function(err, result) {
    if(err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

var getById = function(req, res) {
  m_book.findById({_id:req.params._id}, function(err, result) {
    if(err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

var edit = function(req, res) {
  m_book.findById({_id:req.params._id}, function(err, result) {
    if(err) res.status(500).send(err)
    // else res.status(200).send(result)
    m_book.findOneAndUpdate({_id: req.params._id},
                            {$set: {isbn:req.body.isbn || result.isbn, title: req.body.title || result.title,
                                    author: req.body.author || result.author, category: req.body.category || result.category,
                                    stock: req.body.stock || result.stock}}, function(err, newResult) {
      if(err) res.status(500).send(err)
      else res.status(200).send(newResult)
    })
  })
}

module.exports = {
  add,
  remove,
  getAll,
  getById,
  edit
}
