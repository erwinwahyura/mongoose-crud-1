const m_customer = require('../models/customer.js')

var add = function(req, res) {
  var customer = new m_customer({
    name: req.body.name,
    memberid: req.body.memberid,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone:req.body.phone
  })
  customer.save(function(err, result) {
    if (err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

var getAll = function(req, res) {
  m_customer.find({}, function(err, result) {
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

var getById = function(req, res) {
  m_customer.findById({_id: req.params._id}, function(err, result) {
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

var remove = function(req, res) {
  m_customer.remove({_id: req.params._id}, function(err, result) {
    err ? res.status(500).send(err) : res.status(200).send(result)
  })
}

var edit = function(req, res) {
  m_customer.findById({_id:req.params._id}, function(err, result) {
    if(err) res.status(500).send(err)
    m_customer.findOneAndUpdate({_id: req.params._id},
                            {$set: {name:req.body.name || result.name, memberid: req.body.memberid || result.memberid,
                                    address: req.body.address || result.address, zipcode: req.body.zipcode || result.zipcode,
                                    phone: req.body.phone || result.phone}}, function(err, newResult) {
      if(err) res.status(500).send(err)
      else res.status(200).send(newResult)
    })
  })
}

module.exports = {
  add,
  getAll,
  getById,
  remove,
  edit
}
