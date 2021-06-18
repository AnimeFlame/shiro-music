const Command = require("../../base/Command.js");
const { MessageEmbed } = require('discord.js');

class Commands extends Command {
  constructor(client) {
    super(client, {
      name: "commands",
      description: "Отправит вам все команды бота.",
      category: "Информация",
      usage: "commands [комадна]",
      aliases: ["cmd", "cmds", "help", "helpme"]
    });
  }
  

  async run(message) {
    message.delete().catch();
    const embed = new MessageEmbed()
       .setColor("RANDOM")
       .setAuthor('Команды')
       .addField('Music', '`play`, `skip`, `stop`, `autoplay`, `queue`, `autoplay`, `pause`, `repeat`, `volume`')
       .addField('Admin', '`settings`')
       .setTimestamp()
       .setFooter('• Music Bot')
     message.channel.send({ embed });
  }
}
module.exports = Commands;