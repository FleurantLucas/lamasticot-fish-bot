// commands/fish/fishsuggest.js
const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

// Path to JSON file where suggestions will be stored
const suggestionsPath = path.join(__dirname, "../../data/fish_suggestions.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fishsuggest")
        .setDescription("💡 Suggest a new fish to add to the fishing pool")
        .addStringOption(option =>
            option.setName("fish")
                .setDescription("The name of the fish you want to suggest")
                .setRequired(true)
        ),

    async execute(interaction) {
        const suggestion = interaction.options.getString("fish");
        const user = interaction.user.tag;

        // Make sure directory exists
        const dir = path.dirname(suggestionsPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // If file doesn't exist, create it with an empty array
        if (!fs.existsSync(suggestionsPath)) {
            fs.writeFileSync(suggestionsPath, "[]", "utf8");
        }

        // Load existing suggestions
        let suggestions = [];
        try {
            const fileData = fs.readFileSync(suggestionsPath, "utf8");
            suggestions = JSON.parse(fileData);
        } catch (err) {
            console.error("❌ Failed to parse JSON:", err);
            suggestions = [];
        }

        // Add new suggestion
        const newEntry = {
            fish: suggestion,
            suggestedBy: user,
            timestamp: new Date().toISOString()
        };
        suggestions.push(newEntry);

        // Save back to file
        fs.writeFileSync(suggestionsPath, JSON.stringify(suggestions, null, 2), "utf8");

        await interaction.reply({
            content: `✅ Your fish suggestion **"${suggestion}"** has been recorded! 🎣`,
            flags: MessageFlags.Ephemeral
        });
    }
};
