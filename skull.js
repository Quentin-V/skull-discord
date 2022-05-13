const { token } = require('./config.json')
const { Client, Intents } = require('discord.js')

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS, // This one is required for guild messages
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

bot.on("ready", async () => {
  console.log(`Connected as ${bot.user.tag}`); // Log connected
});


bot
  .login(token)
  .then(() => console.log(`Logged in`))
  .catch((err) => {
    console.error(err);
  });