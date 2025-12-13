import React from 'react';

function Toolbar({ filter, onChange, tasks }) {
  const done = tasks.filter((task) => task.done).length;
  const active = tasks.length - done;

  return (
    <React.Fragment>
      <div className="toolbar">
        {['all', 'active', 'done'].map((key) => (
          <button
            key={key}
            type="button"
            className={key === filter ? 'active' : ''}
            onClick={() => onChange(key)}
          >
            {key === 'all' ? 'Все' : key === 'active' ? 'Открытые' : 'Выполненные'}
          </button>
        ))}
      </div>
      <div className="stats">
        <div className="stat">Всего: {tasks.length}</div>
        <div className="stat">Открыты: {active}</div>
        <div className="stat">Сделаны: {done}</div>
      </div>
    </React.Fragment>
  );
}

export default Toolbar;
