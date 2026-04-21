const TABS_CONFIG = {
  home:       { title: 'Home',   icon: '🏠', url: '/home',        domain: 'portfolio.dev' },
  about:      { title: 'About',         icon: '👤', url: '/about',       domain: 'portfolio.dev' },
  projects:   { title: 'Projects',          icon: '🚀', url: '/projects',    domain: 'portfolio.dev' },
  experience: { title: 'Experience',       icon: '💼', url: '/experience',  domain: 'portfolio.dev' },
  contact:    { title: 'Contact',          icon: '✉️', url: '/contact',     domain: 'portfolio.dev' },
  studies:    { title: 'Studies',           icon: '🎓', url: '/studies',     domain: 'portfolio.dev' },
  certs:      { title: 'Certifications',    icon: '🏆', url: '/certs',       domain: 'portfolio.dev' },
};

const current_language = "Fr";
let TEXTS = null;
document.addEventListener("DOMContentLoaded", async() => {
    await loadText();
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
                <button class="nav-btn" id="backBtn" title="Back " disabled>←</button>
                <button class="nav-btn" id="fwdBtn" title="Next" disabled>→</button>
                <button class="nav-btn" id="reloadBtn" title="Reload">↻</button>
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
        <div class="new-tab-logo">Zkevitz.dev
         <span class="logo-subtitle">by Matteo Gigot</span>
        </div>
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
            <div class="stat-number">${await get_projects_count()}</div>
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
            <a class="contact-link" href="https://discord.gg/FXGvGPB5">
              <span class="contact-link-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </span>
              <div class="contact-link-info">
                <div class="contact-link-name">Discord</div>
                <div class="contact-link-value">inprogresss</div>
              </div>
            </a>
            <a class="contact-link" href="https://github.com/Zkevitz">
              <span class="contact-link-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </span>
              <div class="contact-link-info">
                <div class="contact-link-name">GitHub</div>
                <div class="contact-link-value">https://github.com/Zkevitz</div>
              </div>
            </a>
            <a class="contact-link" href="mailto:matteo.gigot2001@gmail.com">
              <span class="contact-link-icon">✉️</span>
              <div class="contact-link-info">
                <div class="contact-link-name">Email</div>
                <div class="contact-link-value">matteo.gigot2001@gmail.com</div>
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
      <a href="${project.url}" target="_blank" class="project-card-link">
        <div class="project-card">
            <div class="project-thumb thumb-${project.thumbnail.color}">
                ${project.thumbnail.symbol}
            </div>
            <div class="project-info">
                <div class="project-name">
                        ${project.name}
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
      </a>
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
    //still in work middle click to close tabs
    el.addEventListener('auxclick', (e) => {
      console.log("voici mon e")
      console.log(e);
      if (e.button === 1) {
        e.stopPropagation();
        closeTab(tab.id);
      }
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

async function get_projects_count() {
  const response = await fetch(`https://api.github.com/users/Zkevitz`);
  const data = await response.json();

  return data.public_repos + 3;
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

