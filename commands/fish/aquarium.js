const { SlashCommandBuilder } = require("discord.js");
const { getUserFishes } = require("../../utils/fishService.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("myaquarium")
        .setDescription("📜 Shows all fishes you caught"),

    async execute(interaction) {
        const userId = interaction.user.id;
        const fishes = await getUserFishes(userId);

        if (fishes.length === 0) {
            await interaction.reply("🐟 You haven’t caught any fish yet!");
            return;
        }

        let reply = `🎣 <@${userId}>, here are your catches:\n`;
        for (const f of fishes) {
            reply += `- **${f.fishes.name}** (${f.fishes.fish_rarity.name}) × ${f.caught_count}\n`;
        }

        await interaction.reply(reply);
    }
};