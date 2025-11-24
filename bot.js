import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();


const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

// /start — привет + inline кнопка
bot.onText(/\/start/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Профиль", callback_data: "profile" }
        ]
      ]
    }
  };

  bot.sendMessage(
    msg.chat.id,
    "Добро пожаловать в Stars Center!\n\n" +
    "Вы можете посмотреть свой профиль Telegram.",
    opts
  );
});

// Обработчик инлайн-кнопки "Профиль"
bot.on("callback_query", (query) => {
  if (query.data === "profile") {
    const user = query.from;

    const profileText =
      `📄 Ваш профиль:\n\n` +
      `• Username: @${user.username || "нет"}\n` +
      `• ID: ${user.id}\n` +
      `• Имя: ${user.first_name || "нет"}\n` +
      `• Язык: ${user.language_code || "нет"}\n`;

    bot.answerCallbackQuery(query.id);
    bot.sendMessage(query.message.chat.id, profileText);
  }
});

// На любое другое сообщение — нейтральный ответ
bot.on("message", (msg) => {
  if (!msg.text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "Используйте команду /start.");
  }
});