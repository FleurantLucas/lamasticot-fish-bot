const fishpool = [
    {
        rarity: 7, name: "Divine", percent: 0.001, fish: [
            { name: "The One Piece (didn't know it was real either) ⭐⭐⭐⭐⭐ ", id:39 },
        ]
    },
    {
        rarity: 6, name: "Legendary", percent: 0.05, fish: [
            { name: "ARCH-TEMPERED UTH DUNA ⭐⭐⭐", id:1 },
            { name: "🐉 Leviathan of the Depths ⭐⭐", id:37 },
            { name: "🌌 Lagiacrus ⭐⭐", id:36 },
            { name: "🦑 The Kraken (who has visibly been released) ⭐⭐", id:35 },
            { name: "🦈 Megalodon !!! ⭐⭐⭐", id:34 },
            { name: "🦐 Reaper Leviathan (welcome on 4546b) !!! ⭐⭐⭐", id:33 },
            { name: "🐳 Laboon (To the Grand Line 🏴‍☠️) !!! ⭐⭐⭐", id:32 },
            { name: "🟪 Purple Fish ⭐⭐⭐", id:43 },
            { name: "fISEKAI (i got reincarnated as a fish !!!) ⭐⭐", id:45 },
            { name: "Shiny Gyarados ⭐⭐", id:48 },
        ]
    },
    {
        rarity: 5, name: "L3g3ndaRy", percent: 0.09, fish: [
            { name: "🧽 Spongebob ??? ⭐⭐", id:31 },
            { name: "🥷 Arlong ⭐⭐", id:30 },
            { name: "👯‍♀️ CatFish (a cat in a fish cosplay) ⭐⭐", id:29 },
            { name: "♓ fosh ⭐", id:42 },
            { name: "🤖 M3Ch@-f15H (how does he even work in water ?) ⭐⭐", id:44 },
            { name: "📦 DIY fish (made out of glue and cardboard) ⭐⭐", id:50 },
        ]
    },
    {
        rarity: 4, name: "Epic", percent: 0.2, fish: [
            { name: "🐟 Chevalier Cuivré ⭐", id:28 },
            { name: "🦵💪🟠💪🦵 LE Poisson Steve !? ⭐", id:27 },
            { name: "🐡 Mola Mola (Ocean Sunfish) ⭐", id:26 },
            { name: "🦑 Kraken Hatchling ⭐", id:25 },
            { name: "⛅ Weather Fish ⭐", id:24 },
            { name: "🗿 Esquie- 'Bonjour, mon amis 🪨' ⭐", id:41 },
            { name: "🔵 Aqua (useless thing just throw her back in the sea)", id:46 },
            { name: "JOJO-FISH-JOJO-FISH-FISH-JOJO ⭐", id:51 },
        ]
    },
    {
        rarity: 3, name: "Rare", percent: 0.4, fish: [
            { name: "🦈 Great White Shark", id:23 },
            { name: "🎣 Swordfish", id:22 },
            { name: "🐠 Electric Eel", id:21 },
            { name: "🐊 Crocofish (???!)", id:20 },
            { name: "🐟🐟🐟 3 fish in a trenchcoat ??", id:19 },
            { name: "💵 20$", id:18 },
            { name: "🐡 Garry the Garryfish (very epic but not)", id:17 },
            { name: "🍣 Shrimp Fried Rice (in a tupperware)", id:40 },
            { name: "🍔 Krabby Patty (feels like it shouldn't be here)", id:49 },
            { name: "🎲 D&D Fish", id:52 },
        ]
    },
    {
        rarity: 2, name: "Uncommon", percent: 0.7, fish: [
            { name: "🐠 Clownfish", id:9 },
            { name: "🐟 Salmon", id:10 },
            { name: "🐟 Carp", id:11 },
            { name: "🐟 Anchovy", id:12 },
            { name: "🦀 Crab", id:13 },
            { name: "🦆 Rubber Ducky (who put this in here??)", id:14 },
            { name: "🥾 Left Boot", id:15 },
            { name: "👢 Right Boot", id:16 },
        ]
    },
    {
        rarity: 1, name: "Common", percent: 1, fish: [
            { name: "🐟 Cod", id:8 },
            { name: "🐟 Sardine", id:7 },
            { name: "🔴 Magicarp level 4", id:47 },
            { name: "🐟 Goldfish", id:6 },
            { name: "🐟 Tilapia", id:5 },
            { name: "🐟 Guppy", id:4 },
            { name: "🥔 Potato (wait… that’s not a fish)", id:3 },
            { name: "nothing (failed to fish 😢)", id:2 },
            { name: "💦 water (weird flex but ok)", id:38 },
        ]
    },
];

//Latest 52

const fishRarity = {
    7: {
        name: "Divine", percent: 0.001
    },
    6: {
        name: "Legendary", percent: 0.05
    },
    5: {
        name: "L3g3nd@ry", percent: 0.09
    },
    4: {
        name: "Epic", percent: 0.2
    },
    3: {
        name: "Rare", percent: 0.4
    },
    2: {
        name: "Uncommon", percent: 0.7
    },
    1: {
        name: "Common", percent: 1
    },
};

const fishes = {
    39: { id: 39, name: "The One Piece (didn't know it was real either) ⭐⭐⭐⭐⭐ ", rarity: 7, catchable: true },
  
    1: { id: 1, name: "ARCH-TEMPERED UTH DUNA ⭐⭐⭐", rarity: 6, catchable: true },
    37: { id: 37, name: "🐉 Leviathan of the Depths ⭐⭐", rarity: 6, catchable: true },
    36: { id: 36, name: "🌌 Lagiacrus ⭐⭐", rarity: 6, catchable: true },
    35: { id: 35, name: "🦑 The Kraken (who has visibly been released) ⭐⭐", rarity: 6, catchable: true },
    34: { id: 34, name: "🦈 Megalodon !!! ⭐⭐⭐", rarity: 6, catchable: true },
    33: { id: 33, name: "🦐 Reaper Leviathan (welcome on 4546b) !!! ⭐⭐⭐", rarity: 6, catchable: true },
    32: { id: 32, name: "🐳 Laboon (To the Grand Line 🏴‍☠️) !!! ⭐⭐⭐", rarity: 6, catchable: true },
    43: { id: 43, name: "🟪 Purple Fish ⭐⭐⭐", rarity: 6, catchable: true },
    45: { id: 45, name: "fISEKAI (i got reincarnated as a fish !!!) ⭐⭐", rarity: 6, catchable: true },
    48: { id: 48, name: "Shiny Gyarados ⭐⭐", rarity: 6, catchable: true },
  
    31: { id: 31, name: "🧽 Spongebob ??? ⭐⭐", rarity: 5, catchable: true },
    30: { id: 30, name: "🥷 Arlong ⭐⭐", rarity: 5, catchable: true },
    29: { id: 29, name: "👯‍♀️ CatFish (a cat in a fish cosplay) ⭐⭐", rarity: 5, catchable: true },
    42: { id: 42, name: "♓ fosh ⭐", rarity: 5, catchable: true },
    44: { id: 44, name: "🤖 M3Ch@-f15H (how does he even work in water ?) ⭐⭐", rarity: 5, catchable: true },
    50: { id: 50, name: "📦 DIY fish (made out of glue and cardboard) ⭐⭐", rarity: 5, catchable: true },
  
    28: { id: 28, name: "🐟 Chevalier Cuivré ⭐", rarity: 4, catchable: true },
    27: { id: 27, name: "🦵💪🟠💪🦵 LE Poisson Steve !? ⭐", rarity: 4, catchable: true },
    26: { id: 26, name: "🐡 Mola Mola (Ocean Sunfish) ⭐", rarity: 4, catchable: true },
    25: { id: 25, name: "🦑 Kraken Hatchling ⭐", rarity: 4, catchable: true },
    24: { id: 24, name: "⛅ Weather Fish ⭐", rarity: 4, catchable: true },
    41: { id: 41, name: "🗿 Esquie- 'Bonjour, mon amis 🪨' ⭐", rarity: 4, catchable: true },
    46: { id: 46, name: "🔵 Aqua (useless thing just throw her back in the sea)", rarity: 4, catchable: true },
    51: { id: 51, name: "JOJO-FISH-JOJO-FISH-FISH-JOJO ⭐", rarity: 4, catchable: true },
  
    23: { id: 23, name: "🦈 Great White Shark", rarity: 3, catchable: true },
    22: { id: 22, name: "🎣 Swordfish", rarity: 3, catchable: true },
    21: { id: 21, name: "🐠 Electric Eel", rarity: 3, catchable: true },
    20: { id: 20, name: "🐊 Crocofish (???!)", rarity: 3, catchable: true },
    19: { id: 19, name: "🐟🐟🐟 3 fish in a trenchcoat ??", rarity: 3, catchable: true },
    18: { id: 18, name: "💵 20$", rarity: 3, catchable: true },
    17: { id: 17, name: "🐡 Garry the Garryfish (very epic but not)", rarity: 3, catchable: true },
    40: { id: 40, name: "🍣 Shrimp Fried Rice (in a tupperware)", rarity: 3, catchable: true },
    49: { id: 49, name: "🍔 Krabby Patty (feels like it shouldn't be here)", rarity: 3, catchable: true },
    52: { id: 52, name: "🎲 D&D Fish", rarity: 3, catchable: true },
  
    9: { id: 9, name: "🐠 Clownfish", rarity: 2, catchable: true },
    10: { id: 10, name: "🐟 Salmon", rarity: 2, catchable: true },
    11: { id: 11, name: "🐟 Carp", rarity: 2, catchable: true },
    12: { id: 12, name: "🐟 Anchovy", rarity: 2, catchable: true },
    13: { id: 13, name: "🦀 Crab", rarity: 2, catchable: true },
    14: { id: 14, name: "🦆 Rubber Ducky (who put this in here??)", rarity: 2, catchable: true },
    15: { id: 15, name: "🥾 Left Boot", rarity: 2, catchable: true },
    16: { id: 16, name: "👢 Right Boot", rarity: 2, catchable: true },
  
    8: { id: 8, name: "🐟 Cod", rarity: 1, catchable: true },
    7: { id: 7, name: "🐟 Sardine", rarity: 1, catchable: true },
    47: { id: 47, name: "🔴 Magicarp level 4", rarity: 1, catchable: true },
    6: { id: 6, name: "🐟 Goldfish", rarity: 1, catchable: true },
    5: { id: 5, name: "🐟 Tilapia", rarity: 1, catchable: true },
    4: { id: 4, name: "🐟 Guppy", rarity: 1, catchable: true },
    3: { id: 3, name: "🥔 Potato (wait… that’s not a fish)", rarity: 1, catchable: true },
    2: { id: 2, name: "nothing (failed to fish 😢)", rarity: 1, catchable: true },
    38: { id: 38, name: "💦 water (weird flex but ok)", rarity: 1, catchable: true },
  };

  function getFishes({ id, rarity, catchable } = {}) {
    let results = Object.values(fishes);
  
    if (id !== undefined) {
      return fishes[id];
    }
  
    if (rarity !== undefined) {
      results = results.filter(f => f.rarity === rarity);
    }
  
    if (catchable !== undefined) {
      results = results.filter(f => f.catchable === catchable);
    }
  
    return results;
  }
  
  module.exports = {
    fishpool,
    fishRarity,
    fishes,
    getFishes
  };