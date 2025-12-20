import React, { useState, useEffect } from 'react';
import TransportTable from '../../components/TransportTable/TransportTable';
import styles from './TransportPage.module.css';
import { 
  FaBus, 
  FaPlus, 
  FaFilter, 
  FaSearch, 
  FaCar, 
  FaWrench, 
  FaCheckCircle,
  FaChartLine
} from 'react-icons/fa';

const TransportPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    licensePlate: '',
    model: '',
    boardNumber: '',
    status: 'В работе',
    condition: 'good',
    lastService: new Date().toISOString().split('T')[0],
    capacity: 35,
    photo: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Статистика
  const stats = {
    total: vehicles.length,
    inService: vehicles.filter(v => v.status === 'В работе').length,
    inRepair: vehicles.filter(v => v.status === 'Ремонт').length,
    inMaintenance: vehicles.filter(v => v.status === 'Плановое ТО').length,
    goodCondition: vehicles.filter(v => v.condition === 'good').length,
    needsAttention: vehicles.filter(v => v.condition === 'warning').length,
    needsRepair: vehicles.filter(v => v.condition === 'bad').length,
  };

  // Загрузка данных (в реальном приложении - API)
  useEffect(() => {
    // Имитация загрузки данных
    const mockVehicles = [
      {
        id: 1,
        licensePlate: 'У321НТ55',
        model: 'ПАЗ-320405-14',
        boardNumber: '№ 7928',
        status: 'В работе',
        condition: 'good',
        lastService: '2024-01-15',
        capacity: 35,
        photo: 'https://via.placeholder.com/100x60/ff7d36/ffffff?text=У321НТ55'
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
        photo: 'https://via.placeholder.com/100x60/008f85/ffffff?text=У671НН55'
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
        photo: 'https://via.placeholder.com/100x60/6a5acd/ffffff?text=У144НЕ55'
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
        photo: 'https://via.placeholder.com/100x60/ff6b6b/ffffff?text=Х264МР55'
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
        photo: 'https://via.placeholder.com/100x60/4CAF50/ffffff?text=У053ЕА55'
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
        photo: 'https://via.placeholder.com/100x60/2196F3/ffffff?text=У212СУ55'
      }
    ];

    setVehicles(mockVehicles);
    setFilteredVehicles(mockVehicles);
  }, []);

  // Фильтрация транспорта
  useEffect(() => {
    let result = [...vehicles];

    // Поиск по всем полям
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(vehicle =>
        vehicle.licensePlate.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.boardNumber.toLowerCase().includes(term) ||
        vehicle.status.toLowerCase().includes(term)
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      result = result.filter(vehicle => vehicle.status === statusFilter);
    }

    setFilteredVehicles(result);
  }, [searchTerm, statusFilter, vehicles]);

  // Обработчик добавления транспорта
  const handleAddVehicle = () => {
    setShowAddForm(true);
  };

  // Валидация формы
  const validateForm = () => {
    const errors = {};
    
    if (!newVehicle.licensePlate.trim()) {
      errors.licensePlate = 'Госномер обязателен';
    }
    
    if (!newVehicle.model.trim()) {
      errors.model = 'Модель обязательна';
    }
    
    if (!newVehicle.boardNumber.trim()) {
      errors.boardNumber = 'Бортовой номер обязателен';
    }
    
    if (!newVehicle.lastService) {
      errors.lastService = 'Дата последнего ТО обязательна';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Сохранение нового транспорта
  const handleSaveVehicle = () => {
    if (!validateForm()) {
      return;
    }

    const newVehicleWithId = {
      ...newVehicle,
      id: vehicles.length + 1,
      photo: newVehicle.photo || `https://via.placeholder.com/100x60/cccccc/666666?text=${newVehicle.licensePlate}`
    };

    setVehicles([...vehicles, newVehicleWithId]);
    setNewVehicle({
      licensePlate: '',
      model: '',
      boardNumber: '',
      status: 'В работе',
      condition: 'good',
      lastService: new Date().toISOString().split('T')[0],
      capacity: 35,
      photo: ''
    });
    setShowAddForm(false);
    setFormErrors({});
  };

  // Удаление транспорта
  const handleDeleteVehicle = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот транспорт?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    }
  };

  return (
    <div className={styles.transportPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>
            <FaBus className={styles.titleIcon} />
            Управление транспортом
          </h1>
          <p className={styles.pageSubtitle}>
            Информация и управление транспортными средствами маршрута 212
          </p>
        </div>
        
        <button 
          className={styles.addVehicleButton}
          onClick={handleAddVehicle}
        >
          <FaPlus />
          Добавить транспорт
        </button>
      </div>

      {/* Статистика */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconTotal}>
            <FaCar />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.total}</h3>
            <p className={styles.statLabel}>Всего транспорта</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconActive}>
            <FaCheckCircle />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.inService}</h3>
            <p className={styles.statLabel}>В работе</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconRepair}>
            <FaWrench />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.inRepair}</h3>
            <p className={styles.statLabel}>На ремонте</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIconChart}>
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>
              {stats.goodCondition}/{stats.total}
            </h3>
            <p className={styles.statLabel}>В хорошем состоянии</p>
          </div>
        </div>
      </div>

      {/* Форма добавления */}
      {showAddForm && (
        <div className={styles.addForm}>
          <h3 className={styles.formTitle}>Добавить новое транспортное средство</h3>
          
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="licensePlate">Госномер *</label>
              <input
                type="text"
                id="licensePlate"
                value={newVehicle.licensePlate}
                onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                placeholder="Например: У321НТ55"
                className={formErrors.licensePlate ? styles.error : ''}
              />
              {formErrors.licensePlate && (
                <span className={styles.errorText}>{formErrors.licensePlate}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="model">Модель *</label>
              <input
                type="text"
                id="model"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                placeholder="Например: ПАЗ-320405-14"
                className={formErrors.model ? styles.error : ''}
              />
              {formErrors.model && (
                <span className={styles.errorText}>{formErrors.model}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="boardNumber">Бортовой номер *</label>
              <input
                type="text"
                id="boardNumber"
                value={newVehicle.boardNumber}
                onChange={(e) => setNewVehicle({...newVehicle, boardNumber: e.target.value})}
                placeholder="Например: № 7928"
                className={formErrors.boardNumber ? styles.error : ''}
              />
              {formErrors.boardNumber && (
                <span className={styles.errorText}>{formErrors.boardNumber}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="status">Статус</label>
              <select
                id="status"
                value={newVehicle.status}
                onChange={(e) => setNewVehicle({...newVehicle, status: e.target.value})}
              >
                <option value="В работе">В работе</option>
                <option value="Ремонт">Ремонт</option>
                <option value="Плановое ТО">Плановое ТО</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="condition">Состояние</label>
              <select
                id="condition"
                value={newVehicle.condition}
                onChange={(e) => setNewVehicle({...newVehicle, condition: e.target.value})}
              >
                <option value="good">Хорошее</option>
                <option value="warning">Требует внимания</option>
                <option value="bad">Требует ремонта</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="lastService">Последнее ТО *</label>
              <input
                type="date"
                id="lastService"
                value={newVehicle.lastService}
                onChange={(e) => setNewVehicle({...newVehicle, lastService: e.target.value})}
                className={formErrors.lastService ? styles.error : ''}
              />
              {formErrors.lastService && (
                <span className={styles.errorText}>{formErrors.lastService}</span>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="capacity">Вместимость</label>
              <input
                type="number"
                id="capacity"
                value={newVehicle.capacity}
                onChange={(e) => setNewVehicle({...newVehicle, capacity: parseInt(e.target.value) || 35})}
                min="10"
                max="100"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="photo">Ссылка на фото</label>
              <input
                type="text"
                id="photo"
                value={newVehicle.photo}
                onChange={(e) => setNewVehicle({...newVehicle, photo: e.target.value})}
                placeholder="URL изображения"
              />
            </div>
          </div>
          
          <div className={styles.formActions}>
            <button 
              className={styles.saveButton}
              onClick={handleSaveVehicle}
            >
              Сохранить
            </button>
            <button 
              className={styles.cancelButton}
              onClick={() => {
                setShowAddForm(false);
                setFormErrors({});
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Фильтры и поиск */}
      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Поиск по госномеру, модели, статусу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <FaFilter className={styles.filterIcon} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Все статусы</option>
            <option value="В работе">В работе</option>
            <option value="Ремонт">На ремонте</option>
            <option value="Плановое ТО">Плановое ТО</option>
          </select>
        </div>
      </div>

      {/* Таблица транспорта */}
      <TransportTable
        vehicles={filteredVehicles}
        onDeleteVehicle={handleDeleteVehicle}
        onAddVehicle={handleAddVehicle}
      />

      {/* Подсказки */}
      <div className={styles.tips}>
        <h3 className={styles.tipsTitle}>Наши принципы работы с транспортом</h3>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <h4>Регулярное обслуживание</h4>
            <p>Проводим плановое ТО каждые 10 000 км пробега для предотвращения серьезных поломок.</p>
          </div>
          <div className={styles.tipCard}>
            <h4>Мониторинг состояния</h4>
            <p>Внимательно отслеживаем показатели "Состояние" для своевременного ремонта.</p>
          </div>
          <div className={styles.tipCard}>
            <h4>Документирование</h4>
            <p>Ведём историю обслуживания каждого транспортного средства для анализа износа.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportPage;