const {
  SHIRO_PREFIX
} = process.env;

const config = {

  defaultSettings: {
    "prefix": SHIRO_PREFIX,
    "djRole": "none"
  },
  
  permLevels: [
    // This is the lowest permisison level, this is for non-roled users. // Это самый низкий уровень разрешений, он предназначен для пользователей без полномочий.
    { level: 0,
      name: "User", 
      // Не утруждайтесь проверкой, просто верните true, что позволяет им выполнять любую команду на их уровне.
      check: () => true
    },
      // Simple check, if the user has permisson "MANAGE_MESSAGES", then it will return true.
      // Otherwise it will return false.
      // Простая проверка, если пользователь имеет права "MANAGE_MESSAGES", то вернет true.
      // В противном случае вернет false.
    { level: 2,
      name: "Manage Messages",
      check: (message) => {
        try {
          return message.guild.member(message.member).hasPermission("MANAGE_MESSAGES");
        } catch (ex) {
          return false;
        }
      }
    },
      // Simple check, if the user has permisson "MANAGE_ROLES", then it will return true.
      // Otherwise it will return false.
      // Простая проверка, если пользователь имеет права "MANAGE_ROLES", то вернет true.
      // В противном случае вернет false.
    { level: 3,
      name: "Manage Roles",
      check: (message) => {
        try {
          return message.guild.member(message.member).hasPermission("MANAGE_ROLES");
        } catch (ex) {
          return false;
        }
      }
    },
      // Simple check, if the user has permisson "Manage Guild", then it will return true.
      // Otherwise it will return false.
      // Простая проверка, если пользователь имеет права "Manage Guild", то вернет true.
      // В противном случае вернет false.
    { level: 4,
      name: "Manage Guild",
      check: (message) => {
        try {
          return message.guild.member(message.member).hasPermission("MANAGE_GUILD");
        } catch (ex) {
          return false;
        }
      }
    },
      // Simple check, if the user has permisson "Administrator", then it will return true.
      // Otherwise it will return false.
      // Простая проверка, если пользователь имеет права "Administrator", то вернет true.
      // В противном случае вернет false.
    { level: 5,
      name: "Administrator",
      check: (message) => {
        try {
          return message.guild.member(message.member).hasPermission("ADMINISTRATOR");
        } catch (ex) {
          return false;
        }
      }
    }, 
// Вы можете добавить свои уровня доступа по следующему примеру // You can add your own access levels as follows::
    // { level: 4, // - Уровень доступа по порядку // Acess Level Number
    //   name: "Manage Guild", // - Название используемое вами для установки в командах // The name you used to add in commands
    //   check: (message) => {
    //     try {
    //       return message.guild.member(message.member).hasPermission("MANAGE_GUILD"); // - Проверка на наличие прав // Checking for perms. [https://discord.com/developers/docs/topics/permissions]
    //     } catch (ex) {
    //       return false;
    //     }
    //   }
    // },

    // This is Server Owner / Это Владелец Сервера
    { level: 6,
      name: "Server Owner", 
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      // Простая проверка, если идентификатор владельца гильдии совпадает с идентификатором автора сообщения, то вернет true.
      // В противном случае вернет false.
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
    // Bot Owner, insert your ID. // Владелец Бота, вставьте ваш ID
    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.channel.type === "text" ? (message.author.id === "Your ID" ? true : false) : false
    }
  ]
}


module.exports = config;

