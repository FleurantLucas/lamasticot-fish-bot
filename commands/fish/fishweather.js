const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

const fetchWeatherAndReply = async (interaction, city = "Montreal") => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

        const response = await axios.get(url);
        const data = response.data;

        const location = `${data.location.name}, ${data.location.country}`;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = `https:${data.current.condition.icon}`;

        const messageContent = `🌤 Current weather in **${location}**:\n**${temp}°C**, ${condition}`;

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: messageContent, files: [icon] });
        } else {
            await interaction.deferReply();
            await interaction.editReply({ content: messageContent, files: [icon] });
        }

        return { location, temp, condition, icon };
    } catch (error) {
        console.error(error);
        const errorMessage = "❌ Could not fetch weather. Check the API key or location.";

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }

        return null;
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fishweather")
        .setDescription("Get the current weather for a preset location"),

    async execute(interaction) {
        await fetchWeatherAndReply(interaction, "Montreal");
    },

    fetchWeatherAndReply, // exported method
};
