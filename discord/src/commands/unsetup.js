const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const ObjectId = require('mongoose').Types.ObjectId;
const guildSchema = require('../models/Guild.js')
const clubSchema = require('../models/Club.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unsetup')
        .setDescription('Unset the club this server is associated with'),
    run: async ({ interaction }) => {

        var data = await guildSchema.findOne({GuildID: interaction.guild.id})

        if(!data) {
            data = await guildSchema.create({
                GuildID: interaction.guild.id,
                ClubID: ""
            })
            return
        }

        const successEmbed = new EmbedBuilder()
            .setColor('#2fd085')
            .setTitle('Success')
            .setDescription('Successfully unset the club ID!')

        await guildSchema.findOneAndUpdate({GuildID: interaction.guild.id}, {ClubID: ""})

        interaction.reply( { embeds: [successEmbed] } )

    }

}