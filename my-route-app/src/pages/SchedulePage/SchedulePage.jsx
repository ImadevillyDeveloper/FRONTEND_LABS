import React, { useState, useEffect } from 'react';
import styles from './SchedulePage.module.css';
import { FaBus, FaSync, FaRandom, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const SchedulePage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=8';

  const fetchTrips = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      
      // Преобразуем данные API в формат рейсов
      const formattedTrips = data.map((post, index) => ({
        id: post.id,
        routeNumber: '212',
        from: 'СТЦ Мега',
        to: 'пос. Чкаловский',
        departureTime: `${8 + index}:${index % 2 === 0 ? '00' : '30'}`,
        arrivalTime: `${8 + index + 1}:${index % 2 === 0 ? '15' : '45'}`,
        duration: `${index % 2 === 0 ? '1ч 15м' : '1ч 15м'}`,
        status: ['active', 'scheduled', 'completed'][index % 3],
        driver: `Водитель ${index + 1}`,
        busNumber: `У${321 + index}НТ55`,
        passengers: Math.floor(Math.random() * 30) + 10,
        description: post.title,
        fullDescription: post.body,
      }));
      
      setTrips(formattedTrips);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Ошибка при загрузке рейсов:', err);
    } finally {
      setLoading(false);
    }
  };

  const shuffleTrips = () => {
    if (trips.length > 0) {
      const shuffled = [...trips].sort(() => Math.random() - 0.5);
      setTrips(shuffled);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'В пути', className: styles.statusActive },
      scheduled: { label: 'По расписанию', className: styles.statusScheduled },
      completed: { label: 'Завершен', className: styles.statusCompleted },
    };
    
    const config = statusConfig[status] || { label: status, className: styles.statusDefault };
    return <span className={`${styles.statusBadge} ${config.className}`}>{config.label}</span>;
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className={styles.schedulePage}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <FaBus className={styles.titleIcon} />
          Расписание рейсов 212
        </h1>
        <p className={styles.pageSubtitle}>
          Актуальное расписание движения автобусов маршрута 212 "СТЦ Мега - пос. Чкаловский"
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.updateInfo}>
          {lastUpdated && (
            <p className={styles.lastUpdated}>
              Обновлено: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className={styles.buttons}>
          <button 
            onClick={fetchTrips} 
            className={styles.refreshButton}
            disabled={loading}
          >
            <FaSync className={loading ? styles.spinning : ''} />
            {loading ? 'Загрузка...' : 'Обновить'}
          </button>
          <button 
            onClick={shuffleTrips} 
            className={styles.shuffleButton}
            disabled={loading || trips.length === 0}
          >
            <FaRandom />
            Перемешать
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <p>Ошибка при загрузке данных: {error}</p>
          <button onClick={fetchTrips} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      )}

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Загружаем актуальное расписание...</p>
        </div>
      ) : (
        <>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <FaCalendarAlt className={styles.statIcon} />
              <div>
                <h3>Сегодня</h3>
                <p>{trips.length} рейсов</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <FaClock className={styles.statIcon} />
              <div>
                <h3>В пути сейчас</h3>
                <p>{trips.filter(t => t.status === 'active').length} автобусов</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <FaMapMarkerAlt className={styles.statIcon} />
              <div>
                <h3>Протяженность</h3>
                <p>22.5 км</p>
              </div>
            </div>
          </div>

          <div className={styles.scheduleGrid}>
            {trips.map((trip) => (
              <div key={trip.id} className={styles.tripCard}>
                <div className={styles.tripHeader}>
                  <div className={styles.tripRoute}>
                    <span className={styles.routeNumber}>{trip.routeNumber}</span>
                    <span className={styles.routeDirection}>
                      {trip.from} → {trip.to}
                    </span>
                  </div>
                  {getStatusBadge(trip.status)}
                </div>

                <div className={styles.tripDetails}>
                  <div className={styles.timeInfo}>
                    <div className={styles.timeBlock}>
                      <span className={styles.timeLabel}>Отправление</span>
                      <span className={styles.timeValue}>{trip.departureTime}</span>
                    </div>
                    <div className={styles.duration}>
                      <span className={styles.durationText}>{trip.duration}</span>
                    </div>
                    <div className={styles.timeBlock}>
                      <span className={styles.timeLabel}>Прибытие</span>
                      <span className={styles.timeValue}>{trip.arrivalTime}</span>
                    </div>
                  </div>

                  <div className={styles.tripInfo}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Автобус:</span>
                      <span className={styles.infoValue}>{trip.busNumber}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Водитель:</span>
                      <span className={styles.infoValue}>{trip.driver}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>Пассажиры:</span>
                      <span className={styles.infoValue}>~{trip.passengers} чел.</span>
                    </div>
                  </div>

                  <div className={styles.tripDescription}>
                    <p className={styles.descriptionTitle}>{trip.description}</p>
                    <p className={styles.descriptionText}>{trip.fullDescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SchedulePage;