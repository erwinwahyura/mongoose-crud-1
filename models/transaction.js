var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
  memberid: String,
  days: String,
  out_date: Date,
  due_date: Date,
  in_date: Date,
  fine: Number,
  booklist:  [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

var transaction = mongoose.model('Transaction', transactionSchema);

module.exports = transaction
