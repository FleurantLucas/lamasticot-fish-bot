const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playdrunk")
    .setDescription("Driving in my car...... right after a beeeeeeeeeeeeeeeeeeeeeeeeeeer"),

  async execute(interaction) {
    // Same config as your original code
    const cmd = {
      path: "driving-in-my-car.mp3",
      volume: 0.1,
      interval: 0,       // every 10 seconds
      randomChance: 1,     // 50% chance
      message: "Driving in my car...... right after a beeeeeeeeeeeeeeeeeeeeeeeeeeer",
    };

    playAudioCommand(interaction, cmd);
  },
};
