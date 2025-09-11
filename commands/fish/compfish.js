import { SlashCommandBuilder } from "discord.js";
import { getRandomRarity, getRandomFish, recordCatch } from "../../utils/fishService.js";
import { playAudioCommand } from "../../utils/audioPlayer.js";
import { supabase } from "../../utils/supabase.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const data = new SlashCommandBuilder()
  .setName("dailyfish")
  .setDescription("🎮 Official Daily Lamasticot Fishing Game!");

async function getUserStreak(userId) {
  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();
  
  if (error && error.code !== "PGRST116") throw error; // ignore not found
  return data || { user_id: userId, streak: 0, last_fished: null };
}

async function upsertUserStreak(userId, streak, last_fished) {
  const { error } = await supabase
    .from("user_streaks")
    .upsert({ user_id: userId, streak, last_fished });
  if (error) throw error;
}

export async function execute(interaction) {
  const userId = interaction.user.id;
  const now = new Date();

  // Fetch user streak
  let userData = await getUserStreak(userId);

  // Calculate streak
  let streak = userData.streak || 0;
  let lastFished = userData.last_fished ? new Date(userData.last_fished) : null;

  if (lastFished) {
    const diffMs = now - lastFished;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      const remaining = 24 - diffHours;
      const hours = Math.floor(remaining);
      const minutes = Math.floor((remaining % 1) * 60);
      return interaction.reply({
        content: `⏳ You already fished! Try again in **${hours}h ${minutes}m**.\n🔥 Current streak: **${streak}**`,
        flags: MessageFlags.Ephemeral,
      });
    } else if (diffHours < 48) {
      streak += 1; // consecutive day
    } else {
      streak = 1; // missed day
    }
  } else {
    streak = 1; // first time
  }

  // Update Supabase
  await upsertUserStreak(userId, streak, now.toISOString());

  // --- Fishing logic ---
  await interaction.reply(`🎣 You cast your line...`);
  if (Math.random() <= 0.2) {
    await wait(3000);
    await interaction.followUp(`the line is tense......`);
    await wait(3000);
  }

  const rarity = await getRandomRarity();
  const fish = await getRandomFish(rarity.id);

  await recordCatch(userId, fish.id);
  // Default
  await interaction.followUp(
    `<@${interaction.user.id}> caught a **${rarity.name}** **${fish.name}**!\n🔥 Streak: **${streak}**`
  );
}
