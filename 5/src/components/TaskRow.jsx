import React, { useEffect, useState } from 'react';

function TaskRow({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  useEffect(() => setDraft(task.title), [task.title]);

  const save = () => {
    if (!draft.trim()) return;
    onEdit(task.id, draft.trim());
    setEditing(false);
  };

  return (
    <div className={`task ${task.done ? 'task--done' : ''}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div>
        {editing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') save();
            }}
          />
        ) : (
          <p className="task__title">{task.title}</p>
        )}
        <p className="task__meta">{task.tag}</p>
      </div>
      <div className="task__actions">
        {editing ? (
          <button className="small button--ghost" onClick={save}>
            Сохранить
          </button>
        ) : (
          <button className="small button--ghost" onClick={() => setEditing(true)}>
            Править
          </button>
        )}
        <button className="small button--ghost" onClick={() => onDelete(task.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default TaskRow;
