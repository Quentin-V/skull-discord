const { token } = require('./config.json')
const { Client, Intents } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Skull } = require('./Game.js')

const bot = new Client({
	intents: [
		Intents.FLAGS.GUILDS, // This one is required for guild messages
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	],
})

bot.on('ready', async () => {
	console.log(`Connected as ${bot.user.tag}`) // Log connected

	const appCommandsManager = bot.application.commands
	const commands = await appCommandsManager.fetch()
	if (commands.size === 0) createStartCommand()
})

function createStartCommand() {
	const startCommand = new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starts a skull game')
		.addUserOption((option) => option.setName('player-1').setDescription('The first player').setRequired(true))
		.addUserOption((option) => option.setName('player-2').setDescription('The second player').setRequired(true))
		.addUserOption((option) => option.setName('player-3').setDescription('The third player').setRequired(false))
		.addUserOption((option) => option.setName('player-4').setDescription('The fourth player').setRequired(false))
		.addUserOption((option) => option.setName('player-5').setDescription('The fifth player').setRequired(false))
		.addUserOption((option) => option.setName('player-6').setDescription('The sixth player').setRequired(false))
    bot.application.commands.create(startCommand).then(() => {
        console.log('App command `start` has been created')
    })
}

bot.on('interactionCreate', (inter) => {
	if (inter.commandName === 'start') start(inter)
})

function start(inter) {
    inter.deferReply()
	const users = []
	for (let i = 1; i <= 8; ++i) {
		const u = inter.options.getUser(`joueur${i}`)
		if (u) users.push(u)
	}
	new Skull(users, bot, inter)
}

bot.login(token).then(() =>
    console.log(`Logged in`)
).catch((err) => {
    console.error(err)
})
