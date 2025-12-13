import React, { useEffect, useReducer } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import Toolbar from './components/Toolbar.jsx';
import TaskList from './components/TaskList.jsx';

const STORAGE_KEY = 'lab5-alt-212-tasks';

const presets = [
  { id: 't-oil', title: 'Проверить масло и антифриз', tag: 'техобслуживание', done: false },
  { id: 't-report', title: 'Сдать отчёт по выручке за смену', tag: 'касса', done: true },
  { id: 't-fuel', title: 'Заправить бак перед ночной сменой', tag: 'топливо', done: false }
];

function safeLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : presets;
  } catch (error) {
    console.warn('Не удалось прочитать localStorage', error);
    return presets;
  }
}

const initialState = { tasks: safeLoad(), filter: 'all' };

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task))
      };
    case 'delete':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) };
    case 'edit':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.id ? { ...task, title: action.title } : task))
      };
    case 'filter':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const filtered = state.tasks.filter((task) => {
    if (state.filter === 'done') return task.done;
    if (state.filter === 'active') return !task.done;
    return true;
  });

  return (
    <div className="shell">
      <header className="hero">
        <p className="tag">Маршрут 212 · Омск</p>
        <h1>Лента задач для водителей</h1>
        <p className="muted">Запланируйте ТО, отметьте смену, подготовьте отчёт по выручке. Сохраняется в localStorage.</p>
      </header>

      <div className="panel">
        <AddTaskForm onAdd={(task) => dispatch({ type: 'add', payload: task })} />
        <Toolbar
          filter={state.filter}
          onChange={(filter) => dispatch({ type: 'filter', filter })}
          tasks={state.tasks}
        />
        <TaskList
          tasks={filtered}
          onToggle={(id) => dispatch({ type: 'toggle', id })}
          onDelete={(id) => dispatch({ type: 'delete', id })}
          onEdit={(id, title) => dispatch({ type: 'edit', id, title })}
        />
      </div>
    </div>
  );
}

export default App;
