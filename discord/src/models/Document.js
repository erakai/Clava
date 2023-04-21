const { model, Schema, SchemaTypes } = require('mongoose')

const DocumentSchema = new Schema({
  name: String,
  link: String,
  club_id: SchemaTypes.ObjectId,
  role_ids: [SchemaTypes.ObjectId]
})

module.exports = model('document', DocumentSchema)