const { SlashCommandBuilder } = require("discord.js");
const fishpool = require("../../utils/fishpool"); // adjust path where you stored it

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fishlist")
        .setDescription("📜 Shows all available fish and their rarities"),

    async execute(interaction) {
        let fishList = "🎣 **Fishing Pool** 🎣\n\n";

        for (const rarity of fishpool) {
            // Join fish names with a bullet separator
            const names = rarity.fish.map(f => f.name).join(" • ");
            fishList += `**${rarity.name} (${rarity.percent * 100}%)**: ${names}\n\n`;
        }

        await interaction.reply(fishList);
    }
};