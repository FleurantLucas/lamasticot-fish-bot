const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spamfish")
    .setDescription("Launch an attack !"),

  async execute(interaction) {
    // Same config as your original code
    const cmd = {
      path: "fish-you-me-gas-station-clip-made-with-Voicemod.mp3",
      volume: 0.4,
      interval: 150,       // every 10 seconds
      randomChance: 1,     // 50% chance
      message: "Pew Pew",
    };

    playAudioCommand(interaction, cmd);
  },
};
