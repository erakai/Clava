const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const guildSchema = require('../models/Guild.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Get the status of the guild'),
    run: async ({ interaction }) => {

        var data = await guildSchema.findOne({GuildID: interaction.guild.id})

        if(!data) {
            data = await guildSchema.create({
                GuildID: interaction.guild.id,
                ClubID: ""
            })
        }

        const successEmbed = new EmbedBuilder()
            .setColor('#2fd085')
            .setTitle('Success')
            .setDescription('Your server has a club associated with it!')

        const errorEmbed = new EmbedBuilder()
            .setColor('#ca4835')
            .setTitle('Error')
            .setDescription('Your server does not have a club associated with it!')

        if(data.ClubID.length == 0) {
            interaction.reply( { embeds: [errorEmbed] } )
        }
        else {
            interaction.reply( { embeds: [successEmbed] } )
        }
    }

}