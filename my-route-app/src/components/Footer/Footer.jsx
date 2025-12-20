import React from 'react';
import { FaBus, FaTelegram, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <FaBus className={styles.logoIcon} />
              <div>
                <h3 className={styles.logoTitle}>Мой.Маршрут</h3>
                <span className={styles.logoSubtitle}>212 маршрут Омск</span>
              </div>
            </div>
            <p className={styles.footerText}>
              Информационный портал о маршруте 212 "СТЦ Мега - пос. Чкаловский"
            </p>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Контакты</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>+7 (913) 673-79-65</span>
              </li>
              <li className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>my_route@gmail.com</span>
              </li>
              <li className={styles.contactItem}>
                <FaTelegram className={styles.contactIcon} />
                <a 
                  href="https://t.me/+sqIPcxR1DeU4M2My" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  ТГ-канал маршрута
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Социальные сети</h4>
            <div className={styles.socialLinks}>
              <a 
                href="https://github.com/ImadevillyDeveloper" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://t.me/+sqIPcxR1DeU4M2My" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Мой.Маршрут. Все права защищены.
          </p>
          <p className={styles.disclaimer}>
            Информация предоставляется в ознакомительных целях.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;