const { SlashCommandBuilder } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fish")
        .setDescription("🎮 Official Lamasticot Fishing Minigame !"),

    async execute(interaction) {
        const fishes = [
            "🐟 Cod",
            "🐠 Clownfish",
            "🦈 Shark",
            "🐡 Pufferfish",
            "ARCH-TEMPERED UTH DUNA !!!!!!!!!!"
        ];
        const randomFish = fishes[Math.floor(Math.random() * fishes.length)];
        await interaction.reply(`🎣 You cast your line...`);
        if (randomFish == "ARCH-TEMPERED UTH DUNA !!!!!!!!!!") {
            await interaction.followUp(`and caught a **${randomFish}**!`);
            const cmd = {
                path: "uth-duna.mp3",
                volume: 0.2,
                interval: 0,       // every 10 seconds
                randomChance: 1,     // 50% chance
                message: "THE FIGHT HAS BEGUN !",
            };

            playAudioCommand(interaction, cmd);
        }
        else {
            await interaction.followUp(`and caught a **${randomFish}**!`);
        }
    },
};
