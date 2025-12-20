import React, { useState } from 'react';
import styles from './TransportTable.module.css';
import { FaCar, FaWrench, FaCheckCircle, FaTimesCircle, FaPlus, FaTrash } from 'react-icons/fa';

const TransportTable = ({ 
  vehicles, 
  onDeleteVehicle, 
  onAddVehicle,
  isLoading = false 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const initialVehicles = [
    {
      id: 1,
      licensePlate: 'У321НТ55',
      model: 'ПАЗ-320405-14',
      boardNumber: '№ 7928',
      status: 'В работе',
      condition: 'good',
      lastService: '2024-01-15',
      capacity: 35,
      photo: '/images/transport/321.jpg'
    },
    {
      id: 2,
      licensePlate: 'У671НН55',
      model: 'ПАЗ-320405-14',
      boardNumber: '№ 7929',
      status: 'В работе',
      condition: 'good',
      lastService: '2024-01-20',
      capacity: 35,
      photo: '/images/transport/671.jpg'
    },
    {
      id: 3,
      licensePlate: 'У144НЕ55',
      model: 'ПАЗ-320405-14',
      boardNumber: '№ 7930',
      status: 'В работе',
      condition: 'good',
      lastService: '2024-01-25',
      capacity: 35,
      photo: '/images/transport/144.jpg'
    },
    {
      id: 4,
      licensePlate: 'Х264МР55',
      model: 'ПАЗ-320405-14',
      boardNumber: '№ 7932',
      status: 'В работе',
      condition: 'warning',
      lastService: '2023-12-10',
      capacity: 35,
      photo: '/images/transport/264.jpg'
    },
    {
      id: 5,
      licensePlate: 'У053ЕА55',
      model: 'ПАЗ-320412-14',
      boardNumber: '№ 7931',
      status: 'Ремонт',
      condition: 'bad',
      lastService: '2023-11-05',
      capacity: 35,
      photo: '/images/transport/053.jpg'
    },
    {
      id: 6,
      licensePlate: 'У212СУ55',
      model: 'ПАЗ-320405-14',
      boardNumber: 'отсутствует',
      status: 'Плановое ТО',
      condition: 'warning',
      lastService: '2023-10-20',
      capacity: 35,
      photo: '/images/transport/212.jpg'
    }
  ];

  const displayVehicles = vehicles && vehicles.length > 0 ? vehicles : initialVehicles;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'В работе':
        return <FaCheckCircle className={styles.statusIconActive} />;
      case 'Ремонт':
        return <FaWrench className={styles.statusIconRepair} />;
      case 'Плановое ТО':
        return <FaCar className={styles.statusIconService} />;
      default:
        return <FaTimesCircle className={styles.statusIconInactive} />;
    }
  };

  const getConditionClass = (condition) => {
    switch (condition) {
      case 'good':
        return styles.conditionGood;
      case 'warning':
        return styles.conditionWarning;
      case 'bad':
        return styles.conditionBad;
      default:
        return styles.conditionUnknown;
    }
  };

  const getConditionText = (condition) => {
    switch (condition) {
      case 'good':
        return 'Хорошее';
      case 'warning':
        return 'Требует внимания';
      case 'bad':
        return 'Требует ремонта';
      default:
        return 'Неизвестно';
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedVehicles = [...displayVehicles].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleDelete = (id) => {
    if (onDeleteVehicle) {
      onDeleteVehicle(id);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Загрузка данных о транспорте...</p>
      </div>
    );
  }

  return (
    <div className={styles.transportTable}>
      <div className={styles.tableHeader}>
        <h3 className={styles.tableTitle}>
          <FaCar className={styles.titleIcon} />
          Транспортный парк маршрута 212
        </h3>
        <div className={styles.tableStats}>
          <span className={styles.statItem}>
            Всего: <strong>{displayVehicles.length}</strong>
          </span>
          <span className={styles.statItem}>
            В работе: <strong>{displayVehicles.filter(v => v.status === 'В работе').length}</strong>
          </span>
          <span className={styles.statItem}>
            На ремонте: <strong>{displayVehicles.filter(v => v.status === 'Ремонт').length}</strong>
          </span>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('licensePlate')}>
                Госномер
                {sortConfig.key === 'licensePlate' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('model')}>
                Модель
                {sortConfig.key === 'model' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('boardNumber')}>
                Бортовой номер
                {sortConfig.key === 'boardNumber' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('status')}>
                Статус
                {sortConfig.key === 'status' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th onClick={() => handleSort('condition')}>
                Состояние
                {sortConfig.key === 'condition' && (
                  <span className={styles.sortIndicator}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th>Фото</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedVehicles.map((vehicle) => (
              <tr key={vehicle.id} className={styles.tableRow}>
                <td>
                  <div className={styles.licensePlate}>
                    <span className={styles.plateNumber}>{vehicle.licensePlate}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.modelInfo}>
                    <span className={styles.modelName}>{vehicle.model}</span>
                    <span className={styles.capacity}>Вместимость: {vehicle.capacity} чел.</span>
                  </div>
                </td>
                <td>
                  <span className={styles.boardNumber}>{vehicle.boardNumber}</span>
                </td>
                <td>
                  <div className={styles.statusCell}>
                    {getStatusIcon(vehicle.status)}
                    <span className={styles.statusText}>{vehicle.status}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.conditionCell}>
                    <span className={`${styles.conditionBadge} ${getConditionClass(vehicle.condition)}`}>
                      {getConditionText(vehicle.condition)}
                    </span>
                    <span className={styles.lastService}>
                      ТО: {vehicle.lastService}
                    </span>
                  </div>
                </td>
                <td>
                  <div className={styles.photoCell}>
                    <div 
                      className={styles.vehiclePhoto}
                      style={{
                        backgroundImage: `url(${vehicle.photo}), linear-gradient(135deg, #f0f0f0, #e0e0e0)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                      title={`Фото автобуса ${vehicle.licensePlate}`}
                      aria-label={`Фото автобуса ${vehicle.licensePlate}`}
                    ></div>
                  </div>
                </td>
                <td>
                  <div className={styles.actionCell}>
                    <button 
                      className={styles.detailsButton}
                      onClick={() => console.log('Детали:', vehicle.id)}
                    >
                      Подробнее
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDelete(vehicle.id)}
                      aria-label="Удалить"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <button 
          className={styles.addButton}
          onClick={onAddVehicle}
        >
          <FaPlus />
          Добавить транспорт
        </button>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <FaCheckCircle className={styles.legendIconActive} />
            <span>В работе</span>
          </div>
          <div className={styles.legendItem}>
            <FaWrench className={styles.legendIconRepair} />
            <span>На ремонте</span>
          </div>
          <div className={styles.legendItem}>
            <FaCar className={styles.legendIconService} />
            <span>Плановое ТО</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportTable;