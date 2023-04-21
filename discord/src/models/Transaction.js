const { model, Schema, SchemaTypes } = require('mongoose')

const transactionSchema = new Schema({
  club_id: String,
  source: String,
  amount: Number,
  date: Number, // milis since epoch
})

module.exports = model('transaction', transactionSchema)