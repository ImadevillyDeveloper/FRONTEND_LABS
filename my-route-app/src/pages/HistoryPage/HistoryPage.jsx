import React, { useState, useEffect, useCallback } from 'react';
import styles from './HistoryPage.module.css';
import { FaChevronLeft, FaChevronRight, FaBus, FaCalendarAlt, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';

const HistoryPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const historySlides = [
    {
      id: 1,
      year: '2013',
      title: 'Начало пути',
      description: 'Маршрут №212 был запущен в 2013 году, соединив торговый центр "Мега" с посёлком Чкаловский. Это стало важным событием для жителей Левого и Правого берега.',
      details: [
        'Первоначальная протяженность: 23 км',
        'Интервал движения: 30-40 минут',
        'Тип транспорта: микроавтобусы Ford Transit',
        'Количество остановок: 46'
      ],
      icon: FaBus,
      color: '#ff7d36'
    },
    {
      id: 2,
      year: '2014-2023',
      title: 'Развитие маршрута',
      description: 'В течение 10 лет на маршруте стабильно работали микроавтобусы "Ford Transit". Маршрут стал популярным среди разных категорий граждан. Однако реформа 2023 заставила маршрут адаптироваться к новым условиям. Автобусы малого класса вместимости были изгнаны с Центральных улиц города.',
      details: [
        'Увеличение пассажиропотока на 40%',
        'Введение электронных проездных',
        'Увеличение числа рабочих мест',
        'Оптимизация маршрута и расписания'
      ],
      icon: FaCalendarAlt,
      color: '#008f85'
    },
    {
      id: 3,
      year: '2024',
      title: 'Обновление парка',
      description: '27 декабря 2024 года парк машин был полностью обновлён. Маршрут, теперь обслуживаемый автобусами среднего класса "ПАЗ Vector Next", вернулся в Центральную часть города.',
      details: [
        '6 новых автобусов ПАЗ Vector Next',
        'Увеличение вместимости до 35 пассажиров',
        'Возвращение в Центр',
        'Сотрудничество с ГЛОНАСС'
      ],
      icon: FaMapMarkedAlt,
      color: '#6a5acd'
    },
    {
      id: 4,
      year: '2025+',
      title: 'Планы на будущее',
      description: 'В планах - увеличение количества транспортных единиц, сохранение минимальной стоимости проезда и создание усовершенствованного мобильного приложения для отслеживания автобусов в реальном времени.',
      details: [
        'Увеличение парка до 8 автобусов',
        'Улучшение системы GPS-мониторинга',
        'Разработка мобильного приложения',
        'Стабильность работы'
      ],
      icon: FaUsers,
      color: '#ff6b6b'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % historySlides.length);
  }, [historySlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + historySlides.length) % historySlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlideData = historySlides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className={styles.historyPage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>История маршрута 212</h1>
        <p className={styles.pageSubtitle}>
          От Фордов до ПАЗиков: путь развития нашего маршрута
        </p>
      </div>

      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          {historySlides.map((slide, index) => (
            <button
              key={slide.id}
              className={`${styles.timelineDot} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              style={{ '--dot-color': slide.color }}
              aria-label={`Перейти к ${slide.year}: ${slide.title}`}
            >
              <span className={styles.dotYear}>{slide.year}</span>
            </button>
          ))}
          <div 
            className={styles.timelineLine}
            style={{ '--progress': `${(currentSlide / (historySlides.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <div className={styles.sliderContent}>
          <div 
            className={styles.slider} 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {historySlides.map((slide) => {
              const SlideIcon = slide.icon;
              return (
                <div key={slide.id} className={styles.slide}>
                  <div className={styles.slideInner} style={{ borderColor: slide.color }}>
                    <div className={styles.slideHeader}>
                      <div className={styles.slideIcon} style={{ backgroundColor: `${slide.color}20`, color: slide.color }}>
                        <SlideIcon />
                      </div>
                      <div>
                        <span className={styles.slideYear} style={{ color: slide.color }}>
                          {slide.year}
                        </span>
                        <h2 className={styles.slideTitle}>{slide.title}</h2>
                      </div>
                    </div>
                    
                    <div className={styles.slideBody}>
                      <p className={styles.slideDescription}>{slide.description}</p>
                      
                      <div className={styles.detailsGrid}>
                        {slide.details.map((detail, idx) => (
                          <div key={idx} className={styles.detailItem} style={{ borderLeftColor: slide.color }}>
                            <div className={styles.detailMarker} style={{ backgroundColor: slide.color }}></div>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.slideFooter}>
                      <span className={styles.slideNumber}>
                        Слайд {slide.id} из {historySlides.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.sliderControls}>
          <button 
            onClick={prevSlide}
            className={styles.sliderButton}
            aria-label="Предыдущий слайд"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={styles.playPauseButton}
            aria-label={isAutoPlaying ? 'Пауза' : 'Продолжить'}
          >
            {isAutoPlaying ? '⏸️ Пауза' : '▶️ Продолжить'}
          </button>
          
          <button 
            onClick={nextSlide}
            className={styles.sliderButton}
            aria-label="Следующий слайд"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.slideIndicators}>
        {historySlides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      <div className={styles.statsOverview}>
        <div className={styles.statOverview}>
          <div className={styles.statNumber}>12+</div>
          <div className={styles.statLabel}>Лет на маршруте</div>
        </div>
        <div className={styles.statOverview}>
          <div className={styles.statNumber}>500K+</div>
          <div className={styles.statLabel}>Пассажиров в год</div>
        </div>
        <div className={styles.statOverview}>
          <div className={styles.statNumber}>24.9</div>
          <div className={styles.statLabel}>Км протяженность</div>
        </div>
        <div className={styles.statOverview}>
          <div className={styles.statNumber}>46</div>
          <div className={styles.statLabel}>Остановок</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;