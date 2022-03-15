const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING,], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const discordModals = require('discord-modals');
discordModals(client);
client._cmd = new Collection();

const commands = [];
const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./komutlar/${file}`);
	commands.push({
    name: command.name,
    description: command.description,
    options: command.options || [],
    type: 1
  });
  client._cmd.set(command.name, command)
}
const rest = new REST({ version: '9' }).setToken("TOKEN");
(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands("BOTİD", "SUNUCUİD"),
			{ body: commands },
		);
	} catch (error) {
		console.error(error);
	}
})();
client.on('interactionCreate', (interaction) => {
  const cmd = client._cmd.get(interaction.commandName);
  try {
    cmd.exe(client, interaction);
  } catch (e) {
    return;
  }
});

client.on('ready', () => {
  client.user.setPresence("Covid-19 Code <3 InFlames#2005  /ban")
})
client.on('modalSubmit', async (modal) => {
  if(modal.customId === 'ban') {
    try {
      if (!modal.member.permissions.has('BAN_MEMBERS')) return modal.reply(`Bu komutu kullanabilmek için **Üyeleri Banla** iznine sahip olmalısın!`);
      const user = modal.getTextInputValue('user');
      if(!modal.guild.members.cache.get(user)) return modal.reply(`İdsini girdiğiniz kullanıcıyı bulamıyorum lütfen sunucda olduğundan emin olun.`);
      if(user === modal.guild.ownerId) return modal.reply("Kurucunun idsini girdiniz kurucuyu banlayamam!");
      modal.guild.members.cache.get(user).ban()
     modal.reply("Emriniz olur efendim...")
    }
    catch (err) {
      modal.reply("Bir hata var geliştiricim ilgilenecektir.") && console.log(err);
    }
  }
});

client.login("TOKEN");  // InFlames#2005 <3 Covid-19 code altyapının paylaşılması yasaktır!