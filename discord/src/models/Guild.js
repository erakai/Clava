const { model, Schema } = require('mongoose')

let guildSchema = new Schema({
    GuildID: String,
    ClubID: String
})

module.exports = model('guild', guildSchema)