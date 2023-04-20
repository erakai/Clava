const { model, Schema, SchemaTypes } = require('mongoose')

const ClubSchema = new Schema({
  name: String,
  description: [String],
  tran_ids: [String],
  reim_ids: [SchemaTypes.ObjectId],
  member_ids: [SchemaTypes.ObjectId],
  event_ids: [SchemaTypes.ObjectId],
  owner_id: SchemaTypes.ObjectId
})

module.exports = model('club', ClubSchema)

