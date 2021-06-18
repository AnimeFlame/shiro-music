const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Repeat extends Command {
    constructor(client) {
        super(client, {
            name: 'repeat',
            description: 'Авто-повторение',
            category: 'Music',
            usage: '',
            guildOnly: true,
            aliases: ['loop']
        });
    }

async run(message, args) {
    message.delete().catch()   
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в войс канале.`));
    let mode = this.client.distube.setRepeatMode(message, parseInt(args[0]));
    mode = mode ? mode == 2 ? "Повторить очередь" : "Повторить песню" : "Выключен";
    const repeat = new MessageEmbed().setColor('#9803fc').setDescription("Установлен режим повтора на `" + mode + "`")
    message.channel.send(repeat);

}
}
module.exports = Repeat;