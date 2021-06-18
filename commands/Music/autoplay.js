const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Autoplay extends Command {
    constructor(client) {
        super(client, {
            name: 'autoplay',
            description: 'Продолжает воспроизведение треков.',
            category: 'Music',
            usage: '',
            guildOnly: true,
            aliases: ['at']
        });
    }

async run(message) {
    message.delete().catch()
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в войс канале.`));
        let mode = this.client.distube.toggleAutoplay(message);
        message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription("**Автовоспроизведение:** `" + (mode ? "Включено" : "Выключено") + "`"));
    }
}
module.exports = Autoplay;