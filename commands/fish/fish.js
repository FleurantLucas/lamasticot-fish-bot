const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");
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
        if (Math.random() <= 0.3) {
            await wait(3000);
            await interaction.followUp(`the line is tense......`);
            await wait(3000);
        }
        if (fish.name == "ARCH-TEMPERED UTH DUNA ⭐⭐⭐") {
            await interaction.followUp(`somehow <@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!!!!!!!!!!!!!!!!!!!!!!!!!!`);
            const cmd = {
                path: "uth-duna.mp3",
                volume: 0.2,
                interval: 0,
                randomChance: 1,
                message: "THE FIGHT HAS BEGUN !",
            };

            await playAudioCommand(interaction, cmd);
        }
        else if (fish.name == "🦵💪🟠💪🦵 LE Poisson Steve !? ⭐") {
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
        else if (fish.name == "🦈 Megalodon !!! ⭐⭐⭐") {
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
        else if (fish.name == "🦐 Reaper Leviathan (welcome on 4546b) !!! ⭐⭐⭐") {
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
        else if (fish.name == "🐳 Laboon (To the Grand Line 🏴‍☠️) !!! ⭐⭐⭐") {
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
        else {
            await interaction.followUp(`<@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!`);
        }
    },
};
