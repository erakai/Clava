const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const ObjectId = require('mongoose').Types.ObjectId;
const guildSchema = require('../models/Guild.js')
const clubSchema = require('../models/Club.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Set the club this guild is associated with')
        .addStringOption(option =>
            option.setName('club-id')
                .setDescription('id of the club')
                .setRequired(true)),
    run: async ({ interaction }) => {

        var data = await guildSchema.findOne({GuildID: interaction.guild.id})
        const clubID = interaction.options.getString('club-id')

        if(!data) {
            data = await guildSchema.create({
                GuildID: interaction.guild.id,
                ClubID: ""
            })
        }

        const successEmbed = new EmbedBuilder()
            .setColor('#2fd085')
            .setTitle('Success')
            .setDescription('Successfully set the club ID!')

        const errorEmbed = new EmbedBuilder()
            .setColor('#ca4835')
            .setTitle('Error')
            .setDescription('The provided ID is invalid!')

        if(!ObjectId.isValid(clubID)) {
            interaction.reply( { embeds: [errorEmbed] } )
            return
        }
        const club = await clubSchema.findOne({_id: clubID})
        if(!club) {
            interaction.reply( { embeds: [errorEmbed] } )
            return
        }

        await guildSchema.findOneAndUpdate({GuildID: interaction.guild.id}, {ClubID: clubID})

        interaction.reply( { embeds: [successEmbed] } )

    }

}