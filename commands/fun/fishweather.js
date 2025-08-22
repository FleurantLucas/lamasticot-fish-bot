const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fishweather")
        .setDescription("Get the current weather for a preset location"),

    async execute(interaction) {
        // Hardcoded location
        const city = "Montreal"; // Change this to whatever city you want

        await interaction.deferReply();

        try {
            const apiKey = process.env.WEATHER_API_KEY; // from .env
            const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

            const response = await axios.get(url);
            const data = response.data;

            const location = `${data.location.name}, ${data.location.country}`;
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const icon = `https:${data.current.condition.icon}`;

            await interaction.editReply({
                content: `🌤 Current weather in **${location}**:\n**${temp}°C**, ${condition}`,
                files: [icon]
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply("❌ Could not fetch weather. Check the API key or location.");
        }
    },
};
