import React, { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('смена');

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : `t-${Date.now()}`,
      title: title.trim(),
      tag,
      done: false
    };
    onAdd(newTask);
    setTitle('');
  };

  return (
    <form className="form" onSubmit={submit}>
      <input
        className="input"
        type="text"
        placeholder="Новая задача: проверить валидатор, помыть салон..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <select className="select" value={tag} onChange={(event) => setTag(event.target.value)}>
        <option value="смена">Смена</option>
        <option value="техобслуживание">Техобслуживание</option>
        <option value="касса">Касса</option>
        <option value="прочее">Прочее</option>
      </select>
      <button className="button" type="submit">
        Добавить
      </button>
    </form>
  );
}

export default AddTaskForm;
