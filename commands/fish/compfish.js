const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");
const { fetchWeatherAndReply } = require("./fishweather");
const fishpool = require("../../utils/fishpool");
const fs = require("fs");
const path = require("path");

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cooldownFile = path.join(__dirname, "../../data/dailyfish.json");

// Load JSON (create if missing)
function loadCooldowns() {
    if (!fs.existsSync(cooldownFile)) {
        fs.writeFileSync(cooldownFile, "{}");
        return {};
    }

    const raw = fs.readFileSync(cooldownFile, "utf8").trim();
    if (!raw) {
        fs.writeFileSync(cooldownFile, "{}");
        return {};
    }

    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("❌ Failed to parse dailyfish.json, resetting file:", e);
        fs.writeFileSync(cooldownFile, "{}");
        return {};
    }
}

// Save JSON
function saveCooldowns(data) {
    fs.writeFileSync(cooldownFile, JSON.stringify(data, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dailyfish")
        .setDescription("🎮 Official Daily Lamasticot Fishing Game !"),

    async execute(interaction) {
        const userId = interaction.user.id;
        const cooldowns = loadCooldowns();

        const now = Date.now();
        const DAY = 24 * 60 * 60 * 1000;

        let userData = cooldowns[userId] || { last: 0, streak: 0 };

        // Check if user already played today
        if (userData.last && (now - userData.last) < DAY) {
            const remaining = DAY - (now - userData.last);
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            return interaction.reply({
                content: `⏳ You already fished today! Try again in **${hours}h ${minutes}m**.\n🔥 Current streak: **${userData.streak}**`,
                flags: MessageFlags.Ephemeral
            });
        }

        // Work out streak
        const lastDate = new Date(userData.last);
        const today = new Date(now);

        const lastDay = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
        const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const diffDays = Math.floor((currentDay - lastDay) / DAY);

        if (diffDays === 1) {
            userData.streak += 1; // consecutive day
        } else if (diffDays > 1) {
            userData.streak = 1; // missed a day
        } else if (userData.streak === 0) {
            userData.streak = 1; // first time
        }

        // Register cooldown
        userData.last = now;
        cooldowns[userId] = userData;
        saveCooldowns(cooldowns);

        // ---- Fishing logic ----
        const rarityNumber = Math.random();
        let fish = { name: "🥾 Boot ?" };
        let fishRarity = "Strange";

        for (const rarity of fishpool) {
            if (rarityNumber < rarity.percent) {
                fish = rarity.fish[Math.floor(Math.random() * rarity.fish.length)];
                fishRarity = rarity.name;
                break;
            }
        }

        await interaction.reply(`🎣 You cast your line...`);
        if (Math.random() <= 0.2) {
            await wait(3000);
            await interaction.followUp(`the line is tense......`);
            await wait(3000);
        }
        await interaction.followUp(`<@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!\n🔥 Streak: **${userData.streak}**`);
    },
};
