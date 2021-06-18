var Discord = require('discord.js');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {

    this.client.user.setPresence({
      activity: { name: 'Shiro is active!' },
      status: 'idle',
    });

  // Cheking For Default Settings / Проверка Наличия Стандартных Настроек
    if (!this.client.settings.has("default")) {
      if (!this.client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
      this.client.settings.set("default", this.client.config.defaultSettings);
    } 

    this.client.logger.log(`Ready and logged in as ${this.client.user.tag}`, "ready");
  }
};
