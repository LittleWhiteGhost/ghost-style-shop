// Telegram Bot уведомления
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Замените на ваш токен
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // Замените на ваш chat_id

export const TelegramService = {
  // Отправить уведомление о новом заказе
  async sendOrderNotification(order: {
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    shippingAddress: { name: string; phone: string; address: string };
  }) {
    const itemsList = order.items
      .map(item => `• ${item.name} x${item.quantity} — ${(item.price * item.quantity).toLocaleString('ru-RU')} ₽`)
      .join('\n');

    const message = `
🛍️ <b>Новый заказ!</b>

👤 <b>Клиент:</b> ${order.shippingAddress.name}
📞 <b>Телефон:</b> ${order.shippingAddress.phone}
📍 <b>Адрес:</b> ${order.shippingAddress.address}

📦 <b>Товары:</b>
${itemsList}

💰 <b>Итого:</b> ${order.total.toLocaleString('ru-RU')} ₽
    `.trim();

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
  }
};
