// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Настройка Web App
tg.ready();
tg.expand();

// Установка цветов темы
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#0f0f0f');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#ffffff');

// Навигация
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const pageId = btn.dataset.page;
        
        // Убираем active у всех кнопок
        navButtons.forEach(b => b.classList.remove('active'));
        
        // Убираем active у всех страниц
        pages.forEach(p => p.classList.remove('active'));
        
        // Добавляем active текущей кнопке
        btn.classList.add('active');
        
        // Показываем соответствующую страницу
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Haptic feedback
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }
    });
});

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
let isDarkTheme = true;

themeToggle?.addEventListener('change', () => {
    isDarkTheme = themeToggle.checked;
    
    if (isDarkTheme) {
        document.documentElement.style.setProperty('--bg-color', '#0f0f0f');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--card-bg', '#1e1e1e');
        document.documentElement.style.setProperty('--border-color', '#2a2a2a');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f5f5f5');
        document.documentElement.style.setProperty('--text-color', '#1a1a1a');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--border-color', '#e0e0e0');
    }
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.selectionChanged();
    }
});

// Получение данных пользователя
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    const usernameEl = document.getElementById('username');
    
    if (usernameEl) {
        const name = [user.first_name, user.last_name].filter(Boolean).join(' ');
        usernameEl.textContent = name || user.username || 'Гость';
    }
}

// Обработка кнопки "На главную" от Telegram
tg.onEvent('backButtonClicked', () => {
    // Переход на каталог
    const catalogBtn = document.querySelector('[data-page="catalog"]');
    if (catalogBtn) {
        catalogBtn.click();
    }
});

// Показываем кнопку "Назад" когда нужно
function updateBackButton() {
    const currentPage = document.querySelector('.page.active');
    if (currentPage && currentPage.id !== 'catalog') {
        tg.BackButton.show();
    } else {
        tg.BackButton.hide();
    }
}

// Настройка MainButton для действий
tg.MainButton.setText('ДОБАВИТЬ В КОРЗИНУ');
tg.MainButton.hide();

console.log('Ghost Style Web App initialized');
