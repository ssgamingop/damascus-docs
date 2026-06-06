document.addEventListener('DOMContentLoaded', () => {
  // Get site root path prefix (e.g., './' or '../')
  const rootPath = document.body.getAttribute('data-root') || './';

  // 1. Theme Manager
  initTheme();

  // 2. Mobile Sidebar Drawer
  initMobileDrawer();

  // 3. Client-Side Search
  initSearch(rootPath);

  // 4. Code Block Copy Buttons
  initCodeCopy();

  // 5. Scroll-Spy Table of Contents
  initScrollSpy();

  // 6. Architecture Diagrams
  initDiagrams();
});

/**
 * Diagram rendering
 */
function initDiagrams() {
  document.querySelectorAll('pre > code.language-diagram').forEach(code => {
    const pre = code.parentElement;
    const lines = code.textContent.split('\n').map(line => line.trimEnd()).filter(Boolean);
    const card = document.createElement('figure');
    card.className = 'architecture-diagram';

    const body = document.createElement('div');
    body.className = 'architecture-diagram-body';

    lines.forEach(line => {
      const row = document.createElement('div');
      if (/^(↓|↑|→|←|↔|⇄|⇅|\+)$/.test(line.trim())) {
        row.className = 'diagram-connector';
      } else if (/^[↓↑→←↔⇄⇅]/.test(line.trim())) {
        row.className = 'diagram-connector diagram-connector-label';
      } else if (/[├└]──/.test(line)) {
        row.className = 'diagram-tree-row';
      } else {
        row.className = 'diagram-node';
      }
      row.textContent = line;
      body.appendChild(row);
    });

    card.appendChild(body);
    pre.replaceWith(card);
  });

  renderMermaid();
}

async function renderMermaid() {
  const mermaidBlocks = [...document.querySelectorAll('pre > code.language-mermaid')];
  if (!mermaidBlocks.length) return;

  const mermaid = await waitForMermaid();
  if (!mermaid) return;

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'neutral',
    flowchart: { curve: 'basis', htmlLabels: true }
  });

  mermaidBlocks.forEach(code => {
    const container = document.createElement('div');
    container.className = 'mermaid architecture-mermaid';
    container.textContent = code.textContent;
    code.parentElement.replaceWith(container);
  });

  await mermaid.run({ querySelector: '.architecture-mermaid' });
}

async function waitForMermaid() {
  for (let attempt = 0; attempt < 40; attempt++) {
    if (window.damascusMermaid) return window.damascusMermaid;
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  return null;
}

/**
 * Theme Management (Light/Dark Mode)
 */
function initTheme() {
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const sunIcon = document.querySelector('.theme-toggle-btn .sun-icon');
  const moonIcon = document.querySelector('.theme-toggle-btn .moon-icon');
  
  if (!sunIcon || !moonIcon) return;

  if (theme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

/**
 * Mobile Sidebar Drawer Navigation
 */
function initMobileDrawer() {
  const menuBtn = document.querySelector('.mobile-header-btn');
  const sidebar = document.querySelector('.site-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (!menuBtn || !sidebar || !overlay) return;

  const toggleSidebar = () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  };

  menuBtn.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Close sidebar on link click (mobile)
  sidebar.querySelectorAll('.sidebar-nav-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

/**
 * Client-Side Local Search Index
 */
function initSearch(rootPath) {
  const searchInput = document.querySelector('.search-input');
  const searchResultsDropdown = document.querySelector('.search-results-dropdown');
  
  if (!searchInput || !searchResultsDropdown) return;

  let searchIndex = null;
  let isIndexLoading = false;

  // Lazy load search index on focus or input
  const loadSearchIndex = async () => {
    if (searchIndex || isIndexLoading) return;
    isIndexLoading = true;
    try {
      const response = await fetch(`${rootPath}search-index.json`);
      searchIndex = await response.json();
    } catch (e) {
      console.error('Failed to load search index:', e);
    } finally {
      isIndexLoading = false;
    }
  };

  searchInput.addEventListener('focus', loadSearchIndex);
  searchInput.addEventListener('input', async (e) => {
    await loadSearchIndex();
    const query = e.target.value.trim().toLowerCase();
    
    if (!query) {
      searchResultsDropdown.innerHTML = '';
      searchResultsDropdown.classList.remove('active');
      return;
    }

    if (!searchIndex) {
      searchResultsDropdown.innerHTML = '<div class="search-result-empty">Loading search index...</div>';
      searchResultsDropdown.classList.add('active');
      return;
    }

    const results = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(query) || 
             item.content.toLowerCase().includes(query) || 
             (item.category && item.category.toLowerCase().includes(query));
    });

    displaySearchResults(results, query, rootPath);
  });

  // Display Search Results
  function displaySearchResults(results, query, rootPath) {
    searchResultsDropdown.innerHTML = '';
    
    if (results.length === 0) {
      searchResultsDropdown.innerHTML = '<div class="search-result-empty">No results found</div>';
      searchResultsDropdown.classList.add('active');
      return;
    }

    // Limit results to top 8
    const topResults = results.slice(0, 8);
    
    topResults.forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      
      // Highlight matching query in snippet
      let snippet = item.content;
      const index = snippet.toLowerCase().indexOf(query);
      if (index !== -1) {
        const start = Math.max(0, index - 40);
        const end = Math.min(snippet.length, index + query.length + 80);
        snippet = (start > 0 ? '...' : '') + 
                  snippet.substring(start, end) + 
                  (end < snippet.length ? '...' : '');
      } else {
        snippet = snippet.substring(0, 100) + '...';
      }

      // Safe HTML escape and highlighting
      const escapedTitle = escapeHTML(item.title);
      const highlightedTitle = highlightMatch(escapedTitle, query);
      const escapedSnippet = escapeHTML(snippet);
      const highlightedSnippet = highlightMatch(escapedSnippet, query);
      const categoryLabel = item.category ? escapeHTML(item.category) : '';

      div.innerHTML = `
        <div class="search-result-category">${categoryLabel}</div>
        <div class="search-result-title">${highlightedTitle}</div>
        <div class="search-result-snippet">${highlightedSnippet}</div>
      `;

      div.addEventListener('click', () => {
        window.location.href = `${rootPath}${item.path}`;
      });

      searchResultsDropdown.appendChild(div);
    });

    searchResultsDropdown.classList.add('active');
  }

  // Keyboard shortcut '/' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
      searchResultsDropdown.classList.remove('active');
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark style="background-color: var(--accent-light); color: var(--accent-color); font-weight: 600; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Copy Code Block Buttons
 */
function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;

    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    copyBtn.innerHTML = `
      <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:none; color: var(--accent-color);">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    pre.appendChild(copyBtn);

    copyBtn.addEventListener('click', async () => {
      const codeText = code.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        
        // Show success state
        const copyIcon = copyBtn.querySelector('.copy-icon');
        const checkIcon = copyBtn.querySelector('.check-icon');
        
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        copyBtn.style.borderColor = 'var(--accent-color)';
        
        setTimeout(() => {
          copyIcon.style.display = 'block';
          checkIcon.style.display = 'none';
          copyBtn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    });
  });
}

/**
 * Scroll-Spy for the Table of Contents (ToC)
 */
function initScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  const headings = Array.from(document.querySelectorAll('article.doc-content h2, article.doc-content h3'));
  
  if (tocLinks.length === 0 || headings.length === 0) return;

  let activeIndex = -1;

  const onScroll = () => {
    const scrollPos = window.scrollY + 100; // Offset for header height

    // Find the current heading scrolled past
    let index = headings.findIndex(h => h.offsetTop > scrollPos) - 1;
    
    // If scrolled past all headings, select the last one
    if (index === -2) {
      index = headings.length - 1;
    }
    
    // If scrolled before the first heading, select none
    if (index < 0) {
      index = -1;
    }

    if (index !== activeIndex) {
      activeIndex = index;
      
      tocLinks.forEach(link => link.classList.remove('active'));
      
      if (activeIndex !== -1) {
        const id = headings[activeIndex].id;
        const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll(); // Run initially
}
