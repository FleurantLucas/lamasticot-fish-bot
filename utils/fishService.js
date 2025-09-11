import { supabase } from './supabase.js';

// Get all fishes
async function getFishes() {
  const { data, error } = await supabase.from('fishes').select('*');
  if (error) throw error;
  return data;
}

// Get a fish by ID
async function getFishById(id) {
  const { data, error } = await supabase.from('fishes').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

// Get all fishes for a given rarity
async function getFishByRarity(rarityId) {
  const { data, error } = await supabase.from('fishes').select('*').eq('rarity', rarityId);
  if (error) throw error;
  return data;
}

// Get rarities with their percent
async function getRarities() {
  const { data, error } = await supabase.from('fish_rarity').select('*');
  if (error) throw error;
  return data;
}

// Pick a random rarity based on percent
async function getRandomRarity() {
  const { data: rarities, error } = await supabase.from("fish_rarity").select("*");
  if (error) throw error;

  // Sort rarities by percent
  rarities.sort((a, b) => a.percent - b.percent);

  const roll = Math.random();
  let selected = rarities[rarities.length - 1]; // fallback highest
  for (const rarity of rarities) {
    if (roll < rarity.percent) {
      selected = rarity;
      break;
    }
  }
  return selected;
}

// Pick a random fish from a rarity
async function getRandomFish(rarityId) {
  const { data: fishes, error } = await supabase
    .from("fishes")
    .select("*")
    .eq("rarity", rarityId)
    .eq("catchable", true);

  if (error) throw error;

  return fishes[Math.floor(Math.random() * fishes.length)];
}

// Get user streak
async function getUserStreak(userId) {
  const { data, error } = await supabase
    .from("user_streaks")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error && error.code !== "PGRST116") throw error; // ignore not found
  return data;
}

// Upsert user streak
async function upsertUserStreak(userId, streak, lastFished) {
  const { error } = await supabase.from("user_streaks").upsert({
    user_id: userId,
    streak,
    last_fished: lastFished,
  });
  if (error) throw error;
}

async function recordCatch(userId, fishId) {
  // Try to increment if exists
  const { data, error } = await supabase
    .from("user_fishes")
    .upsert(
      { user_id: userId, fish_id: fishId, caught_count: 1 },
      { onConflict: ["user_id", "fish_id"] }
    );

  if (error) throw error;
  return data;
}

async function getUserFishes(userId) {
  const { data, error } = await supabase
    .from("user_fishes")
    .select(`
      fish_id,
      caught_count,
      fishes (
        id,
        name,
        fish_rarity (
          id,
          name,
          percent
        )
      )
    `)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

export {
  getRandomRarity,
  getRandomFish,
  getFishes,
  getFishById,
  getFishByRarity,
  getRarities,
  getUserStreak,
  upsertUserStreak,
  recordCatch,
  getUserFishes,
};