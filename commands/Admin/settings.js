const Command = require('../../base/Command.js');
const { MessageEmbed } = require('discord.js');
const { TICKRED_EMOJI, TICKGREEN_EMOJI, SETTINGS_EMOJI } = process.env;

class Settings extends Command {
  constructor(client) {
    super(client, {
      name: "settings",
      description: "",
      category: "Администрирование",
      usage: "settings <view | get | edit> <KEY> <VALUE>",
      aliases: ["set"],
      guildOnly: true,
      permLevel: "Administrator"
    });
  }

  async run(message, [action, key, ...value]) { 
    message.delete().catch();
    if (!action) return await message.channel.send(this.help.usage)
    if (!message.guild.available) return this.client.logger.info(`Сервер "${message.guild.name}" (${message.guild.id}) недоступен.`);

    const settings = message.settings;
    const overrides = this.client.settings.get(message.guild.id);
    if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});
  
    if (action && action.toLowerCase() === "edit") {
      const embed = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Ключ настроек неккоректный.`);
      const embeds = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Ключ настроек не найден.`);
      if (!key) return message.channel.send(embeds);  
      if (!settings[key]) return message.channel.send(embed);

      const joinedValue = value.join(" ");
      const embeds1 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Вы должны вписать параметр на который хотите изменить.`);
      const embed1 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Этот парметр уже имеет это же значение.`);
      if (joinedValue.length < 1) return message.channel.send(embeds1);
      if (joinedValue === settings[key]) return message.channel.send(embed1);

      if (!this.client.settings.has(message.guild.id)) this.client.settings.set(message.guild.id, {});

      if (key.includes("Channel")) {
        const embedss = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Выбери нужный канал по названию \nНапример: **'810046974644453477'**, не **'#general'**`);
        if (joinedValue.startsWith("<" || "#")) return message.channel.send(embedss); 

        const channel = message.guild.channels.cache.get(`${joinedValue}`);
        const embedsss = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Канал с ID **"${joinedValue}"** не найден на этом сервере.`);
        if (!channel) return message.channel.send(embedsss);
      }

      if (key.includes("Role")) {
        const embed = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Выберите корректную роль по ID. \nНапример: **'810046974644453477'**, не **'@Mod'**`)
        if (joinedValue.startsWith("<" || "@")) return message.channel.send(embed);

        const role = message.guild.roles.cache.find(c => c.id === joinedValue);
        const embeds = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Роль с  ID **"${joinedValue}"** не найдена на данном сервере.`)
        if (!role) return message.channel.send(embeds);
      }

      if (key === "allowEconomy") {
        const embed = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Данный параметр может иметь аргуметом лишь 'true', 'false'.`)
        switch (joinedValue) {
          case "true":
          break;

          case "false":
          break;

          default: return message.channel.send(embed);
        }
      } 

      settings[key] = joinedValue;

      this.client.settings.set(message.guild.id, joinedValue, key);
      const succset = new MessageEmbed().setDescription(`${TICKGREEN_EMOJI} | Значение ключа **${key}** успешно изменено на **${joinedValue}**`)
      message.channel.send(succset);
    } else

    if (action && action.toLowerCase() === "del" || action === "reset") {
      const keys1 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Вы должны указать ключ для сброса.`)
      const keys2 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Данного ключа не существует в моих настройках.`)
      const keys3 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Этот ключ не имеет переопределения или уже использует значения по умолчанию.`)
      if (!key) return message.channel.send(keys1);
      if (!settings[key]) return message.channel.send(keys2);
      if (!overrides[key]) return message.channel.send(keys3);
      
      const response = await this.client.awaitReply(message, `❓ | Вы действительно хотите изменить параметр **${key}** на стандартные настройки **${settings[key]}**? (y / n)`);

      if (["y", "yes"].includes(response)) {

        this.client.settings.delete(message.guild.id, key);
        const reset1 = new MessageEmbed().setDescription(`${TICKGREEN_EMOJI} | **${key}** Успешно сброшен до стандартных настроек.`)
        message.channel.send(reset1);
      } else

      if (["n", "no", "cancel"].includes(response)) {
        const reset2 = new MessageEmbed().setDescription(`${TICKGREEN_EMOJI} | Ваше значение для ключа **${key}** осталось таким: **${settings[key]}**.`)
        message.channel.send(reset2);
      }
    } else
  
    if (action && action.toLowerCase() === "get") {
      const get1 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Вы должны указать корректный ключ для просмотра значения`)
      const get2 = new MessageEmbed().setDescription(`${TICKRED_EMOJI} | Данного ключа не существует в моих настройках`)
      const get3 = new MessageEmbed().setDescription(`${TICKGREEN_EMOJI} | Ваше значение для ключа **${key}** является таким: **${settings[key]}**.`)
      if (!key) return message.channel.send(get1);
      if (!settings[key]) return message.channel.send(get2);
      message.channel.send(get3);
      
    } else {
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`**${key}**${" ".repeat(20 - key.length)}= **${value}**`); 
      });
      const embed = new MessageEmbed()
      .setColor("#DA2037")
      .setAuthor(`Настройки сервера ${message.guild}`, `${message.author.displayAvatarURL()}`)
      .setDescription(`${SETTINGS_EMOJI} | ${array.join(`\n${SETTINGS_EMOJI} | `)}`)
      await message.channel.send({ embed });
    }
  }
}

module.exports = Settings;
