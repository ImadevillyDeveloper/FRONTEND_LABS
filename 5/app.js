const { useReducer, useEffect, useState } = React;
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
  } catch (e) {
    console.warn('Не удалось прочитать localStorage', e);
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
        tasks: state.tasks.map((t) => t.id === action.id ? { ...t, done: !t.done } : t)
      };
    case 'delete':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case 'edit':
      return {
        ...state,
        tasks: state.tasks.map((t) => t.id === action.id ? { ...t, title: action.title } : t)
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
    React.createElement('div', { className: 'panel' },
      React.createElement(TaskForm, { onAdd: (task) => dispatch({ type: 'add', payload: task }) }),
      React.createElement(Toolbar, { filter: state.filter, onChange: (f) => dispatch({ type: 'filter', filter: f }), tasks: state.tasks }),
      React.createElement(TaskList, {
        tasks: filtered,
        onToggle: (id) => dispatch({ type: 'toggle', id }),
        onDelete: (id) => dispatch({ type: 'delete', id }),
        onEdit: (id, title) => dispatch({ type: 'edit', id, title })
      })
    )
  );
}

function TaskForm({ onAdd }) {
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
    React.createElement('form', { className: 'form', onSubmit: submit },
      React.createElement('input', {
        className: 'input',
        type: 'text',
        placeholder: 'Новая задача: проверить валидатор, помыть салон...',
        value: title,
        onChange: (e) => setTitle(e.target.value)
      }),
      React.createElement('select', {
        className: 'select',
        value: tag,
        onChange: (e) => setTag(e.target.value)
      },
        React.createElement('option', { value: 'смена' }, 'Смена'),
        React.createElement('option', { value: 'техобслуживание' }, 'Техобслуживание'),
        React.createElement('option', { value: 'касса' }, 'Касса'),
        React.createElement('option', { value: 'прочее' }, 'Прочее')
      ),
      React.createElement('button', { className: 'button', type: 'submit' }, 'Добавить')
    )
  );
}

function Toolbar({ filter, onChange, tasks }) {
  const done = tasks.filter((t) => t.done).length;
  const active = tasks.length - done;

  return (
    React.createElement(React.Fragment, null,
      React.createElement('div', { className: 'toolbar' },
        ['all', 'active', 'done'].map((key) =>
          React.createElement('button', {
            key,
            type: 'button',
            className: key === filter ? 'active' : '',
            onClick: () => onChange(key)
          },
            key === 'all' ? 'Все' : key === 'active' ? 'Открытые' : 'Выполненные'
          )
        )
      ),
      React.createElement('div', { className: 'stats' },
        React.createElement('div', { className: 'stat' }, `Всего: ${tasks.length}`),
        React.createElement('div', { className: 'stat' }, `Открыты: ${active}`),
        React.createElement('div', { className: 'stat' }, `Сделаны: ${done}`)
      )
    )
  );
}

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) {
    return React.createElement('div', { className: 'empty' }, 'Нет задач в выбранном фильтре');
  }

  return (
    React.createElement('div', { className: 'list' },
      tasks.map((task) =>
        React.createElement(TaskRow, {
          key: task.id,
          task,
          onToggle,
          onDelete,
          onEdit
        })
      )
    )
  );
}

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
    React.createElement('div', { className: `task ${task.done ? 'task--done' : ''}` },
      React.createElement('input', {
        className: 'checkbox',
        type: 'checkbox',
        checked: task.done,
        onChange: () => onToggle(task.id)
      }),
      React.createElement('div', null,
        editing
          ? React.createElement('input', {
              className: 'edit-input',
              value: draft,
              onChange: (e) => setDraft(e.target.value),
              onKeyDown: (e) => { if (e.key === 'Enter') save(); }
            })
          : React.createElement('p', { className: 'task__title' }, task.title),
        React.createElement('p', { className: 'task__meta' }, task.tag)
      ),
      React.createElement('div', { className: 'task__actions' },
        editing
          ? React.createElement('button', { className: 'small button--ghost', onClick: save }, 'Сохранить')
          : React.createElement('button', { className: 'small button--ghost', onClick: () => setEditing(true) }, 'Править'),
        React.createElement('button', { className: 'small button--ghost', onClick: () => onDelete(task.id) }, 'Удалить')
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
