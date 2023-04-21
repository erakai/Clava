const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, ComponentType } = require('discord.js')
const guildSchema = require('../models/Guild.js')
const transactionSchema = require('../models/Transaction.js')

module.exports = {
  //deleted: true, // This will delete your command
  data: new SlashCommandBuilder()
  .setName('finances')
  .setDescription('Finance hub access')
  .addSubcommand(subcommand =>
    subcommand
      .setName('view')
      .setDescription('Display transactions'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('create')
      .setDescription('Create new transaction')
      .addStringOption(option =>
        option.setName('source')
          .setDescription('The source that is associated with the transaction')
          .setRequired(true))
      .addNumberOption(option =>
        option.setName('amount')
          .setDescription('The amount that is associated with the transaction')
          .setRequired(true))
      .addIntegerOption(option =>
        option.setName('month')
          .setDescription('The month of the transaction')
          .setRequired(true))
      .addIntegerOption(option =>
        option.setName('day')
          .setDescription('The day of the transaction')
          .setRequired(true))
      .addIntegerOption(option =>
        option.setName('year')
          .setDescription('The year of the transaction')
          .setRequired(true))),
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

      // get array of transactions
      const transactions = await transactionSchema.find({
        club_id: data.ClubID
      })
      if (!transactions) {
        errorEmbed
          .setTitle('Error')
          .setColor('#ca4835')
          .setDescription("Failed to fetch transactions")
        await confirmation.update({ embeds: [errorEmbed], components: [] });
        return
      }

      // get incomes and expenses
      const incomes = transactions.filter(x => x.amount > 0)
      // console.log(incomes)
      const expenses = transactions.filter(x => x.amount < 0)

      let isIncome = true
      let currIncomePage = 1
      let currExpensePage = 1
      const incomePageCount = Math.floor((incomes.length - 1) / 10) + 1
      const expensePageCount = Math.floor((expenses.length - 1) / 10) + 1

      const createTransactionEmbed = (transactions) => {
        let embed = new EmbedBuilder()
        .setTitle(isIncome ? 'Incomes' : 'Expenses')
        .setColor('#ffd300')
        if (transactions.length == 0) {
          if (isIncome) {
            embed
            .setTitle('Income Transactions')
            .setColor('#ffd300')
            .setDescription('No income transactions to display.')
          } else {
            embed
            .setTitle('Expense Transactions')
            .setColor('#ffd300')
            .setDescription('No expense transactions to display.')
          }
          return embed
        }
        let currPage = isIncome ? currIncomePage : currExpensePage
        for (let i = 0; i < 10; i++) {
          let index = (currPage - 1) * 10 + i
          if (index < transactions.length) {
            const e = transactions[index]
            let date = new Date(0)
            date.setUTCMilliseconds(e.date)
            let val = "**Date:** " + date.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})
            if (isIncome) {
              val += "\n**Amount:** $" + (Math.round(e.amount * 100) / 100).toFixed(2)
            } else {
              val += "\n**Amount:** $" + (Math.round(e.amount * -100) / 100).toFixed(2)
            }
            embed.addFields({name: e.source, value: val})
          }
        }
        embed.setFooter({text: "Page: " + (isIncome ? currIncomePage : currExpensePage)})
        return embed
      }

      // by default show incomeEmbed,
      // upon toggle button, show expenseEmbed
      const toggleTransactionView = new ButtonBuilder()
      .setCustomId('finance_toggle_button')
      .setLabel('See Expenses')
      .setStyle(ButtonStyle.Success)

      const prev = new ButtonBuilder()
        .setCustomId('finance_prev_button')
        .setLabel('Prev')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currIncomePage == 1) // start on first page

      const next = new ButtonBuilder()
        .setCustomId('finance_next_button')
        .setLabel('Next')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(currIncomePage == incomePageCount) // if we are on last page starting on income
        
      const row = new ActionRowBuilder()
        .addComponents(prev, next, toggleTransactionView);


      const embed = createTransactionEmbed(incomes)

      const response = await interaction.reply({embeds: [embed], components: [row]})

      const collectorFilter = i => i.user.id === interaction.user.id;

      try {
        const collector = response.createMessageComponentCollector({ filter: collectorFilter, componentType: ComponentType.Button, time: 300000 }); // times out in 5 mins
        collector.on('collect', async i => {
          const buttonId = i.customId;
          if (buttonId === 'finance_prev_button') {
            // paginate backwards
            let currPage
            let pageCount
            let embed
            if (isIncome) {
              currIncomePage--
              currPage = currIncomePage
              pageCount = incomePageCount
              embed = createTransactionEmbed(incomes)
            } else {
              currExpensePage--
              currPage = currExpensePage
              pageCount = expensePageCount
              embed = createTransactionEmbed(expenses)
            }
            prev.setDisabled(currPage == 1)
            next.setDisabled(currPage == pageCount)
            await i.reply({embeds: [embed], components: [row]})
            await interaction.editReply({embeds: [embed], components: [row]})
            await i.deleteReply()
          } else if (buttonId === 'finance_next_button') {
            // paginate forwards
            let currPage
            let pageCount
            let embed
            if (isIncome) {
              currIncomePage++
              currPage = currIncomePage
              pageCount = incomePageCount
              embed = createTransactionEmbed(incomes)
            } else {
              currExpensePage++
              currPage = currExpensePage
              pageCount = expensePageCount
              embed = createTransactionEmbed(expenses)
            }
            prev.setDisabled(currPage == 1)
            next.setDisabled(currPage == pageCount)
            await i.reply({embeds: [embed], components: [row]})
            await interaction.editReply({embeds: [embed], components: [row]})
            await i.deleteReply()
          } else if (buttonId === 'finance_toggle_button') {
            // switch and 
            isIncome = !isIncome
            toggleTransactionView.setLabel(isIncome ? 'See Expenses' : 'See Incomes')
            createTransactionEmbed(isIncome ? incomes : expenses)
            let embed = createTransactionEmbed(isIncome ? incomes : expenses)
            const currPage = isIncome ? currIncomePage : currExpensePage
            const pageCount = isIncome ? incomePageCount : expensePageCount
            prev.setDisabled(currPage == 1)
            next.setDisabled(currPage == pageCount)
            await i.reply({embeds: [embed], components: [row]})
            await interaction.editReply({embeds: [embed], components: [row]})
            await i.deleteReply()
          }
        })
      } catch (e) {
        console.log(e)
      }
    } else if (subcommand === 'create') {
      const amount = interaction.options.getNumber('amount')

      if (amount <= 0) {
        const errorEmbed = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('Amount provided must be a positive number')
        .setColor('#ca4835')
        await interaction.reply({embeds: [errorEmbed]})
        return
      }

      const source = interaction.options.getString('source')
      const date = new Date(interaction.options.getInteger('year'), 
        interaction.options.getInteger('month') - 1, // months are 0 indexed
        interaction.options.getInteger('day'))
      const dateString = date.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})

      const income = new ButtonBuilder()
        .setCustomId('finance_confirm_income')
        .setLabel('Confirm Income')
        .setStyle(ButtonStyle.Success);

      const expense = new ButtonBuilder()
        .setCustomId('finance_confirm_expense')
        .setLabel('Confirm Expense')
        .setStyle(ButtonStyle.Success);

      const cancel = new ButtonBuilder()
        .setCustomId('finance_cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder()
        .addComponents(cancel, income, expense);

      const embedDescription = "Source: " + source + "\n"
        + "Amount: $" + amount + "\n"
        + "Date: " + dateString + "\n"

      const createEmbed = new EmbedBuilder()
      .setTitle('Confirm Transaction Creation')
      .setDescription(embedDescription)
      .setColor('#ffd300')

      const response = await interaction.reply({ 
        embeds: [createEmbed],
        components: [row] });

      const collectorFilter = i => i.user.id === interaction.user.id;

      try {
        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
        if (confirmation.customId === 'finance_confirm_income') {
          // create the new income
          data = await transactionSchema.create({
            club_id: data.ClubID,
            source: source,
            amount: amount,
            date: date.getTime(),
          })

          if (!data) {
            createEmbed
            .setTitle("Transaction Creation Failed!")
            .setDescription("Income\n" + embedDescription)
            .setColor('#ca4835')
            await confirmation.update({embeds: [createEmbed], components: []})
            return
          }
          createEmbed
          .setTitle("Transaction Successfully Created!")
          .setDescription("Income\n" + embedDescription)
          .setColor('#2fd085')
          await confirmation.update({embeds: [createEmbed], components: []})

        } else if (confirmation.customId === 'finance_confirm_expense') {
          // create the new expense
          data = await transactionSchema.create({
            club_id: data.ClubID,
            source: source,
            amount: -amount,
            date: date.getTime(),
          })

          if (!data) {
            createEmbed
            .setTitle("Transaction Creation Failed!")
            .setDescription("Expense\n" + embedDescription)
            .setColor('#ca4835')
            await confirmation.update({embeds: [createEmbed], components: []})
            return
          }
          createEmbed
          .setTitle("Transaction Successfully Created!")
          .setDescription("Expense\n" + embedDescription)
          .setColor('#2fd085')
          await confirmation.update({embeds: [createEmbed], components: []})
        
        } else if (confirmation.customId === 'finance_cancel') {
          createEmbed
            .setTitle('Transaction Creation Cancelled')
            .setDescription("Transaction creation cancelled.")
            .setColor('#7f8c8d')
          await confirmation.update({ embeds: [createEmbed], components: [] });
        }       
      } catch (e) {
        console.log(e)
        const timeoutEmbed = new EmbedBuilder()
          .setTitle('Transaction Creation Cancelled')
          .setDescription("Confirmation not received within 1 minute, cancelling")
          .setColor('#7f8c8d')
        await interaction.editReply({ embeds: [timeoutEmbed], components: [] });
        return
      }
    }
  }
}