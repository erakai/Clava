const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js')
const guildSchema = require('../models/Guild.js')
const eventSchema = require('../models/Event.js')

module.exports = {
  //deleted: true, // delete command
  data: new SlashCommandBuilder()
    .setName('events')
    .setDescription('Info about events')
    .addSubcommand(subcommand =>
      subcommand
        .setName('view')
        .setDescription('View past events'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a new event')
        .addStringOption(option =>
          option.setName('name')
            .setDescription('The name of the new event')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('month')
            .setDescription('The month of the new event')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('day')
            .setDescription('The day of the new event')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('year')
            .setDescription('The year of the new event')
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
      if (subcommand === 'view') {
        let currPage = 1;

        // get array of events
        const events = await eventSchema.find({
          club_id: data.ClubID
        })
        if (!events) {
          viewEmbed
            .setTitle('Event Fetch Failed')
            //.setDescription("Event creation cancelled")
            .setColor('#7f8c8d')
          await confirmation.update({ embeds: [viewEmbed], components: [] });
        }

        if (events.length == 0) {
          const embed = new EmbedBuilder()
            .setTitle('Events')
            .setColor('#ffd300')
            .setDescription('No events to display.')
            interaction.reply({embeds: [embed]})
            return
        }

        const pageCount = Math.floor((events.length - 1) / 10) + 1
        // console.log("events " + events)
        
        const createEventsPageEmbed = () => {
          let embed = new EmbedBuilder()
            .setTitle('Events')
            .setColor('#ffd300')
            .setFooter({text: "Page: " + currPage})
          //let eventNames = "";
          for (let i = 0; i < 10; i++) {
            // get the 10 or less events on the curr page
            let index = (currPage - 1) * 10 + i
            if (index < events.length) {
              //console.log(events[index].name)
              embed.addFields({name: "Event", value: events[index].name})
            } else {
              embed.addFields({name: "Event", value: "-"})
            }
          }
          return embed
        }
        
        const prev = new ButtonBuilder()
          .setCustomId('events_prev_button')
          .setLabel('Prev')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(true) // start on first page

        const next = new ButtonBuilder()
          .setCustomId('events_next_button')
          .setLabel('Next')
          .setStyle(ButtonStyle.Primary)
          .setDisabled(currPage == pageCount) // if we are on last page
          
        const row = new ActionRowBuilder()
          .addComponents(prev, next);

        const viewEmbed = createEventsPageEmbed()

        const response = await interaction.reply({ 
          embeds: [viewEmbed],
          components: [row] });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
          const collector = response.createMessageComponentCollector({ filter: collectorFilter, componentType: ComponentType.Button, time: 300000 }); // times out in 5 mins
          collector.on('collect', async i => {
            const buttonId = i.customId;
            if (buttonId === 'events_prev_button') {
              // paginate backwards
              currPage--
              prev.setDisabled(currPage == 1)
              next.setDisabled(currPage == pageCount)
              const embed = createEventsPageEmbed()
              await i.reply({embeds: [embed], components: [row]})
              await interaction.editReply({embeds: [embed], components: [row]})
              await i.deleteReply()
            } else if (buttonId === 'events_next_button') {
              // paginate forwards
              currPage++
              prev.setDisabled(currPage == 1)
              next.setDisabled(currPage == pageCount)
              const embed = createEventsPageEmbed()
              await i.reply({embeds: [embed], components: [row]})
              await interaction.editReply({embeds: [embed], components: [row]})
              await i.deleteReply()
            }
            // await i.reply(`${i.user} has selected ${selection}!`);
          })
        } catch (e) {
          console.log(e)
        }

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
          .setCustomId('events_confirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Success)

        const cancel = new ButtonBuilder()
          .setCustomId('events_cancel')
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
          if (confirmation.customId === 'events_confirm') {
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
            }
            createEmbed
            .setTitle("Event Successfully Created!")
            .setDescription("Event Name: " + name + "\nDate: " + date)
            .setColor('#2fd085')
            await confirmation.update({embeds: [createEmbed], components: []})

          } else if (confirmation.customId === 'events_cancel') {
            createEmbed
              .setTitle('Event Creation Cancelled')
              .setDescription("Event creation cancelled")
              .setColor('#7f8c8d')
            await confirmation.update({ embeds: [createEmbed], components: [] });
          }       
        } catch (e) {
          //console.log("timedout")
          const timeoutEmbed = new EmbedBuilder()
            .setTitle('Event Creation Cancelled')
            .setDescription("Confirmation not received within 1 minute, cancelling")
            .setColor('#7f8c8d')
          await interaction.editReply({ embeds: [timeoutEmbed], components: [] });
          return
        }
      }
  }
}