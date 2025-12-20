import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { FaBus, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/schedule', label: 'Расписание' },
    { path: '/history', label: 'История' },
    { path: '/transport', label: 'Транспорт' },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <FaBus className={styles.logoIcon} />
          <div>
            <h1 className={styles.logoTitle}>Мой.Маршрут</h1>
            <span className={styles.logoSubtitle}>ИП Черепанов В. Г.</span>
          </div>
        </div>

        <button 
          className={styles.menuToggle} 
          onClick={toggleMenu}
          aria-label="Меню"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.active : ''
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;