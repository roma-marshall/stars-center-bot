import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

/* --------------------------------------------------
   /start — главное меню без emoji
-------------------------------------------------- */
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Добро пожаловать.\n\n" +
    "Этот бот предоставляет информационные разделы и базовые инструменты. " +
    "Выберите действие ниже.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Профиль", callback_data: "profile" },
            { text: "Информация", callback_data: "info" }
          ],
          [
            { text: "Текущее время", callback_data: "time" },
            { text: "Случайное число", callback_data: "random" }
          ],
          [
            { text: "Статус сервиса", callback_data: "status" }
          ]
        ]
      }
    }
  );
});

/* --------------------------------------------------
   Обработка inline-кнопок
-------------------------------------------------- */
bot.on("callback_query", async (query) => {
  const user = query.from;
  const chatId = query.message.chat.id;

  /* Профиль */
  if (query.data === "profile") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(
      chatId,
      `Профиль пользователя:\n\n` +
      `Имя: ${user.first_name || "не указано"}\n` +
      `Username: @${user.username || "нет"}\n` +
      `ID: ${user.id}\n` +
      `Язык: ${user.language_code || "нет"}`
    );
  }

  /* Информация */
  if (query.data === "info") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(
      chatId,
      "Информация:\n\n" +
      "Этот бот предоставляет базовые инструменты, справочные данные " +
      "и информацию. Сервис соответствует требованиям Telegram Bot Platform."
    );
  }

  /* Текущее время */
  if (query.data === "time") {
    bot.answerCallbackQuery(query.id);
    const now = new Date();
    bot.sendMessage(chatId, `Текущее время: ${now.toLocaleString()}`);
  }

  /* Случайное число */
  if (query.data === "random") {
    bot.answerCallbackQuery(query.id);
    const randomNum = Math.floor(Math.random() * 10000);
    bot.sendMessage(chatId, `Случайное число: ${randomNum}`);
  }

  /* Статус сервиса */
  if (query.data === "status") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(chatId, "Статус: сервис работает стабильно.");
  }
});

/* --------------------------------------------------
   Ответ на любые текстовые сообщения
-------------------------------------------------- */
bot.on("message", (msg) => {
  if (!msg.text.startsWith("/")) {
    bot.sendMessage(msg.chat.id, "Используйте команду /start.");
  }
});
