const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Resume extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            description: 'Продолжить воспроизведение',
            category: '',
            usage: '',
            guildOnly: true
        });
    }

async run(message) {
    message.delete().catch()
    let djRole = message.guild.roles.cache.find(role => role.id === this.client.settings.get(message.guild.id).djRole);
    if (this.client.settings.get(message.guild.id).djRole === "none" && !djRole) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, У вас не установлена роль диджея, либо роль не была найдена.`).setFooter(`set edit djRole ID`))
    if (!message.member.roles.cache.some(x => x.id === `${djRole.id}`)) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, У вас нет роли диджея для использования этой функции. \n Роль диджея - ${djRole}`))
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в голосовом канале.`));
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в войс канале.`));
    this.client.distube.resume(message);
    const resume = new MessageEmbed().setColor('#9803fc').setDescription(`**Трек продолжил воспроизведение.**`)
    message.channel.send(resume);
       }
}

module.exports = Resume;