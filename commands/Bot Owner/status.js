const Command = require('../../base/Command.js');

class Status extends Command {
  constructor(client) {
    super(client, {
      name: "status",
      description: "",
      category: "Администрирование",
      usage: "status <online | idle | dnd | invisible>",
      guildOnly: true,
      permLevel: "Bot Admin"
    });
  }

  async run(message, args) { 
    message.delete().catch();
    const status = args[0];
    if (!status) return message.reply("Статус был устновлен.");

    const statusType = args[0].toLowerCase();

    if (statusType === "online" || statusType === "idle" || statusType === "dnd" || statusType === "invisible") {
      this.client.user.setStatus(status);
      message.channel.send(`☑️ | Статус успешно изменён на **${statusType}**.`);
    } else {
      return message.channel.send(`"${statusType}" не является допустимым типом статуса.`);
    }
  }
}

module.exports = Status;