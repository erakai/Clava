const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js')
const ObjectId = require('mongoose').Types.ObjectId;
const guildSchema = require('../models/Guild.js')
const clubSchema = require('../models/Club.js')
const memberSchema = require('../models/Member.js')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('members')
      .setDescription('Display or add members to the club')
      .addSubcommand(subcommand =>
        subcommand
          .setName('view')
          .setDescription('View members'))
      .addSubcommand(subcommand =>
        subcommand
          .setName('create')
          .setDescription('Create a member')
          .addStringOption(option =>
            option.setName('name')
              .setDescription('The name of the member')
              .setRequired(true))
          .addStringOption(option =>
            option.setName('email')
              .setDescription('The email of the member')
              .setRequired(true))
          .addNumberOption(option =>
            option.setName('month')
              .setDescription('The date this member expires')
              .setRequired(true))
          .addNumberOption(option =>
            option.setName('day')
              .setDescription('The date this member expires')
              .setRequired(true))
          .addNumberOption(option =>
            option.setName('year')
              .setDescription('The date this member expires')
              .setRequired(true))),
    run: async ({ interaction }) => {

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
        await interaction.reply( { embeds: [errorEmbed] } )
        return
      }

      const subcommand = interaction.options.getSubcommand()
      if(subcommand == 'view') {

        const club = await clubSchema.findOne({_id: data.ClubID})
        const members = await memberSchema.find({club_id: data.ClubID})
        const pages = Math.floor((members.length - 1) / 15) + 1
        var page = 1;
        const memberEmbed = new EmbedBuilder()
          .setColor('#2fd085')
          .setTitle(`Members of ${club.name}`)
          .setFooter({ text: `Page: ${page}` })

        for(let i=0; i<members.length && i < 15; i++) {
          memberEmbed.addFields({name: 'Member', value: members[i].name})
        }

        if(members.length > 15) {
          const prev = new ButtonBuilder()
            .setCustomId('memberPrev')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true)

          const next = new ButtonBuilder()
            .setCustomId('memberNext')
            .setLabel('Next')
            .setStyle(ButtonStyle.Primary)

          const row = new ActionRowBuilder()
            .addComponents(prev, next)

          const response = await interaction.reply({ 
            embeds: [memberEmbed],
            components: [row] })

            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
              const collector = response.createMessageComponentCollector({ filter: collectorFilter, componentType: ComponentType.Button, time: 300000 });
              collector.on('collect', async i => {
                const customId = i.customId
                if (customId === 'memberPrev') {
                  page--
                  prev.setDisabled(page == 1)
                  next.setDisabled(page == pages)
                  const newEmbed = new EmbedBuilder()
                    .setColor('#2fd085')
                    .setTitle(`Members of ${club.name}`)
                    .setFooter({ text: `Page: ${page}` })
      
                  let count = 0
                  for(let index=(page-1)*15; index<members.length && count < 15; index++) {
                    newEmbed.addFields({name: 'Member', value: members[index].name})
                    count++
                  }
                  for(let index=count; index < 15; index++) {
                    newEmbed.addFields({name: 'Member', value: '-'})
                  }
                  await i.reply({embeds: [newEmbed], components: [row]})
                  await interaction.editReply({embeds: [newEmbed], components: [row]})
                  await i.deleteReply()
    
                } else if (customId === 'memberNext') {
                  page++
                  prev.setDisabled(page == 1)
                  next.setDisabled(page == pages)
                  const newEmbed = new EmbedBuilder()
                    .setColor('#2fd085')
                    .setTitle(`Members of ${club.name}`)
                    .setFooter({ text: `Page: ${page}` })
      
                  let count = 0
                  for(let index=(page-1)*15; index<members.length && count < 15; index++) {
                    newEmbed.addFields({name: 'Member', value: members[index].name})
                    count++
                  }
                  for(let index=count; index < 15; index++) {
                    newEmbed.addFields({name: 'Member', value: '-'})
                  }
                  await i.reply({embeds: [newEmbed], components: [row]})
                  await interaction.editReply({embeds: [newEmbed], components: [row]})
                  await i.deleteReply()
                }
              })        
            } catch (e) {
              console.log("timedout")
              await interaction.editReply({ embeds: [memberEmbed], components: [] });
              return
            }
        }

        else {
          await interaction.reply( {embeds: [memberEmbed] })
        }
        
      }
      else if(subcommand == 'create') {
        const name = interaction.options.getString('name')

        const emailIsValid = (email) => {
          return String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        if(!emailIsValid(interaction.options.getString('email'))) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#ca4835')
            .setTitle('Error')
            .setDescription('The email must be valid!')

          await interaction.reply( { embeds: [errorEmbed] } )
          return
        }

        if(interaction.options.getNumber('year') < 1 || interaction.options.getNumber('month') < 1 || interaction.options.getNumber('month') > 12 ||
           interaction.options.getNumber('day') < 1 || interaction.options.getNumber('day') > 31) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#ca4835')
            .setTitle('Error')
            .setDescription('The date must be valid!')

          await interaction.reply( { embeds: [errorEmbed] } )
          return
        }

        const date = new Date(interaction.options.getNumber('year'), 
                              interaction.options.getNumber('month') - 1, // months are 0 indexed
                              interaction.options.getNumber('day'))
                              .toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})
        const dateCheck = new Date(interaction.options.getNumber('year'), 
                                    interaction.options.getNumber('month') - 1, // months are 0 indexed
                                    interaction.options.getNumber('day'))

        if(dateCheck.getTime() < new Date().getTime()) {

          const errorEmbed = new EmbedBuilder()
            .setColor('#ca4835')
            .setTitle('Error')
            .setDescription('The provided date must be in the future!')

          await interaction.reply( { embeds: [errorEmbed] } )
          return
        }

        const createEmbed = new EmbedBuilder()
          .setTitle('Confirm Member Creation')
          .setDescription("Create Member: \"" + name + "\"\nExpires on: " + date)
          .setColor('#ffd300')

        const confirm = new ButtonBuilder()
          .setCustomId('memberConfirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Success)

        const cancel = new ButtonBuilder()
          .setCustomId('memberCancel')
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
          if (confirmation.customId === 'memberConfirm') {
            // create the new event

            data = await memberSchema.create({
              name: name,
              email: interaction.options.getString('email'),
              expiration: date,
              club_id: data.ClubID,
              tag_ids: []
            })
            if (!data) {
              createEmbed
              .setTitle("Member Creation Failed!")
              .setDescription("Member Name: " + name + "\nExpires on: " + date)
              .setColor('#ca4835')
              await confirmation.update({embeds: [createEmbed], components: []})
              return
            }
            createEmbed
            .setTitle("Member Successfully Created!")
            .setDescription("Member Name: " + name + "\nExpires on: " + date)
            .setColor('#2fd085')
            await confirmation.update({embeds: [createEmbed], components: []})

          } else if (confirmation.customId === 'memberCancel') {
            createEmbed
              .setTitle('Member Creation Cancelled')
              .setDescription("Member creation cancelled")
              .setColor('#7f8c8d')
            await confirmation.update({ embeds: [createEmbed], components: [] });
          }        
        } catch (e) {
          console.log("timedout")
          const timeoutEmbed = new EmbedBuilder()
            .setTitle('Member Creation Cancelled')
            .setDescription("Confirmation not received within 1 minute, cancelling")
            .setColor('#ca4835')
          console.log(e)
          await confirmation.update({ embeds: [timeoutEmbed], components: [] });
          return
        }
      }

    }

}