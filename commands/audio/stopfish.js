const { SlashCommandBuilder } = require("discord.js");
const { stopAudio } = require("../../utils/audioPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stopfish")
    .setDescription("🛑 Stop all Fish audio in the voice channel"),

  async execute(interaction) {
    // Check if the interaction is in a guild
    if (!interaction.guild) {
      return interaction.reply({
        content: "⚠️ This command can only be used in a server!",
        flags: MessageFlags.Ephemeral, // ephemeral response
      });
    }

    // Stop audio safely
    stopAudio(interaction);
  },
};