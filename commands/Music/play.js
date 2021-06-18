const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Play extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            description: 'Установливает музыку для проигрования',
            category: '',
            usage: 'Использование: play [ссылка]',
            guildOnly: true
        });
    }

async run(message, args) {
        message.delete().catch()
        if (!args.length) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, ${this.help.usage}`))
        if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в войс канале.`));
        const music = args.join(" ");
        this.client.distube.play(message, music);
       }
}

module.exports = Play;