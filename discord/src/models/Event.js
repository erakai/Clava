const { model, Schema, SchemaTypes } = require('mongoose')

const eventSchema = new Schema({
  name: String, 
  date: Date,
  started: Boolean,
  description: String,
  attendance: Number,
  club_id: SchemaTypes.ObjectId
})

let guildSchema = new Schema({
  GuildID: String,
  ClubID: String
})

module.exports = model('event', eventSchema)