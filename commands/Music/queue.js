const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Queue extends Command {
    constructor(client) {
        super(client, {
            name: 'queue',
            description: 'Список воспроизведения',
            category: 'Music',
            usage: '',
            guildOnly: true
        });
    }

async run(message) {
    message.delete().catch()   
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в войс канале.`));
    let queue = this.client.distube.getQueue(message);
    const queuelist = new MessageEmbed().setColor('#9803fc').setDescription('**Список треков:**\n' + queue.songs.map((song, id) =>`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n"))
    message.channel.send(queuelist)
    }
}
module.exports = Queue;