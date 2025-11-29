# Minecraft Discord Bot

A powerful Discord bot for managing your Shockbyte Minecraft server with cool features and free hosting.

## Features

- ?? **Server Status** - Check if your server is online/offline
- ?? **Player List** - See who is currently online
- ?? **Whitelist Management** - Add/remove players from whitelist (with RCON)
- ?? **Backup Notifications** - Get alerts about server backups
- ?? **Auto Status Updates** - Automatic server monitoring every 5 minutes
- ?? **Beautiful Embeds** - Modern Discord interface

## Setup

### 1. Create Discord Bot
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" ? Create
3. Go to "Bot" tab ? Click "Add Bot"
4. Enable "Message Content Intent" and "Server Members Intent"
5. Copy the bot token

### 2. Invite Bot to Server
1. Go to "OAuth2" ? "URL Generator"
2. Select scopes: `bot`, `applications.commands`
3. Select permissions: `Send Messages`, `Embed Links`, `Use Application Commands`
4. Copy the URL and invite to your Discord server

### 3. Configure Bot
1. Copy `.env.example` to `.env`
2. Fill in your configuration:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   MC_SERVER_IP=your_shockbyte_server_ip
   MC_SERVER_PORT=25565
   DISCORD_CHANNEL_ID=your_main_channel_id
   ```

### 4. Install and Run
```bash
# Install dependencies
npm install

# Run the bot
npm start
```

## Commands

- `/status` - Check server status
- `/players` - Show online players
- `/whitelist add <username>` - Add player to whitelist
- `/whitelist remove <username>` - Remove player from whitelist
- `/backup` - Create server backup (requires plugin)

## Free Hosting Options

### Replit (Recommended)
1. Upload your bot files to [Replit](https://replit.com)
2. Add the secrets in the "Secrets" tab
3. Click "Run" to start your bot
4. Use "Keep Alive" package for 24/7 uptime

### Railway
1. Connect your GitHub repo to [Railway](https://railway.app)
2. Set environment variables
3. Deploy automatically

### Glitch
1. Import project to [Glitch](https://glitch.com)
2. Add `.env` file
3. Remix and run

## Advanced Features

### RCON Integration (Optional)
To enable whitelist management and server commands:
1. Enable RCON in your server.properties
2. Add to your .env:
   ```
   RCON_PASSWORD=your_rcon_password
   RCON_PORT=25575
   ```

### Backup Plugin Integration
Install these plugins on your Minecraft server:
- **CoreProtect** - For backup notifications
- **WorldEdit** - For manual backups
- **Multiverse** - For multi-world backups

## Troubleshooting

**Bot not responding?**
- Check Discord token is correct
- Ensure bot has proper permissions
- Verify server IP and port

**Server shows offline?**
- Confirm server is running on Shockbyte
- Check IP address in your Shockbyte panel
- Verify port (default 25565)

**Commands not working?**
- Make sure slash commands are enabled
- Re-invite bot with proper permissions
- Wait up to 1 hour for commands to register

## Support

Need help? Join our Discord community or create an issue on GitHub.

---

**Made with ?? for Minecraft server owners**
