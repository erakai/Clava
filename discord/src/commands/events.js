const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js')

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
      const subcommand = interaction.options.getSubcommand()
      if (subcommand === 'past') {
        interaction.reply("Display past events.")
      } else if (subcommand === 'upcoming') {
        interaction.reply("Display upcoming events.")
      } else if (subcommand === 'create') {
        const name = interaction.options.getString('name')

        // const target = interaction.options.getUser('target');
        // const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const confirm = new ButtonBuilder()
          .setCustomId('confirm')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
          .addComponents(cancel, confirm);

        await interaction.reply({ 
          content: "Create Event: \"" + name + "\""
                + "\nOn: " + "date",
          components: [row] });
      }
  }
}