const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");
const { fetchWeatherAndReply } = require("./fishweather");
const fishpool = require("../../utils/fishpool");
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fish")
        .setDescription("🎮 Official Lamasticot Fishing Minigame !"),

    async execute(interaction) {

        const rarityNumber = Math.random();
        //console.log(rarityNumber);
        let fish = { name: "🥾 Boot ?" };
        let fishRarity = "Strange";

        for (const rarity of fishpool) {
            if (rarityNumber < rarity.percent) {
                fish = rarity.fish[Math.floor(Math.random() * rarity.fish.length)];
                fishRarity = rarity.name;
                break;
            }
        }

        //const randomFish = fishes[Math.floor(Math.random() * fishes.length)];
        await interaction.reply(`🎣 You cast your line...`);
        if (Math.random() <= 0.2) {
            await wait(3000);
            await interaction.followUp(`the line is tense......`);
            await wait(3000);
        }
        // Uth Duna
        if (fish.id == 1) {
            await interaction.followUp(`somehow <@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!!!!!!!!!!!!!!!!!!!!!!!!!!`);
            const cmd = {
                path: "uth-duna.mp3",
                volume: 0.1,
                interval: 0,
                randomChance: 1,
                message: "THE FIGHT HAS BEGUN !",
            };

            await playAudioCommand(interaction, cmd);
        }
        // Poisson Steve
        else if (fish.id == 27) {
            await interaction.followUp(`<@${interaction.user.id}> caught **${fishRarity}** **${fish.name}**!`);
            const cmd = {
                path: "stevefish.mp3",
                volume: 0.1,
                interval: 0,
                randomChance: 1,
                message: "LE POISSON STEVE HAS BEEN CAUGHT !",
            };

            await playAudioCommand(interaction, cmd);
        }
        // Megalodon
        else if (fish.id == 34) {
            await interaction.followUp(`<@${interaction.user.id}> caught **${fishRarity}** **${fish.name}**!`);
            const cmd = {
                path: "megchase.mp3",
                volume: 0.1,
                interval: 0,
                randomChance: 1,
                message: "Load the cannons 🔫!",
            };

            await playAudioCommand(interaction, cmd);
        }
        // Reaper Leviathan
        else if (fish.id == 33) {
            await interaction.followUp(`<@${interaction.user.id}> caught **${fishRarity}** **${fish.name}**!`);
            const cmd = {
                path: "reaper.mp3",
                volume: 0.1,
                interval: 0,
                randomChance: 1,
                message: "Better run away unless you have a stasis riffle or gigantic balls",
            };

            await playAudioCommand(interaction, cmd);
        }
        // Laboon
        else if (fish.id == 32) {
            await interaction.followUp(`<@${interaction.user.id}> caught **${fishRarity}** **${fish.name}**!`);
            const cmd = {
                path: "onepiece.mp3",
                volume: 0.1,
                interval: 0,
                randomChance: 1,
                message: "BECOME KING OF THE PIRATES",
            };

            await playAudioCommand(interaction, cmd);
        }
        // Purple Fish
        else if (fish.id == 43) {
            await interaction.followUp(`<@${interaction.user.id}> caught **${fishRarity}** **${fish.name}**!`);
            const cmd = {
                path: "connection-terminated.mp3",
                volume: 0.1,
                interval: 0,
                randomChance: 1,
                message: "HE ALWAYS COMES BACK",
            };

            await playAudioCommand(interaction, cmd);
        }
        // Weather Fish
        else if (fish.id == 24) {
            await interaction.followUp(`<@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!`);
            await fetchWeatherAndReply(interaction);
        }
        // D&D Fish
        else if (fish.id == 52) {
            const rollD20 = Math.floor(Math.random() * 20) + 1;
            await interaction.followUp(`<@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!`);
            await interaction.followUp(`The fish has spoken, it rolled a : ${rollD20}`);
        }
        else {
            await interaction.followUp(`<@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!`);
        }
    },
};
