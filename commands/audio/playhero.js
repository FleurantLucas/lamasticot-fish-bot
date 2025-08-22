const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playhero")
    .setDescription("When you need motivation"),

  async execute(interaction) {
    // Same config as your original code
    const cmd = {
      path: "holding-out-for-a-hero.mp3",
      volume: 0.1,
      interval: 0,       // every 10 seconds
      randomChance: 1,     // 50% chance
      message: "I NEED A HERO !!!!!!",
    };

    playAudioCommand(interaction, cmd);
  },
};
