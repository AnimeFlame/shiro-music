
const Command = require("../../base/Command.js");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "...",
      category: "...",
      usage: "...",
      permLevel: "Bot Owner"
    });
  }


  
  async run(message) {
    function clean(text) {
        if (typeof(text) === "string")
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
      }
    const args = message.content.split(" ").slice(1);
      try {
        const code = args.join(" ");
        let evaled = eval(code);
   
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
   
        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}
module.exports = Eval;