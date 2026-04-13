// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Настройка Web App
tg.ready();
tg.expand();

// Установка цветов темы
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');

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
        
        // Скролл наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
let isDarkTheme = false;

themeToggle?.addEventListener('change', () => {
    isDarkTheme = themeToggle.checked;
    
    if (isDarkTheme) {
        document.documentElement.style.setProperty('--bg', '#000000');
        document.documentElement.style.setProperty('--bg-secondary', '#111111');
        document.documentElement.style.setProperty('--text', '#ffffff');
        document.documentElement.style.setProperty('--text-muted', '#999999');
        document.documentElement.style.setProperty('--text-light', '#666666');
        document.documentElement.style.setProperty('--card-bg', '#0a0a0a');
        document.documentElement.style.setProperty('--border', '#222222');
        document.documentElement.style.setProperty('--border-light', '#1a1a1a');
        document.documentElement.style.setProperty('--primary', '#ffffff');
        document.documentElement.style.setProperty('--hover', '#1a1a1a');
    } else {
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f5f5f5');
        document.documentElement.style.setProperty('--text', '#000000');
        document.documentElement.style.setProperty('--text-muted', '#666666');
        document.documentElement.style.setProperty('--text-light', '#999999');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--border', '#e5e5e5');
        document.documentElement.style.setProperty('--border-light', '#f0f0f0');
        document.documentElement.style.setProperty('--primary', '#000000');
        document.documentElement.style.setProperty('--hover', '#f8f8f8');
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

// Наблюдаем за изменениями активной страницы
const observer = new MutationObserver(updateBackButton);
pages.forEach(page => {
    observer.observe(page, { attributes: true, attributeFilter: ['class'] });
});

// Настройка MainButton для действий
tg.MainButton.setText('ДОБАВИТЬ В КОРЗИНУ');
tg.MainButton.hide();

console.log('Ghost Style Web App initialized');
