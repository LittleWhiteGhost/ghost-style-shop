// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {

    // Безопасная инициализация Telegram Web App
    let tg = null;
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            tg = window.Telegram.WebApp;
            tg.ready();
            tg.expand();
        }
    } catch (e) {
        console.log('Telegram Web App not available:', e);
    }

    // Анимация хедера при скролле
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Навигация
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    function switchPage(pageId) {
        // Убираем active у всех кнопок
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === pageId);
        });

        // Убираем active у всех страниц
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });

        // Haptic feedback
        if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }

        // Скролл наверх
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // BackButton
        if (tg && tg.BackButton) {
            if (pageId === 'catalog') {
                tg.BackButton.hide();
            } else {
                tg.BackButton.show();
            }
        }

        console.log('Switched to:', pageId);
    }

    // Обработчики кликов
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchPage(btn.dataset.page);
        });
    });

    // Переключение темы
    const themeToggle = document.getElementById('theme-toggle');
    let isDarkTheme = false;

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
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
                document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.72)');
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
                document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.72)');
            }

            if (tg && tg.HapticFeedback) {
                tg.HapticFeedback.selectionChanged();
            }
        });
    }

    // Получение данных пользователя из Telegram
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const usernameEl = document.getElementById('username');

        if (usernameEl) {
            const name = [user.first_name, user.last_name].filter(Boolean).join(' ');
            usernameEl.textContent = name || user.username || 'Гость';
        }
    }

    // Обработка кнопки "Назад" от Telegram
    if (tg) {
        tg.onEvent('backButtonClicked', () => {
            switchPage('catalog');
        });
    }

    // Показываем кнопку "Назад" при загрузке
    if (tg && tg.BackButton) {
        tg.BackButton.hide();
    }

    // MainButton
    if (tg && tg.MainButton) {
        tg.MainButton.setText('ДОБАВИТЬ В КОРЗИНУ');
        tg.MainButton.hide();
    }

    // Анимация появления карточек
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    console.log('Ghost Style Web App initialized');
});
