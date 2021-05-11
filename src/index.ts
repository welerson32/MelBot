import Discord from 'discord.js';
import express from 'express';
import dotenv from 'dotenv';
import config from '../config.json';

dotenv.config();
const server = new express();
const client = new Discord.Client();

server.listen(process.env.PORT, () => {
  console.log(`Mel listening at port: ${process.env.PORT}`)
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(config.prefix);
});

client.on('message', msg => {

  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    msg.channel.send("Pinging...").then(m => {
      const ping = m.createdTimestamp - msg.createdTimestamp;

      m.edit(`**:ping_pong: Pong! Your Ping Is:** ${ping}ms`);
    });
  }

  if (command === 'config') {
    if (args[0] === 'prefix') {
      config.prefix = `${args[1]}`;
      msg.reply(`Prefixo alterado para ${args[1]}`);
    }
  }
});

client.login(process.env.TOKEN);