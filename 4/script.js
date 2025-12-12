const URL = 'https://jsonplaceholder.typicode.com/posts?_limit=9';
const notice = document.getElementById('notice');
const grid = document.getElementById('grid');
const refreshBtn = document.getElementById('refresh');
const shuffleBtn = document.getElementById('shuffle');

const state = {
  posts: [],
  loading: false,
  error: null
};

function setStatus(text, tone = 'muted') {
  notice.textContent = text;
  notice.style.color = tone === 'error' ? '#b91c1c' : '#6b7280';
}

function renderCards(items) {
  if (!items.length) {
    grid.innerHTML = '<p class="notice">Нет данных для показа</p>';
    return;
  }

  grid.innerHTML = items
    .map((item, index) => {
      const colorClass = index % 2 === 0 ? 'card--orange' : 'card--green';
      return `
        <article class="card ${colorClass}">
          <span class="card__line"></span>
          <span class="card__id">Рейс #${item.id}</span>
          <h3 class="card__title">${item.title}</h3>
          <p class="card__body">${item.body}</p>
        </article>
      `;
    })
    .join('');
}

async function fetchPosts() {
  state.loading = true;
  state.error = null;
  setStatus('Запрашиваем данные для маршрута 212...');
  grid.innerHTML = '';

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`Ответ ${response.status}`);
    const data = await response.json();
    state.posts = data;
    setStatus(`Обновлено в ${new Date().toLocaleTimeString()}`);
    renderCards(state.posts);
  } catch (error) {
    state.error = error.message;
    setStatus('Не удалось загрузить данные', 'error');
    grid.innerHTML = `<p class="notice" style="color:#b91c1c">${error.message}</p>`;
  } finally {
    state.loading = false;
  }
}

function shufflePosts() {
  if (!state.posts.length) {
    fetchPosts();
    return;
  }
  const shuffled = [...state.posts].sort(() => Math.random() - 0.5);
  renderCards(shuffled);
  setStatus('Перемешали карточки рейсов');
}

refreshBtn.addEventListener('click', () => {
  if (!state.loading) fetchPosts();
});

shuffleBtn.addEventListener('click', shufflePosts);

fetchPosts();
