import React from 'react';
import TaskRow from './TaskRow.jsx';

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) {
    return <div className="empty">Нет задач в выбранном фильтре</div>;
  }

  return (
    <div className="list">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;
