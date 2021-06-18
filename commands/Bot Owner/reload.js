const Command = require('../../base/Command.js');

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: "reload",
      description: "",
      category: "Bot Owner",
      usage: "reload <COMMAND_NAME>",
      permLevel: "Bot Owner",
      aliases: ["r", "rel"],
    });
  }

  async run(message, args) { 
    if (!args[0]) return message.reply("You must provide a command to reload.");
    message.delete().catch();
    const commands = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
    if (!commands) return message.reply(`The command \`${args[0]}\` does not exist, nor is it an alias.`);

    let response = await this.client.unloadCommand(commands.conf.location, commands.help.name);
    if (response) return message.channel.send(`Error Unloading: \`${response}\`.`);

    response = this.client.loadCommand(commands.conf.location, commands.help.name);
    if (response) return message.channel.send(`Error loading: \`${response}\`.`);

    message.channel.send(`☑️ | Команда \`${commands.help.name}\` была перезагружена.`);
  }
}

module.exports = Reload;
