const { SlashCommandBuilder } = require('discord.js')
const guildSchema = require('../models/Guild.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get the status of the guild'),
    run: async ({ interaction }) => {

        const data = await guildSchema.findOne({GuildID: interaction.guild.id})

        if(!data) {
            guildSchema.create({
                GuildID: interaction.guild.id,
                ClubID: ""
            })
        }
        else if(data) {
            console.log("hello")
        }
    }

}