const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fishgame")
        .setDescription("🎮 Start a simple fishing minigame"),

    async execute(interaction) {
        const fishes = [
            "🐟 Cod",
            "🐠 Clownfish",
            "🦈 Shark",
            "🐡 Pufferfish"
        ];
        const randomFish = fishes[Math.floor(Math.random() * fishes.length)];
        await interaction.reply(`🎣 You cast your line...`);
        await interaction.followUp(`and caught a **${randomFish}**!`);
    },
};
