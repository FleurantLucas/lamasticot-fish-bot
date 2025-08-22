const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require("@discordjs/voice");
const { spawn } = require("child_process");
const ffmpeg = require("ffmpeg-static");
const path = require("path");

const guildPlayers = new Map(); // track players per guild

function playAudioCommand(interaction, cmd) {
  const channel = interaction.member.voice.channel;
  if (!channel) return interaction.reply("❌ You must be in a voice channel.");

  let data = guildPlayers.get(interaction.guild.id);

  // Join the voice channel if not already connected
  if (!data) {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: interaction.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const player = createAudioPlayer();
    connection.subscribe(player);

    data = { connection, player, intervals: [] };
    guildPlayers.set(interaction.guild.id, data);
  }

  const { player, intervals } = data;

  // Clear previous intervals
  intervals.forEach(clearInterval);
  data.intervals = [];

  const playClip = () => {
    if (cmd.randomChance < 1 && Math.random() > cmd.randomChance) return;

    const filePath = path.join(__dirname, "../audio", cmd.path);
    const ffmpegProcess = spawn(ffmpeg, [
      "-i",
      filePath,
      "-f",
      "s16le",
      "-ar",
      "48000",
      "-ac",
      "2",
      "pipe:1",
    ]);

    const resource = createAudioResource(ffmpegProcess.stdout, {
      inputType: StreamType.Raw,
      inlineVolume: true,
    });

    resource.volume.setVolume(cmd.volume);
    player.play(resource);
  };

  playClip(); // play immediately

  if (cmd.interval > 0) {
    const id = setInterval(playClip, cmd.interval);
    data.intervals.push(id);
  }

  if (!interaction.replied) {
    interaction.reply(cmd.message);
  }
  else {
    interaction.followUp(cmd.message);
  }
}

function stopAudio(interaction) {
  const data = guildPlayers.get(interaction.guild.id);
  if (data) {
    data.intervals.forEach(clearInterval);
    data.player.stop();
    data.connection.destroy();
    guildPlayers.delete(interaction.guild.id);
    interaction.reply("🛑 Stopped and left the channel.");
  } else {
    interaction.reply("⚠️ Not playing anything right now.");
  }
}

// ✅ Export both functions
module.exports = { playAudioCommand, stopAudio };
