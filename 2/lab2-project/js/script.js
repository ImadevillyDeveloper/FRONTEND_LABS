// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Добавляем анимацию для карточек услуг
document.querySelectorAll('.service__card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Анимация для статистики
document.querySelectorAll('.stat__item').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'scale(0.8)';
    stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(stat);
});

// Обработка формы контактов
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('[placeholder*="имя"]').value;
        
        // Показываем уведомление
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        notification.innerHTML = `
            <strong>Успешно!</strong><br>
            Спасибо, ${name || 'гость'}! Мы свяжемся с вами в ближайшее время.
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 5 секунд
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Сбрасываем форму
        this.reset();
    });
}

// Анимация для кнопок в герое
document.querySelectorAll('.hero__button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Подсветка активной ссылки при скролле
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Добавляем стиль для активной ссылки
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav__link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
    
    .nav__link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeStyle);

// Инициализация всех анимируемых элементов
document.addEventListener('DOMContentLoaded', function() {
    // Анимация для заголовков секций
    document.querySelectorAll('.section__title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(title);
    });
    
    // Анимация для карточек контактов
    document.querySelectorAll('.contact__item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease 0.2s';
        observer.observe(item);
    });
    
    // Анимация для формы
    const form = document.querySelector('.contact__form');
    if (form) {
        form.style.opacity = '0';
        form.style.transform = 'translateX(20px)';
        form.style.transition = 'opacity 0.6s ease, transform 0.6s ease 0.2s';
        observer.observe(form);
    }
});