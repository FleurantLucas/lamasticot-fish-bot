require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    // 1️⃣ Load all command files
    const commands = [];
    const commandsPath = path.join(__dirname, "commands");
    
    const walkDir = (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const stat = fs.lstatSync(path.join(dir, file));
        if (stat.isDirectory()) {
          walkDir(path.join(dir, file));
        } else if (file.endsWith(".js")) {
          const command = require(path.join(dir, file));
          if (command.data) commands.push(command.data.toJSON());
        }
      }
    };

    walkDir(commandsPath);

    // 2️⃣ Deploy to GUILD (test server)
    console.log("🔄 Deploying commands to your test server (guild)...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, "704019380245233775"),
      { body: commands }
    );
    console.log("✅ Commands deployed instantly to your test server!");

    // 3️⃣ Deploy GLOBAL (all servers) — takes ~1h to update
    console.log("🔄 Deploying global commands (all servers, may take ~1 hour)...");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("✅ Global commands deployed!");
  } catch (error) {
    console.error(error);
  }
})();
