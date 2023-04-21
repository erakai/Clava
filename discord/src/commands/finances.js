const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js')

module.exports = {
  //deleted: true, // This will delete your command
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
            .setDescription('The amount that is associated with the transaction.')
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
      if (subcommand === 'incomes') {
        interaction.reply("Display income transactions.")
      } else if (subcommand === 'expenses') {
        interaction.reply("Display expense transactions.")
      } else if (subcommand === 'create') {
        const amount = interaction.options.getNumber('amount')

        const income = new ButtonBuilder()
          .setCustomId('confirm_income')
          .setLabel('Confirm Income')
          .setStyle(ButtonStyle.Success);

        const expense = new ButtonBuilder()
          .setCustomId('confirm_expense')
          .setLabel('Confirm Expense')
          .setStyle(ButtonStyle.Success);

        const cancel = new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
          .addComponents(cancel, income, expense);

        const response = await interaction.reply({ 
          content: "Create Transaction:\n" 
                + "Amount: " + amount + "\n"
                + "On: " + "date\n"
                + "Select Transaction Type:",
          components: [row] });
      }
  }
}