const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Volume extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            description: 'Устанавливает громкость музыки',
            category: 'Music',
            usage: 'volume [1-200]',
            guildOnly: true,
        });
    }

async run(message, args) {
    message.delete().catch()   
    if (!args.length) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, ${this.help.usage}`))
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в войс канале.`));
    this.client.distube.setVolume(message, args[0]);
    const setvolume = new MessageEmbed().setColor('#9803fc').setDescription(`Громкость музыки была установлена на: **${args[0]}%**`)
    message.channel.send(setvolume);
    }
}

module.exports = Volume;