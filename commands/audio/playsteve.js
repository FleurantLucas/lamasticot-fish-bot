const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playsteve")
    .setDescription("Play The one and only.... Poisson Steve"),

  async execute(interaction) {
    // Same config as your original code
    const cmd = {
      path: "stevefish.mp3",
      volume: 0.1,
      interval: 0,       // every 10 seconds
      randomChance: 1,     // 50% chance
      message: "LE POISSON STEVE",
    };

    playAudioCommand(interaction, cmd);
  },
};
