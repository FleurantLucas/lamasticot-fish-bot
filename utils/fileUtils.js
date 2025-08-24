const fs = require("fs");
const path = require("path");

// Load JSON (create if missing)
function loadFile(filename) {
    const file = path.join(__dirname, `../../data/${filename}.json`);
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "{}");
        return {};
    }

    const raw = fs.readFileSync(file, "utf8").trim();
    if (!raw) {
        fs.writeFileSync(file, "{}");
        return {};
    }

    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error(`❌ Failed to parse ${filename}.json, resetting file:`, e);
        fs.writeFileSync(file, "{}");
        return {};
    }
}

// Save JSON
function saveCooldowns(userId, userData) {
    let current = loadCooldowns(); // reload latest file
    current[userId] = userData;    // update only this user
    fs.writeFileSync(cooldownFile, JSON.stringify(current, null, 2));
}

module.exports = {
    loadFile
  };