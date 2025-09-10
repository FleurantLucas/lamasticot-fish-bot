const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");
const { fetchWeatherAndReply } = require("./fishweather");
const { getRandomRarity, getRandomFish } = require("../../utils/fishService");
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("🎮 Official Lamasticot Fishing Minigame !"),

  async execute(interaction) {
    await interaction.reply(`🎣 You cast your line...`);

    if (Math.random() <= 0.2) {
      await wait(3000);
      await interaction.followUp(`the line is tense......`);
      await wait(3000);
    }

    // --- Supabase fetch instead of fishpool.js ---
    const rarity = await getRandomRarity();
    const fish = await getRandomFish(rarity.id);

    // --- Special cases ---
    if (fish.id == 1) {
      await interaction.followUp(
        `somehow <@${interaction.user.id}> caught a **${rarity.name}** **${fish.name}**!!!!!!!!!!!!!!!!!!!!!!!!!!`
      );
      await playAudioCommand(interaction, {
        path: "uth-duna.mp3",
        volume: 0.1,
        interval: 0,
        randomChance: 1,
        message: "THE FIGHT HAS BEGUN !",
      });
      return;
    }

    if (fish.id == 27) {
      await interaction.followUp(
        `<@${interaction.user.id}> caught **${rarity.name}** **${fish.name}**!`
      );
      await playAudioCommand(interaction, {
        path: "stevefish.mp3",
        volume: 0.1,
        interval: 0,
        randomChance: 1,
        message: "LE POISSON STEVE HAS BEEN CAUGHT !",
      });
      return;
    }

    if (fish.id == 34) {
      await interaction.followUp(
        `<@${interaction.user.id}> caught **${rarity.name}** **${fish.name}**!`
      );
      await playAudioCommand(interaction, {
        path: "megchase.mp3",
        volume: 0.1,
        interval: 0,
        randomChance: 1,
        message: "Load the cannons 🔫!",
      });
      return;
    }

    if (fish.id == 33) {
      await interaction.followUp(
        `<@${interaction.user.id}> caught **${rarity.name}** **${fish.name}**!`
      );
      await playAudioCommand(interaction, {
        path: "reaper.mp3",
        volume: 0.1,
        interval: 0,
        randomChance: 1,
        message: "Better run away unless you have a stasis riffle or gigantic balls",
      });
      return;
    }

    if (fish.id == 32) {
      await interaction.followUp(
        `<@${interaction.user.id}> caught **${rarity.name}** **${fish.name}**!`
      );
      await playAudioCommand(interaction, {
        path: "onepiece.mp3",
        volume: 0.1,
        interval: 0,
        randomChance: 1,
        message: "BECOME KING OF THE PIRATES",
      });
      return;
    }

    if (fish.id == 43) {
      await interaction.followUp(
        `<@${interaction.user.id}> caught **${rarity.name}** **${fish.name}**!`
      );
      await playAudioCommand(interaction, {
        path: "connection-terminated.mp3",
        volume: 0.1,
        interval: 0,
        randomChance: 1,
        message: "HE ALWAYS COMES BACK",
      });
      return;
    }

    if (fish.id == 24) {
      await interaction.followUp(
        `<@${interaction.user.id}> caught a **${rarity.name}** **${fish.name}**!`
      );
      await fetchWeatherAndReply(interaction);
      return;
    }

    if (fish.id == 52) {
      const rollD20 = Math.floor(Math.random() * 20) + 1;
      await interaction.followUp(
        `<@${interaction.user.id}> caught a **${rarity.name}** **${fish.name}**!`
      );
      await interaction.followUp(`The fish has spoken, it rolled a : ${rollD20}`);
      return;
    }

    // --- Default reply ---
    await interaction.followUp(
      `<@${interaction.user.id}> caught a **${rarity.name}** **${fish.name}**!`
    );
  },
};
