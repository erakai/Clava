const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('finances')
    .setDescription('Finance hub access')
    .addSubcommand(subcommand =>
      subcommand
        .setName('incomes')
        .setDescription('Display income transactions'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('expenses')
        .setDescription('Display expense transactions'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create new transaction')
        .addNumberOption(option =>
          option.setName('amount')
            .setDescription('The amount that is associated with the transaction.'))
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
            .setRequired(true))),
    run: async ({ interaction, client }) => {
      const subcommand = interaction.options.getSubcommand()
      if (subcommand === 'incomes') {
        interaction.reply("Display income transactions.")
      } else if (subcommand === 'expenses') {
        interaction.reply("Display expense transactions.")
      } else if (subcommand === 'create') {
        const amount = interaction.options.getNumber('amount')

        const income = new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Confirm Ban')
          .setStyle(ButtonStyle.Success);

        const expense = new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Confirm Ban')
          .setStyle(ButtonStyle.Success);

        const cancel = new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
          .addComponents(cancel, income, expense);

        await interaction.reply({ 
          content: "Create Transaction:\n" 
                + "Amount: " + amount + "\n"
                + "On: " + "date\n"
                + "Select Transaction Type:",
          components: [row] });
      }
  }
}