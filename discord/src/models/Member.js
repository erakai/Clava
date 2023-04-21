const { model, Schema, SchemaTypes } = require('mongoose')

let memberSchema = new Schema({
    name: String,
    email: String,
    expiration: SchemaTypes.Date,
    club_id: SchemaTypes.ObjectId,
    tag_ids: [SchemaTypes.ObjectId]
})

module.exports = model('member', memberSchema)