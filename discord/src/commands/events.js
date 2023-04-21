const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const guildSchema = require('../models/Guild.js')
const eventSchema = require('../models/Event.js')

module.exports = {
  //deleted: true, // delete command
  data: new SlashCommandBuilder()
    .setName('events')
    .setDescription('Info about events')
    .addSubcommand(subcommand =>
      subcommand
        .setName('past')
        .setDescription('Display past events'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('upcoming')
        .setDescription('Display upcoming events'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create afasfsdfsdf new event')
        .addStringOption(option =>
          option.setName('name')
            .setDescription('The name of the new event')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('month')
            .setDescription('The date of the new event')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('day')
            .setDescription('The date of the new event')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('year')
            .setDescription('The date of the new event')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('description')
            .setDescription('The description of the new event')
            .setRequired(false))),
    run: async ({ interaction, client }) => {
      var data = await guildSchema.findOne({GuildID: interaction.guild.id})

      if(!data) {
        data = await guildSchema.create({
          GuildID: interaction.guild.id,
          ClubID: ""
        })
      }

      const errorEmbed = new EmbedBuilder()
        .setColor('#ca4835')
        .setTitle('Error')
        .setDescription('Your server does not have a club associated with it!')

      if(data.ClubID.length == 0) {
        interaction.reply( { embeds: [errorEmbed] } )
        return
      }

      // otherwise club associated with server, continue
      const subcommand = interaction.options.getSubcommand()
      if (subcommand === 'past') {
        interaction.reply("Display past events.")
      } else if (subcommand === 'upcoming') {
        interaction.reply("Display upcoming events.")
      } else if (subcommand === 'create') {
        
        const name = interaction.options.getString('name')
        const date = new Date(interaction.options.getNumber('year'), 
                              interaction.options.getNumber('month') - 1, // months are 0 indexed
                              interaction.options.getNumber('day'))
                              .toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})

        const createEmbed = new EmbedBuilder()
          .setTitle('Confirm Event Creation')
          .setDescription("Create Event: \"" + name + "\"\nDate: " + date)
          .setColor('#ffd300')

        const confirm = new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Success)

        const cancel = new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
          .addComponents(cancel, confirm);

        const response = await interaction.reply({ 
          embeds: [createEmbed],
          components: [row] });

        // filter so that only person who sent the slash command can actually confirm
        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
          const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
          if (confirmation.customId === 'confirm') {
            // create the new event

            data = await eventSchema.create({
              name: name,
              description: interaction.options.getString('description'),
              date: date,
              started: false,
              attendance: 0,
              club_id: data.ClubID
            })
            if (!data) {
              createEmbed
              .setTitle("Event Creation Failed!")
              .setDescription("Event Name: " + name + "\nDate: " + date)
              .setColor('#ca4835')
              await confirmation.update({embeds: [createEmbed], components: []})
              return
              //return res.status(500).send({err})
            }
            createEmbed
            .setTitle("Event Successfully Created!")
            .setDescription("Event Name: " + name + "\nDate: " + date)
            .setColor('#2fd085')
            await confirmation.update({embeds: [createEmbed], components: []})

          } else if (confirmation.customId === 'cancel') {
            createEmbed
              .setTitle('Event Creation Cancelled')
              .setDescription("Event creation cancelled")
              .setColor('#7f8c8d')
            await confirmation.update({ embeds: [createEmbed], components: [] });
          }        
        } catch (e) {
          console.log("timedout")
          const timeoutEmbed = new EmbedBuilder()
            .setTitle('Event Creation Cancelled')
            .setDescription("Confirmation not received within 1 minute, cancelling")
            .setColor('#ca4835')
          console.log(e)
          await confirmation.update({ embeds: [timeoutEmbed], components: [] });
          return
        }
      }
  }
}