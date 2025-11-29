const { Client, GatewayIntentBits, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Client: MCClient } = require("minecraft-server-util");
const cron = require("node-cron");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const mcClient = new MCClient({
  host: process.env.MC_SERVER_IP,
  port: parseInt(process.env.MC_SERVER_PORT) || 25565,
  version: "1.20.1"
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  // Register slash commands
  const commands = [
    new SlashCommandBuilder()
      .setName("status")
      .setDescription("Check Minecraft server status"),
    new SlashCommandBuilder()
      .setName("players")
      .setDescription("Show online players"),
    new SlashCommandBuilder()
      .setName("whitelist")
      .setDescription("Manage whitelist")
      .addSubcommand(subcommand =>
        subcommand
          .setName("add")
          .setDescription("Add player to whitelist")
          .addStringOption(option =>
            option.setName("username").setDescription("Minecraft username").setRequired(true)
          )
      )
      .addSubcommand(subcommand =>
        subcommand
          .setName("remove")
          .setDescription("Remove player from whitelist")
          .addStringOption(option =>
            option.setName("username").setDescription("Minecraft username").setRequired(true)
          )
      ),
    new SlashCommandBuilder()
      .setName("backup")
      .setDescription("Create server backup")
  ];

  client.application.commands.set(commands);
});

// Server status command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "status") {
    try {
      const result = await mcClient.status();
      const embed = new EmbedBuilder()
        .setTitle("?? Server Online")
        .setColor(0x00ff00)
        .addFields(
          { name: "Version", value: result.version, inline: true },
          { name: "Players", value: `${result.players.online}/${result.players.max}`, inline: true },
          { name: "MOTD", value: result.description.toString(), inline: false }
        )
        .setTimestamp();
      
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setTitle("?? Server Offline")
        .setColor(0xff0000)
        .setDescription("Unable to connect to the Minecraft server")
        .setTimestamp();
      
      await interaction.reply({ embeds: [embed] });
    }
  }

  if (interaction.commandName === "players") {
    try {
      const result = await mcClient.status();
      if (result.players.online === 0) {
        await interaction.reply("No players are currently online.");
      } else {
        const playerList = result.players.sample ? 
          result.players.sample.map(p => `?? ${p.name}`).join("\n") :
          `${result.players.online} players online (names not available)`;
        
        const embed = new EmbedBuilder()
          .setTitle("?? Online Players")
          .setColor(0x0099ff)
          .setDescription(playerList)
          .setFooter({ text: `${result.players.online}/${result.players.max} players online` })
          .setTimestamp();
        
        await interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      await interaction.reply("? Unable to fetch player list. Server may be offline.");
    }
  }

  if (interaction.commandName === "whitelist") {
    const subcommand = interaction.options.getSubcommand();
    const username = interaction.options.getString("username");
    
    // This would require RCON integration for actual whitelist management
    const embed = new EmbedBuilder()
      .setTitle("?? Whitelist Management")
      .setColor(0xffaa00)
      .setDescription(`?? Whitelist ${subcommand} for "${username}" requires RCON setup.\n\nThis feature will be available once RCON is configured.`)
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  }

  if (interaction.commandName === "backup") {
    const embed = new EmbedBuilder()
      .setTitle("?? Server Backup")
      .setColor(0x9900ff)
      .setDescription("?? Backup feature requires server plugin integration.\n\nInstall a backup plugin like \"CoreProtect\" or \"WorldEdit\" to enable automated backups.")
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  }
});

// Auto server status check every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    const result = await mcClient.status();
    console.log(`Server check: Online - ${result.players.online}/${result.players.max} players`);
  } catch (error) {
    console.log("Server check: Offline");
  }
});

client.login(process.env.DISCORD_TOKEN);
