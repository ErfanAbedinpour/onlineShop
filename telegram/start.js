const TelegramBot = require("node-telegram-bot-api");
const sendMessage = require("./sendAnswer");
require("dotenv").config();

const bot = new TelegramBot("7168098838:AAHHd1e-zMDGxdkV_b3GQlFCYopLydLfI7k", {
  polling: true,
});

bot.sendMessage("5985902466", "Inee");

bot.on("message", (msg) => {
  // send a message to the chat acknowledging receipt of their message
  console.log(msg.text);
});

module.exports = bot;
