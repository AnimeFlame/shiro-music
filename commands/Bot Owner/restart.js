const Command = require('../../base/Command.js');
const { SHIRO_TOKEN } = process.env;

class Restart extends Command {
  constructor(client) {
    super(client, {
      name: "restart",
      description: "",
      category: "Администрирование",
      usage: "restart",
      guildOnly: true,
      permLevel: "Bot Admin"
    });
  }

  async run(message) { 
    message.delete().catch();
        try {
          await message.channel.send("🔄 | Брааатик, снова перезапуск? ..");
          this.client.commands.forEach(async cmd => {
            await this.client.unloadCommand(cmd);
          });
          process.exit(1);
        } catch (e) {
          this.client.logger.error(e);
        }
        this.client.login(SHIRO_TOKEN)
      }
    }

module.exports = Restart;