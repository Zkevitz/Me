const TABS_CONFIG = {
  home:       { title: 'New tab',   icon: '🏠', url: '/home',        domain: 'portfolio.dev' },
  about:      { title: 'About',         icon: '👤', url: '/about',       domain: 'portfolio.dev' },
  projects:   { title: 'Projects',          icon: '🚀', url: '/projects',    domain: 'portfolio.dev' },
  experience: { title: 'Experience',       icon: '💼', url: '/experience',  domain: 'portfolio.dev' },
  contact:    { title: 'Contact',          icon: '✉️', url: '/contact',     domain: 'portfolio.dev' },
  studies:    { title: 'Studies',           icon: '🎓', url: '/studies',     domain: 'portfolio.dev' },
};

const current_language = "Fr";
let TEXTS = null;
document.addEventListener("DOMContentLoaded", async() => {
    await loadText();
    console.log(TEXTS);
    await init_html();
    await setup_listeners();
    renderTabs();
});

let tabs = [{ id: 'tab-1', page: 'home' }];
let activeTabId = 'tab-1';
let tabCounter = 1;

async function init_html() {
    document.body.innerHTML = `    <!-- BROWSER WINDOW -->
    <div class="browser-window" id="browserWindow">

    <!-- TITLEBAR -->
    <div class="titlebar">
        <div class="titlebar-top">
            <!-- Window controls -->
            <div class="window-controls">
                <button class="wc close"></button>
                <button class="wc minimize"></button>
                <button class="wc maximize"></button>
            </div>
            <!-- Nav buttons -->
            <div class="nav-btns">
                <button class="nav-btn" id="backBtn" title="Retour" disabled>←</button>
                <button class="nav-btn" id="fwdBtn" title="Suivant" disabled>→</button>
                <button class="nav-btn" id="reloadBtn" title="Recharger">↻</button>
            </div>
            <div class="address-bar">
                <span class="lock-icon">🔒</span>
                <div class="url-text" id="urlText">
                    <span class="protocol">https://</span><span class="domain" id="urlDomain">portfolio.dev</span><span class="path" id="urlPath">/home</span>
                </div>
            </div>
            <!-- Toolbar extras -->
            <div class="toolbar-extras">
                <button class="tool-btn" title="Favoris">☆</button>
                <button class="tool-btn" title="Extensions">⊞</button>
                <button class="tool-btn" title="Menu">⋮</button>
            </div>
        </div>
        <!-- Tab bar -->
        <div class="tab-bar" id="tabBar">
            <!-- tabs injected here -->
            <button class="new-tab-btn" id="newTabBtn" title="New window">+</button>
        </div>
    </div>
    <!-- PAGE CONTENT -->
    <div class="browser-content" id="browserContent">
    <!-- HOME -->
    <div class="page active" id="page-home">
      <div class="new-tab-page">
        <div class="new-tab-logo">Zkevitz.dev</div>
        <div class="new-tab-search">
          <input type="text" placeholder=${TEXTS.GeneralText.searchPlaceholder} />
        </div>
        <div class="quick-links">
          <div class="quick-link" data-page="about">
            <span class="quick-link-icon">👤</span>
            <span class="quick-link-label">${TEXTS.AboutMeText.title}</span>
          </div>
          <div class="quick-link" data-page="studies">
            <span class="quick-link-icon">🎓</span>
            <span class="quick-link-label">Studies</span>
          </div>
          <div class="quick-link" data-page="projects">
            <span class="quick-link-icon">🚀</span>
            <span class="quick-link-label">Projects</span>
          </div>
          <div class="quick-link" data-page="contact">
            <span class="quick-link-icon">✉️</span>
            <span class="quick-link-label">Contact</span>
          </div>
        </div>
      </div>
    </div>
       <!-- ABOUT -->
    <div class="page" id="page-about">
      <div class="about-page">
        <div class="page-header">
          <div class="page-tag">// about.md</div>
          <h1 class="page-title">${TEXTS.AboutMeText.introduction}<br><span>Matteo.</span></h1>
        </div>
        <p class="about-bio">
          ${TEXTS.AboutMeText.MainText}
        </p>
        <div class="about-grid">
          <div class="stat-card">
            <div class="stat-number">32</div>
            <div class="stat-label">Projects done</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">∞</div>
            <div class="stat-label">coffee cups</div>
          </div>
        </div>
        <div class="skills-section">
          <div class="skills-title">programming languages</div>
          <div class="skills-grid">
            <span class="skill-tag">Python</span>
            <span class="skill-tag">C</span>
            <span class="skill-tag">C++(98)</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">HTML</span>
            <span class="skill-tag">CSS</span>
            <span class="skill-tag">GDScript</span>
          </div>
        </div>
        <div class="skills-section">
          <div class="skills-title">Tools</div>
          <div class="skills-grid">
            <span class="skill-tag">Git</span>
            <span class="skill-tag">GitHub</span>
            <span class="skill-tag">Docker</span>
            <span class="skill-tag">Makefile</span>
            <span class="skill-tag">Trello</span>
          </div>
        </div>
      </div>
    </div>
     <!-- Studies -->
    <div class="page" id="page-studies">
      <div class="projects-page">
        <div class="page-header">
          <div class="page-tag">studies/</div>
          <h1 class="page-title">${TEXTS.Text42Cursus.title}</h1>
        </div>
        <p class="about-bio">
          ${TEXTS.Text42Cursus.MainText}
        </p>
        <br>
        <p class="about-bio">
          ${TEXTS.Text42Cursus.secondText}
        </p>
        <div class="projects-grid">
          ${renderProjectsCards()}
        </div>
      </div>
    </div>
        <!-- PERSONNAL PROJECT TODO-->
    <div class="page" id="page-projects">
        <div class="projects-page">
            <div class="page-header">
                <div class="page-tag">projects/</div>
                <h1 class="page-title">${TEXTS.TextPersonnalProjects.title}</h1>
            </div>
            <p class="about-bio">
                ${TEXTS.TextPersonnalProjects.MainText}
            </p>
            <div class="projects-grid">
                ${renderProjectsCards(true)}
            </div>
        </div>
    </div>
     <!-- CONTACT -->
    <div class="page" id="page-contact">
      <div class="contact-page">
        <div class="page-header">
          <div class="page-tag">// contact.html</div>
          <h1 class="page-title">${TEXTS.GeneralText.contactTitle}</h1>
        </div>
        <div class="contact-grid">
          <div class="contact-links">
            <a class="contact-link" href="#">
              <span class="contact-link-icon">🐙</span>
              <div class="contact-link-info">
                <div class="contact-link-name">GitHub</div>
                <div class="contact-link-value">github.com/alexandre</div>
              </div>
            </a>
            <a class="contact-link" href="#">
              <span class="contact-link-icon">💼</span>
              <div class="contact-link-info">
                <div class="contact-link-name">LinkedIn</div>
                <div class="contact-link-value">linkedin.com/in/alexandre</div>
              </div>
            </a>
            <a class="contact-link" href="#">
              <span class="contact-link-icon">🐦</span>
              <div class="contact-link-info">
                <div class="contact-link-name">Twitter / X</div>
                <div class="contact-link-value">@alexandre_dev</div>
              </div>
            </a>
            <a class="contact-link" href="mailto:contact@portfolio.dev">
              <span class="contact-link-icon">✉️</span>
              <div class="contact-link-info">
                <div class="contact-link-name">Email</div>
                <div class="contact-link-value">contact@portfolio.dev</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- STATUS BAR -->
    <div class="status-bar">
        <div class="status-left">
            <span class="status-dot"></span>
            <span id="statusText">Prêt</span>
        </div>
        <div class="status-right">
            <span id="tabCount">1 onglet</span>
            <span>portfolio.dev</span>
        </div>
    </div>
</div>`
}

function renderProjectsCards(personnal = false) {
    let projects = personnal ? TEXTS.projectsPersonnal : TEXTS.projects42;
    return projects.map(project => `
        <div class="project-card">
            <div class="project-thumb thumb-${project.thumbnail.color}">
                ${project.thumbnail.symbol}
            </div>
            <div class="project-info">
                <div class="project-name">
                    <a href="${project.url}" target="_blank">
                        ${project.name}
                    </a>
                </div>
                <div class="project-desc">
                    ${project.description}
                </div>
                <div class="project-tags">
                    <span class="project-tag tag-green">
                        ${project.language}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}
async function loadText() {
    const response = await fetch('Textjson/' + current_language + '.json');
    const generictext = await fetch('Textjson/generic.json');
    TEXTS = await response.json();
    let generictextresponse = await generictext.json();
    TEXTS = {...TEXTS, ...generictextresponse};
}
function renderTabs() {
  const bar = document.getElementById('tabBar');
  const newBtn = document.getElementById('newTabBtn');
  // remove existing tab elements
  bar.querySelectorAll('.tab').forEach(t => t.remove());

  tabs.forEach(tab => {
    const cfg = TABS_CONFIG[tab.page];
    const el = document.createElement('div');
    el.className = 'tab' + (tab.id === activeTabId ? ' active' : '');
    el.dataset.tabId = tab.id;
    el.innerHTML = `
      <span class="tab-favicon">${cfg.icon}</span>
      <span class="tab-title">${cfg.title}</span>
      <span class="tab-close" data-close="${tab.id}">✕</span>
    `;
    el.addEventListener('click', (e) => {
      if (e.target.dataset.close) return;
      activateTab(tab.id);
    });
    el.querySelector('.tab-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closeTab(tab.id);
    });
    bar.insertBefore(el, newBtn);
  });

  // update url bar
  const active = tabs.find(t => t.id === activeTabId);
  if (active) {
    const cfg = TABS_CONFIG[active.page];
    document.getElementById('urlDomain').textContent = cfg.domain;
    document.getElementById('urlPath').textContent = cfg.url;
  }

  // update status
  document.getElementById('tabCount').textContent = tabs.length + (tabs.length > 1 ? ' onglets' : ' onglet');
}

function activateTab(tabId) {
  activeTabId = tabId;
  const active = tabs.find(t => t.id === tabId);

  // hide all pages, show active
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = document.getElementById('page-' + active.page);
  if (pageEl) {
    pageEl.classList.add('active');
    // re-trigger animation
    pageEl.style.animation = 'none';
    pageEl.offsetHeight;
    pageEl.style.animation = '';
  }

  renderTabs();
  document.getElementById('statusText').textContent = TABS_CONFIG[active.page].title;
}


function closeTab(tabId) {
  if (tabs.length === 1) return; // keep at least 1
  const idx = tabs.findIndex(t => t.id === tabId);
  tabs.splice(idx, 1);
  if (activeTabId === tabId) {
    const newActive = tabs[Math.min(idx, tabs.length - 1)];
    activateTab(newActive.id);
  } else {
    renderTabs();
  }
}

function openTab(page) {
  tabCounter++;
  const newTab = { id: 'tab-' + tabCounter, page };
  tabs.push(newTab);
  activateTab(newTab.id);
}

async function setup_listeners() {
    document.getElementById('newTabBtn').addEventListener('click', () => {
    openTab('home');
    });

    document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', () => {
        const page = link.dataset.page;
        openTab(page);
    });
    });
    document.getElementById('reloadBtn').addEventListener('click', () => {
      const active = tabs.find(t => t.id === activeTabId);
      if (!active) return;
      document.getElementById('statusText').textContent = 'Chargement...';
      setTimeout(() => {
        activateTab(activeTabId);
      }, 400);
    });
}

