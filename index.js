const { Client, GatewayIntentBits } = require("discord.js");
const ffmpeg = require("ffmpeg-static"); // ensures FFmpeg works cross-platform
const express = require("express");
require("dotenv").config();
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");

const TOKEN = process.env.TOKEN; // store token in environment variable for safety

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Map commands to audio files, volume, interval (ms), and random chance
const audioCommands = {
  "!playfish": {
    path: "./fish-you-me-gas-station-clip-made-with-Voicemod.mp3",
    volume: 0.4,
    interval: 10000,
    randomChance: 0.5,
    message: "The fish is playing..... or is it ?",
  },
  "!spamfish": {
    path: "./fish-you-me-gas-station-clip-made-with-Voicemod.mp3",
    volume: 0.4,
    interval: 100,
    randomChance: 1,
    message:
      "THE FISH HAS BEGUN IT'S ASSAULT ON THE SECOND TOWER !!!!!!!!!",
  },
  "!normalfish": {
    path: "./fish-you-me-gas-station-clip-made-with-Voicemod.mp3",
    volume: 0.4,
    interval: 10000,
    randomChance: 0.5,
    message: "The fish is playing as normal",
  },
  "!playsteve": {
    path: "./stevefish.mp3",
    volume: 0.1,
    interval: 0,
    randomChance: 1,
    message: "LE POISSON STEVE !!!!",
  }, // play once
};

const guildPlayers = new Map(); // Track per-guild connections, players, intervals

client.once("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const cmd = audioCommands[message.content];

  if (cmd) {
    const channel = message.member?.voice?.channel;
    if (!channel)
      return message.reply("❌ You must be in a voice channel.");

    let data = guildPlayers.get(message.guild.id);

    // If not already connected, join and create player
    if (!data) {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: message.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();
      connection.subscribe(player);

      data = { connection, player, intervals: [] };
      guildPlayers.set(message.guild.id, data);
    }

    const { player, intervals } = data;

    // Clear previous intervals to avoid overlapping commands
    intervals.forEach(clearInterval);
    data.intervals = [];

    // Function to play clip
    const playClip = () => {
      if (cmd.randomChance < 1 && Math.random() > cmd.randomChance) return;

      const resource = createAudioResource(cmd.path, { inlineVolume: true });
      resource.volume.setVolume(cmd.volume);
      player.play(resource);
    };

    playClip(); // play immediately

    // If interval is set, create repeating interval
    if (cmd.interval > 0) {
      const id = setInterval(playClip, cmd.interval);
      data.intervals.push(id);
    }

    message.reply(cmd.message);
  }

  // Stop command
  if (message.content === "!stopfish") {
    const data = guildPlayers.get(message.guild.id);
    if (data) {
      data.intervals.forEach(clearInterval);
      data.player.stop();
      data.connection.destroy();
      guildPlayers.delete(message.guild.id);
      message.reply("🛑 Stopped and left the channel.");
    } else {
      message.reply("⚠️ Not playing anything right now.");
    }
  }
});

// // --- Express web server setup ---
// const app = express();

// // Root endpoint (keep-alive)
// app.get("/", (req, res) => {
//   res.send("Bot is running!");
// });

// // Restart endpoint
// app.get("/restart", (req, res) => {
//   res.send("♻️ Restarting bot...");
//   console.log("Received restart request, exiting process...");
//   process.exit(0); // Render will auto-restart the service
// });

// app.listen(process.env.PORT || 3000, () => {
//   console.log("🌍 Web server is running.");
// });

client.login(TOKEN);
