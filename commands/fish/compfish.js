const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const { playAudioCommand } = require("../../utils/audioPlayer");
const { fetchWeatherAndReply } = require("./fishweather");
const fishpool = require("../../utils/fishpool");
const fs = require("fs");
const path = require("path");

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const cooldownFile = path.join(__dirname, "../../data/dailyfish.json");
const statsFile = path.join(__dirname, "../../data/dailystats.json");

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
function saveCooldowns(userId, userData) {
    let current = loadCooldowns(); // reload latest file
    current[userId] = userData;    // update only this user
    fs.writeFileSync(cooldownFile, JSON.stringify(current, null, 2));
}

// Auquarium Load JSON (create if missing)
function loadStats() {
    if (!fs.existsSync(statsFile)) {
        fs.writeFileSync(statsFile, "{}");
        return {};
    }

    const raw = fs.readFileSync(statsFile, "utf8").trim();
    if (!raw) {
        fs.writeFileSync(statsFile, "{}");
        return {};
    }

    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("❌ Failed to parse dailystats.json, resetting file:", e);
        fs.writeFileSync(statsFile, "{}");
        return {};
    }
}

// Auquarium Save JSON
function saveStats(userId, fishData) {
    let current = loadStats(); // reload latest file
    current[userId][fishData["fishId"]] = fishData["data"];    // update only this user
    fs.writeFileSync(statsFile, JSON.stringify(current, null, 2));
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

        // If first time fishing
        if (!userData.last) {
            userData.streak = 1;
            userData.last = now;
            saveCooldowns(userId, userData);
        } else {
            // Work out streak
            const diffMs = now - userData.last;
            const diffHours = diffMs / (1000 * 60 * 60);

            if (diffHours < 24) {
                // Too early to fish again
                const remaining = DAY - diffMs;
                const hours = Math.floor(remaining / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                return interaction.reply({
                    content: `⏳ You already fished! Try again in **${hours}h ${minutes}m**.\n🔥 Current streak: **${userData.streak}**`,
                    flags: MessageFlags.Ephemeral
                });
            } else if (diffHours < 48) {
                // Within grace window → streak continues
                userData.streak += 1;
            } else {
                // Missed window → reset streak
                userData.streak = 1;
            }

            // Update last fish time
            userData.last = now;
            saveCooldowns(userId, userData);
        }

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
        await interaction.followUp(
            `<@${interaction.user.id}> caught a **${fishRarity}** **${fish.name}**!\n🔥 Streak: **${userData.streak}**`
        );
    },
};
