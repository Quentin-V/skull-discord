const { MessageActionRow, MessageButton } = require('discord.js')

class Skull {
    constructor(users, bot, inter) {
        this.players = users.map(u => new Player(u))
        this.bot = bot
        this.message = inter.
        this.start()
    }

    start() {
        const btnFlower = new MessageButton()
        btnFlower.setLabel('Place flower')
        btnFlower.setCustomId('flower')
        const btnSkull = new MessageButton()
        btnSkull.setLabel('Place skull')
        btnSkull.setCustomId('skull')
        const actionRow = new MessageActionRow()
        actionRow.addComponents([btnFlower, btnSkull])
        inter.editReply({content: `Game started!`, components: [actionRow]})
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