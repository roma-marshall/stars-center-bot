import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Добро пожаловать в Stars Center! ⭐\n\n" +
    "Этот бот предоставляет справочную информацию, разделы профиля и базовые инструменты.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Профиль", callback_data: "profile" },
            { text: "Информация", callback_data: "info" }
          ],
          [
            { text: "Инструменты", callback_data: "tools" }
          ]
        ]
      }
    }
  );
});

// Профиль
bot.on("callback_query", (query) => {
  const user = query.from;

  if (query.data === "profile") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(
      query.message.chat.id,
      `📄 Ваш профиль:\n\n` +
      `• Username: @${user.username || "нет"}\n` +
      `• ID: ${user.id}\n` +
      `• Имя: ${user.first_name || "нет"}\n` +
      `• Язык: ${user.language_code || "нет"}`
    );
  }

  if (query.data === "info") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(
      query.message.chat.id,
      "ℹ️ Информация о Stars:\n\n" +
      "Stars — это внутренняя валюта Telegram Mini Apps.\n" +
      "Служит для покупки стикеров, подарков и сервисов."
    );
  }

  if (query.data === "tools") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(
      query.message.chat.id,
      "🔧 Инструменты Stars:\n\n" +
      "• Проверка профиля\n" +
      "• Основная информация\n" +
      "• Справочные материалы\n\n" +
      "Дополнительные инструменты появятся позже."
    );
  }
});

// fallback
bot.on("message", (msg) => {
  if (!msg.text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "Используйте команду /start");
  }
});
