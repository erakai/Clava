const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require('discord.js')
const ObjectId = require('mongoose').Types.ObjectId;
const guildSchema = require('../models/Guild.js')
const clubSchema = require('../models/Club.js')
const documentSchema = require('../models/Document.js')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('documents')
      .setDescription('Display or add documents to the club')
      .addSubcommand(subcommand =>
        subcommand
          .setName('view')
          .setDescription('View documents'))
      .addSubcommand(subcommand =>
        subcommand
          .setName('create')
          .setDescription('Create a document')
          .addStringOption(option =>
            option.setName('name')
              .setDescription('The name of the document')
              .setRequired(true))
          .addStringOption(option =>
            option.setName('link')
              .setDescription('The link of the document')
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
        const documents = await documentSchema.find({club_id: data.ClubID})
        const pages = Math.floor((documents.length - 1) / 10) + 1
        var page = 1;
        const documentEmbed = new EmbedBuilder()
          .setColor('#2fd085')
          .setTitle(`Documents of ${club.name}`)
          .setFooter({ text: `Page: ${page}` })

        for(let i=0; i<documents.length && i < 10; i++) {
          documentEmbed.addFields({name: 'Document', value: `**Name:** ${documents[i].name}\n**Link:** ${documents[i].link}`})
        }

        if(documents.length > 10) {
          const prev = new ButtonBuilder()
            .setCustomId('documentPrev')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true)

          const next = new ButtonBuilder()
            .setCustomId('documentNext')
            .setLabel('Next')
            .setStyle(ButtonStyle.Primary)

          const row = new ActionRowBuilder()
            .addComponents(prev, next)

          const response = await interaction.reply({ 
            embeds: [documentEmbed],
            components: [row] })

            const collectorFilter = i => i.user.id === interaction.user.id;

            try {
              const collector = response.createMessageComponentCollector({ filter: collectorFilter, componentType: ComponentType.Button, time: 300000 });
              collector.on('collect', async i => {
                const customId = i.customId
                if (customId === 'documentPrev') {
                  page--
                  prev.setDisabled(page == 1)
                  next.setDisabled(page == pages)
                  const newEmbed = new EmbedBuilder()
                    .setColor('#2fd085')
                    .setTitle(`Documents of ${club.name}`)
                    .setFooter({ text: `Page: ${page}` })
      
                  let count = 0
                  for(let index=(page-1)*10; index<documents.length && count < 10; index++) {
                    newEmbed.addFields({name: 'Document', value: `**Name:** ${documents[index].name}\n**Link:** ${documents[index].link}`})
                    count++
                  }
                  for(let index=count; index < 10; index++) {
                    newEmbed.addFields({name: 'Document', value: '-'})
                  }
                  await i.reply({embeds: [newEmbed], components: [row]})
                  await interaction.editReply({embeds: [newEmbed], components: [row]})
                  await i.deleteReply()
    
                } else if (customId === 'documentNext') {
                  page++
                  prev.setDisabled(page == 1)
                  next.setDisabled(page == pages)
                  const newEmbed = new EmbedBuilder()
                    .setColor('#2fd085')
                    .setTitle(`documents of ${club.name}`)
                    .setFooter({ text: `Page: ${page}` })
      
                  let count = 0
                  for(let index=(page-1)*10; index<documents.length && count < 10; index++) {
                    newEmbed.addFields({name: 'Document', value: `**Name:** ${documents[index].name}\n**Link:** ${documents[index].link}`})
                    count++
                  }
                  for(let index=count; index < 10; index++) {
                    newEmbed.addFields({name: 'Document', value: '-'})
                  }
                  await i.reply({embeds: [newEmbed], components: [row]})
                  await interaction.editReply({embeds: [newEmbed], components: [row]})
                  await i.deleteReply()
                }
              })        
            } catch (e) {
              console.log("timedout")
              await interaction.editReply({ embeds: [documentEmbed], components: [] });
              return
            }
        }

        else {
          await interaction.reply( {embeds: [documentEmbed] })
        }
        
      }
      else if(subcommand == 'create') {
        const name = interaction.options.getString('name')

        const isValidHttpUrl = (string) => {
          let url;
          try {
            url = new URL(string);
          } catch (_) {
            return false;
          }
          return url.protocol === "http:" || url.protocol === "https:";
        }

        const link = interaction.options.getString('link')

        if(!isValidHttpUrl(link)) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#ca4835')
            .setTitle('Error')
            .setDescription('The link must be valid!')

          await interaction.reply( { embeds: [errorEmbed] } )
          return
        }


        const createEmbed = new EmbedBuilder()
          .setTitle('Confirm Document Creation')
          .setDescription("Create Document: \"" + name + "\"\nLink: " + link)
          .setColor('#ffd300')

        const confirm = new ButtonBuilder()
          .setCustomId('documentConfirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Success)

        const cancel = new ButtonBuilder()
          .setCustomId('documentCancel')
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
          if (confirmation.customId === 'documentConfirm') {
            // create the new event

            data = await documentSchema.create({
              name: name,
              link: interaction.options.getString('link'),
              club_id: data.ClubID,
              role_ids: []
            })
            if (!data) {
              createEmbed
              .setTitle("Document Creation Failed!")
              .setDescription("Create Document: \"" + name + "\"\nLink: " + link)
              .setColor('#ca4835')
              await confirmation.update({embeds: [createEmbed], components: []})
              return
            }
            createEmbed
            .setTitle("Document Successfully Created!")
            .setDescription("Create Document: \"" + name + "\"\nLink: " + link)
            .setColor('#2fd085')
            await confirmation.update({embeds: [createEmbed], components: []})

          } else if (confirmation.customId === 'documentCancel') {
            createEmbed
              .setTitle('Document Creation Cancelled')
              .setDescription("Document creation cancelled")
              .setColor('#7f8c8d')
            await confirmation.update({ embeds: [createEmbed], components: [] });
          }        
        } catch (e) {
          console.log("timedout")
          const timeoutEmbed = new EmbedBuilder()
            .setTitle('Document Creation Cancelled')
            .setDescription("Confirmation not received within 1 minute, cancelling")
            .setColor('#ca4835')
          console.log(e)
          await confirmation.update({ embeds: [timeoutEmbed], components: [] });
          return
        }
      }

    }

}