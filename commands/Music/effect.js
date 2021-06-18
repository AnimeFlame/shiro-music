const Command = require('../../base/Command.js');
const { MessageEmbed } = require(`discord.js`)

class Effect extends Command {
    constructor(client) {
        super(client, {
            name: 'effect',
            description: 'Устанавливает эффект трека',
            category: 'Music',
            usage: 'Использование команды: **effect** \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`. Для отключения эффекта впишите то же значение.',
            guildOnly: true,
            aliases: ['filter']
        });
    }

async run(message, args) {
    message.delete().catch()
    let djRole = message.guild.roles.cache.find(role => role.id === this.client.settings.get(message.guild.id).djRole);
    if (!args.length) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, ${this.help.usage}`))
    if (this.client.settings.get(message.guild.id).djRole === "none" && !djRole) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, У вас не установлена роль диджея, либо роль не была найдена.`).setFooter(`set edit djRole ID`))
    if (!message.member.roles.cache.some(x => x.id === `${djRole.id}`)) return message.channel.send(new MessageEmbed().setDescription(`**${message.author.username}**, У вас нет роли диджея для использования этой функции. \n Роль диджея - ${djRole}`))
    if (!message.member.voice.channel) return message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`**${message.author.username}**, Вы должны находиться в голосовом канале.`));
    const command = args.join(' ')
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = this.client.distube.setFilter(message, command);
        message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`Текущий фильтр трека:` + ` \`${(filter || "Выключен")}\`` ));
    } else {
        message.channel.send(new MessageEmbed().setColor('#9803fc').setDescription(`Возможные типы эффектов: \`3d\`, \`bassboost\`, \`echo\`, \`karaoke\`, \`nightcore\`, \`vaporwave\`. Для отключения эффекта впишите то же значение.` ));
        }
    }
}
module.exports = Effect;