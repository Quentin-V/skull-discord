const { MessageActionRow, MessageButton } = require('discord.js')

class Skull {
    constructor(users, bot, inter) {
        this.players = users.map(u => new Player(u))
        this.bot = bot
        this.inter = inter
        this.start()
    }

    start() {
        const btnFlower = new MessageButton().setLabel('Place flower').setCustomId('flower').setStyle('PRIMARY')
        const btnSkull = new MessageButton().setLabel('Place skull').setCustomId('skull').setStyle('PRIMARY')
        const actionRow = new MessageActionRow().addComponents([btnFlower, btnSkull])
        this.inter.editReply({content: `Game started!`, components: [actionRow]})
    }
}

class Player {
    constructor(user) {
        this.user = user
        this.hasSkull = true
        this.cardCount = 4
    }

    removeRandomCard() {
        --this.cardCount
        if(!this.hasSkull) return 
        const rand = Math.random()
        if(rand < 1 / (this.cardCount + 1)) this.hasSkull = false
    }
}

module.exports = {
    Skull : Skull
}