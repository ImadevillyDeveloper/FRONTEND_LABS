import React from 'react';
import styles from './HomePage.module.css';
import { FaQuoteLeft, FaTelegram, FaEnvelope, FaPhone } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Маршрут 212: СТЦ Мега - пос.Чкаловский (Омск)</h1>
        <div className={styles.aboutContent}>
          <div 
            className={styles.avatar}
            style={{
                backgroundImage: `url(/images/ava.JPG)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            ></div>
          <div className={styles.introText}>
            <p className={styles.introLine}>Вас приветствует администрация</p>
            <p className={styles.introLine}>
            <span className={styles.highlight}>212 маршрута "СТЦ Мега - пос. Чкаловский"</span>!
            </p>
          </div>
        </div>

        <div className={styles.description}>
          <p>
            Это приложение создано для маршрута в рамках проекта "Мой.Маршрут" по поддержке частных перевозчиков и недопущению монополизации пассажироперевозок.
          </p>
          
          <div className={styles.quote}>
            <FaQuoteLeft className={styles.quoteIcon} />
            <blockquote>
              Ваша работа заполнит большую часть жизни и единственный способ быть полностью 
              довольным — делать то, что по-вашему является великим делом. И единственный способ 
              делать великие дела — любить то, что вы делаете!
              <cite> — Стив Джобс, Речь в Стенфорде</cite>
            </blockquote>
          </div>
          
          <p className={styles.motto}>Девиз нашего маршрута: "Дорогу осилит едущий!"</p>
          
          <div className={styles.contactLinks}>
            <a 
              href="https://t.me/+sqIPcxR1DeU4M2My" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaTelegram /> ТГ-канал
            </a>
            <span className={styles.separator}>|</span>
            <a 
              href="mailto:imadevillydeveloper@gmail.com" 
              className={styles.socialLink}
            >
              <FaEnvelope /> Email
            </a>
            <span className={styles.separator}>|</span>
            <a 
              href="tel:89136737965" 
              className={styles.socialLink}
            >
              <FaPhone /> Телефон
            </a>
          </div>
        </div>
      </section>

      <section className={styles.hobbies}>
        <h2 className={styles.sectionTitle}>Самые яркие на Омских дорогах!</h2>
        <div className={styles.hobbyList}>
          <div className={styles.hobbyItem}>
            <h3 className={styles.hobbyTitle}>Инфографика</h3>
            <div className={styles.imageGrid}>
            {[1, 2, 3, 4].map((num) => (
                <div 
                key={num} 
                className={styles.imageWrapper}
                style={{
                    backgroundImage: `url(/images/infographics/${num}.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                >
                {/* Текст поверх картинки если нужно */}
                <div className={styles.imageOverlay}>
                    {num === 1 && ''}
                    {num === 2 && ''}
                    {num === 3 && ''}
                    {num === 4 && ''}
                </div>
                </div>
            ))}
            </div>
            <p>
              Наши автобусы имеют уникальный "огненный" дизайн, начиная от инфографики с остановками и заканчивая логотипом сзади и спереди автобуса. Шесть машин - похожи внешне, но каждая имеет свою историю...
            </p>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default HomePage;