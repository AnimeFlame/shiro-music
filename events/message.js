module.exports = class {
  constructor(client) {
    this.client = client;
  }
  
  async run(message) {
    const { MessageEmbed } = require('discord.js');  
    if (message.author.bot) return;

    if (message.channel.type === "text" && !message.guild.me.hasPermission("SEND_MESSAGES")) return;

    const settings = message.guild ? this.client.getSettings(message.guild) : this.client.getSettings("default");

    message.settings = settings;

    if (message.content.indexOf(settings.prefix) !== 0) return;

    // Command settings / Настройки Команд
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const level = this.client.permlevel(message);
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send('Command is disallow.');

    if (cmd && cmd.conf.enabled === false)
      return message.channel.send('Command is disallow.');


    // Permission Level detctors
    if (level < this.client.levelCache[cmd.conf.permLevel]) {
        const embed = new MessageEmbed().setAuthor(`${message.author.username}, not allowed for you.`, `${message.author.displayAvatarURL()}`).setDescription(`Your rank - **${level}** (**${this.client.config.permLevels.find(l => l.level === level).name}**), command needed:\n **${this.client.levelCache[cmd.conf.permLevel]}** (**${cmd.conf.permLevel}**)`)
        return message.channel.send(embed);
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    // Logs whenever a user runs a command / Логирование Использования Команд
    this.client.logger.log(`${this.client.config.permLevels.find(l => l.level === level).name} ${message.author.tag} (${message.author.id}) Использовал команду ${cmd.help.name}`, "cmd");
    cmd.run(message, args, level, settings);
  }


};

