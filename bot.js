const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('painel')
    .setDescription('Mostra o painel do LegendMOR HUB'),
  new SlashCommandBuilder()
    .setName('gerarkey')
    .setDescription('Ajuda a gerar uma key')
    .addStringOption(option =>
      option.setName('usuario')
        .setDescription('Nome do usuário')
        .setRequired(true)),
  new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Ajuda a gerenciar a whitelist'),
  new SlashCommandBuilder()
    .setName('getscript')
    .setDescription('Informações para obter o script')
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`Bot conectado: ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('Comandos registrados!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
});

client.login(process.env.DISCORD_TOKEN);
