/**
 * github-api.js
 * Busca dados públicos do GitHub via REST API e atualiza a UI.
 * Em caso de erro (offline, rate limit, etc.) o conteúdo HTML estático
 * permanece intacto como fallback — sem quebrar a página.
 */

const GITHUB_USER = 'dev-gustavoh';
const API_BASE    = 'https://api.github.com';

const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python:     '#3572A5',
  CSS:        '#563d7c',
  HTML:       '#e34c26',
  TeX:        '#3D6117',
};

const GITHUB_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23
    c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73
    1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6
    -2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18
    0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23
    .66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92
    .43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>`;

const STAR_ICON_SVG = `
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>`;

function buildRepoCard(repo) {
  const color = LANG_COLORS[repo.language] || '#6C9E89';
  const desc  = repo.description || 'Repositório público.';

  return `
    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
      <div class="repo-card__name">${repo.name}</div>
      <div class="repo-card__desc">${desc}</div>
      <div class="repo-card__footer">
        <div class="repo-card__lang">
          <span class="lang-dot" style="background:${color}" aria-hidden="true"></span>
          ${repo.language || '—'}
        </div>
        <div class="repo-card__stars" aria-label="${repo.stargazers_count} stars">
          ${STAR_ICON_SVG}
          ${repo.stargazers_count}
        </div>
      </div>
    </a>`;
}

function buildMoreCard() {
  return `
    <div class="repo-more">
      <div class="repo-more__label">Ver todos os projetos</div>
      <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer"
         class="btn btn-ghost">
        ${GITHUB_ICON_SVG}
        github.com/${GITHUB_USER}
      </a>
    </div>`;
}

function updateStats(user, repos) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setEl('s-pub-repos',   user.public_repos ?? '9');
  setEl('s-total-stars', totalStars);
  setEl('s-followers',   user.followers ?? '2');
  setEl('s-repos',       user.public_repos ?? '9');
}

function renderRepos(repos) {
  const grid = document.getElementById('gh-repos-grid');
  if (!grid) return;

  const filtered = repos
    .filter((r) => r.name !== GITHUB_USER)
    .slice(0, 5);

  grid.innerHTML = filtered.map(buildRepoCard).join('') + buildMoreCard();
}

export async function loadGitHub() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API_BASE}/users/${GITHUB_USER}`),
      fetch(`${API_BASE}/users/${GITHUB_USER}/repos?sort=updated&per_page=100`),
    ]);

    if (!userRes.ok || !reposRes.ok) return;

    const [user, repos] = await Promise.all([
      userRes.json(),
      reposRes.json(),
    ]);

    updateStats(user, repos);
    renderRepos(repos);
  } catch {
    // Fallback silencioso — HTML estático continua exibido
  }
}
