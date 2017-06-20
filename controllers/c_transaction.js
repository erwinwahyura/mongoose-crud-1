const m_transaction = require('../models/transaction.js')

var add = function(req, res) {
  var date = new Date()
  var transaction = new m_transaction({

    memberid: req.body.memberid,
    days: parseInt(req.body.days),
    out_date : new Date(),
    due_date: date.setDate(date.getDate() + parseInt(req.body.days)),
    //  fine: req.body.fine,
    booklist: req.body.booklist
  })
  transaction.save(function(err, result) {
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

var getAll = function(req, res) {
  m_transaction.find({}).populate('booklist').exec(function(err, result) {
    if(!err) {
      res.send(result)
    } else {
      res.send(err)
    }
  })
}

var getById = function(req, res) {
  let id = req.params._id
  var query = {_id : id}
  m_transaction.findById(query).populate('booklist').exec(function(err, result) {
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

var remove = function(req, res) {
  let id = req.params._id
  var myquery = {_id : id}
  m_transaction.remove(myquery, function(err, result) {
    if(!err) {
      console.log(result);
      res.send(`result success deleted!`)
    } else {
      res.send(err)
    }
  })
}

var edit = function(req, res) {
  let id = req.params._id
  var query_find = {_id : id}
  m_transaction.findById(query_find, function(err, result) {
    if (err) res.send(err);
    let temp = result.in_date = new Date()
    if (temp.getDate() - result.due_date.getDate() !== 0) {
      result.fine = ((result.in_date.getDate() - result.due_date.getDate())*5000)
      var denda = result.fine;
      console.log(result.fine);
    }
    var query_set = {memberid : result.memberid, days : result.days, out_date : result.out_date,
                     due_date : result.due_date}
    var query_new = {memberid : result.memberid,
                     days : result.days,
                     out_date : result.out_date,
                     due_date : result.due_date,
                     in_date : new Date(),
                     fine : denda
                   }
    m_transaction.update(query_set, query_new, function(err, newResult) {
      if (err) res.send(err);
      res.send(newResult)
    })
  })
}

module.exports = {
  add,
  remove,
  edit,
  getAll,
  getById
};
