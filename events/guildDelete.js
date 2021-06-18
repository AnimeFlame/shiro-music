module.exports = class {
  constructor(client) {
    this.client = client;
  }

async run(guild) {
  
          // Delete Server Settings / Удаление Настроек Сервера
            if (this.client.settings.has(guild.id)) {
              this.client.settings.delete(guild.id);
          
      }
    }
  }

