require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔄 Deleting all guild commands...");

    const commands = await rest.get(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, "704019380245233775") // your server ID
    );

    for (const command of commands) {
      await rest.delete(
        `${Routes.applicationGuildCommands(process.env.CLIENT_ID, "704019380245233775")}/${command.id}`
      );
      console.log(`Deleted command: ${command.name}`);
    }

    console.log("✅ All commands deleted.");
  } catch (error) {
    console.error(error);
  }
})();
