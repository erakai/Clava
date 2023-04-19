require('dotenv/config')
const { Client, GatewayIntentBits } = require('discord.js')
const { CommandHandler } = require('djs-commander')
const path = require('path')

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
})

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events')
})

const TOKEN = process.env.BOT_TOKEN
client.login(TOKEN)