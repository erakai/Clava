const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('hello bro'),
    run: ({ interaction, client }) => {
        interaction.reply(`Pong! ${client.ws.ping}ms`)
    }

}