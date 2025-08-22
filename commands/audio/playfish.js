const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playfish")
    .setDescription("🎣 Play the Fish audio in your voice channel"),

  async execute(interaction) {
    // Same config as your original code
    const cmd = {
      path: "fish-you-me-gas-station-clip-made-with-Voicemod.mp3",
      volume: 0.4,
      interval: 10000,       // every 10 seconds
      randomChance: 0.5,     // 50% chance
      message: "The fish is playing..... or is it ?",
    };

    playAudioCommand(interaction, cmd);
  },
};
