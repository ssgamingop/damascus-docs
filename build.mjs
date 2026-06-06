import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Define directories
const WORKSPACE_DIR = process.cwd();
const SRC_DIRS = ['00-Vision', '01-Research', '02-Architecture'];
const OUTPUT_DIR = path.join(WORKSPACE_DIR, 'docs');
const ASSETS_SRC_DIR = path.join(WORKSPACE_DIR, 'assets');
const ASSETS_OUT_DIR = path.join(OUTPUT_DIR, 'assets');

// Custom marked rendering to support header anchors
const renderer = {
  heading(arg1, arg2) {
    let text = '';
    let depth = 2;
    if (typeof arg1 === 'object') {
      text = arg1.text;
      depth = arg1.depth;
    } else {
      text = arg1;
      depth = arg2;
    }
    const id = text.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    return `<h${depth} id="${id}">${text}<a href="#${id}" class="heading-anchor">#</a></h${depth}>\n`;
  }
};
marked.use({ renderer });

// Main execution function
async function main() {
  console.log('Starting Damascus Docs Build...');
  
  // 1. Ensure output and assets directories exist
  ensureDirExists(OUTPUT_DIR);
  ensureDirExists(ASSETS_OUT_DIR);
  ensureDirExists(path.join(ASSETS_OUT_DIR, 'css'));
  ensureDirExists(path.join(ASSETS_OUT_DIR, 'js'));

  // 2. Scan and parse all markdown files
  const filesBySection = {};
  const flatPageList = [];
  const searchIndex = [];

  for (const srcDir of SRC_DIRS) {
    const srcDirPath = path.join(WORKSPACE_DIR, srcDir);
    if (!fs.existsSync(srcDirPath)) {
      console.warn(`Warning: Source directory ${srcDir} does not exist. Skipping.`);
      continue;
    }

    // Read and sort markdown files
    const files = fs.readdirSync(srcDirPath)
      .filter(file => file.endsWith('.md'))
      .sort();

    filesBySection[srcDir] = [];

    for (const filename of files) {
      const filePath = path.join(srcDirPath, filename);
      const markdownContent = fs.readFileSync(filePath, 'utf-8');

      // Parse metadata block (Version, Status, Priority)
      const { metadata, contentOnly } = parseMetadata(markdownContent);
      const enhancedContent = enhanceDiagrams(contentOnly);

      // Extract descriptive Title
      const title = extractTitle(markdownContent, filename);

      const htmlFilename = filename.replace('.md', '.html');
      const relativeLink = `${srcDir}/${htmlFilename}`;

      const pageInfo = {
        srcDir,
        filename,
        htmlFilename,
        relativeLink,
        title,
        metadata,
        markdownContent: enhancedContent
      };

      filesBySection[srcDir].push(pageInfo);
      flatPageList.push(pageInfo);

      // Add to search index (strip markdown to simple readable text)
      const plainText = stripMarkdown(contentOnly);
      searchIndex.push({
        title,
        category: getSectionLabel(srcDir),
        path: relativeLink,
        content: plainText
      });
    }
  }

  // Add homepage (index.html) to search index
  searchIndex.unshift({
    title: 'Home',
    category: 'General',
    path: 'index.html',
    content: 'Damascus Docs home page. Privacy-first, local-first intelligence operating system. Vision, Research, and Architecture documentation.'
  });

  // 3. Build the sidebar navigation HTML
  const sidebarHtml = buildSidebarHtml(filesBySection, '');

  // 4. Compile page HTML files
  for (let i = 0; i < flatPageList.length; i++) {
    const page = flatPageList[i];
    const prevPage = i > 0 ? flatPageList[i - 1] : null;
    const nextPage = i < flatPageList.length - 1 ? flatPageList[i + 1] : null;

    // Convert markdown content to HTML
    const contentHtml = await marked.parse(page.markdownContent);

    // Build Table of Contents
    const tocHtml = buildTocHtml(page.markdownContent);

    // Build page-specific metadata badges
    const metaBadgesHtml = buildMetaBadgesHtml(page.metadata);

    // Build next/prev footer navigation
    const footerNavHtml = buildFooterNavHtml(prevPage, nextPage, '../');

    // Build sidebar with active state for this nested directory
    const pageSidebarHtml = buildSidebarHtml(filesBySection, page.relativeLink);

    // Full HTML Template
    const fullHtml = getHtmlTemplate({
      title: `${page.title} | Damascus Docs`,
      rootPath: '../',
      sidebarHtml: pageSidebarHtml,
      contentHtml: `${metaBadgesHtml} ${contentHtml}`,
      tocHtml,
      footerNavHtml,
      activeLink: page.relativeLink
    });

    const outDir = path.join(OUTPUT_DIR, page.srcDir);
    ensureDirExists(outDir);
    fs.writeFileSync(path.join(outDir, page.htmlFilename), fullHtml, 'utf-8');
  }

  // 5. Compile Home/Landing page (index.html)
  const homeSidebarHtml = buildSidebarHtml(filesBySection, 'index.html');
  const homeContentHtml = `
    <div class="hero-section">
      <div class="hero-logo">D</div>
      <h1 class="hero-title">Damascus Docs</h1>
      <p class="hero-tagline">A privacy-first, local-first, self-improving intelligence operating system designed to augment human capability.</p>
      <a href="00-Vision/Vision.html" class="hero-cta">
        Get Started
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </a>
    </div>

    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">👁️</div>
        <h2 class="pillar-title">Vision & Mission</h2>
        <p class="pillar-desc">Explore the core philosophy, mission statement, and long-term objectives of the Damascus platform.</p>
        <a href="00-Vision/Mission.html" style="margin-top: 16px; display: inline-flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600;">
          Read Vision
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🔬</div>
        <h2 class="pillar-title">Research & Analysis</h2>
        <p class="pillar-desc">Deep dives into AI operating systems, multi-agent systems, memory architectures, and self-improving agents.</p>
        <a href="01-Research/AI-Operating-Systems.html" style="margin-top: 16px; display: inline-flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600;">
          Read Research
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🏗️</div>
        <h2 class="pillar-title">Core Architecture</h2>
        <p class="pillar-desc">Understand the Damascus Core, workspace system, orchestration layer, and dynamic tool management.</p>
        <a href="02-Architecture/Core-System.html" style="margin-top: 16px; display: inline-flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600;">
          Read Architecture
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </div>
    </div>
  `;

  const homeHtml = getHtmlTemplate({
    title: 'Damascus Docs',
    rootPath: './',
    sidebarHtml: homeSidebarHtml,
    contentHtml: homeContentHtml,
    tocHtml: '',
    footerNavHtml: '',
    activeLink: 'index.html'
  });

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), homeHtml, 'utf-8');

  // 6. Copy assets stylesheets and scripts
  copyAssets();

  // 7. Write search-index.json
  fs.writeFileSync(path.join(OUTPUT_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf-8');

  console.log('Build completed successfully! Built site folder: docs/');
}

// Helper: Ensure directory exists
function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper: Parse Metadata
function parseMetadata(markdown) {
  const lines = markdown.split('\n');
  const metadata = {};
  let contentStartIndex = 0;
  let inMetadata = false;

  // Simple scan of first 15 lines for metadata markers
  for (let i = 0; i < Math.min(lines.length, 15); i++) {
    const line = lines[i].trim();
    if (i === 0 && line.startsWith('#') && line.endsWith('.md')) {
      // First line filename, skip
      continue;
    }
    if (line.startsWith('Version:')) {
      metadata.version = line.replace('Version:', '').trim();
    } else if (line.startsWith('Status:')) {
      metadata.status = line.replace('Status:', '').trim();
    } else if (line.startsWith('Priority:')) {
      metadata.priority = line.replace('Priority:', '').trim();
    } else if (line === '---') {
      contentStartIndex = i + 1;
      break;
    }
  }

  // Return parsed object
  const contentOnly = lines.slice(contentStartIndex).join('\n');
  return { metadata, contentOnly };
}

// Helper: Extract H1 Title or clean filename
function extractTitle(markdown, filename) {
  const lines = markdown.split('\n');
  let title = '';
  
  // Find first H1
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      title = trimmed.replace('# ', '').trim();
      break;
    }
  }

  // Fallback to filename cleanup
  if (!title || title.endsWith('.md')) {
    title = filename.replace('.md', '');
  }

  if (title.endsWith('.md')) {
    title = title.substring(0, title.length - 3);
  }

  return title.replace(/[-_]/g, ' ');
}

// Helper: Get section name label
function getSectionLabel(dir) {
  if (dir === '00-Vision') return 'Vision';
  if (dir === '01-Research') return 'Research';
  if (dir === '02-Architecture') return 'Architecture';
  return dir;
}

// Helper: Strip markdown for plain search text
function stripMarkdown(markdown) {
  return markdown
    .replace(/<[^>]*>/g, '') // Strip inline HTML
    .replace(/[#*`_~\[\]()\-+|]/g, ' ') // Strip special MD markdown chars
    .replace(/\s+/g, ' ') // Collapse whitespaces
    .trim();
}

// Helper: Upgrade the existing arrow/tree notation into diagram blocks.
// Explicit Mermaid fences remain available for complex diagrams.
function enhanceDiagrams(markdown) {
  const lines = markdown.split('\n');
  const output = [];
  let inFence = false;

  for (let i = 0; i < lines.length;) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      output.push(line);
      i++;
      continue;
    }

    if (!inFence && isDiagramLine(line)) {
      const block = [];
      let cursor = i;

      while (cursor < lines.length && (isDiagramLine(lines[cursor]) || lines[cursor].trim() === '')) {
        block.push(lines[cursor]);
        cursor++;
      }

      while (block.length && block[block.length - 1].trim() === '') block.pop();

      const meaningfulLines = block.filter(candidate => candidate.trim() !== '');
      const connectorCount = meaningfulLines.filter(candidate => isConnectorLine(candidate)).length;
      const hasTree = meaningfulLines.some(candidate => /[├└]──/.test(candidate));

      if (meaningfulLines.length >= 3 && (connectorCount >= 1 || hasTree)) {
        output.push('```diagram');
        output.push(...meaningfulLines);
        output.push('```');
        output.push('');
        i = cursor;
        continue;
      }
    }

    output.push(line);
    i++;
  }

  return output.join('\n');
}

function isDiagramLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^#{1,6}\s/.test(trimmed)) return false;
  if (/^([-*+]|\d+\.)\s/.test(trimmed)) return false;
  if (/^(Version|Status|Priority|Purpose):/.test(trimmed)) return false;
  if (/[.?!:]$/.test(trimmed)) return false;
  if (trimmed.length > 72 && !/[├└]──/.test(line)) return false;
  return isConnectorLine(line) ||
    /^[\s│├└─┬┼]+/.test(line) ||
    /^[A-Za-z0-9][A-Za-z0-9 /&(),.:_'"+-]*$/.test(trimmed);
}

function isConnectorLine(line) {
  const trimmed = line.trim();
  return /^(↓|↑|→|←|↔|⇄|⇅|\+)$/.test(trimmed) ||
    /^[↓↑→←↔⇄⇅].+/.test(trimmed) ||
    /[├└]──/.test(line);
}

// Helper: Build Sidebar Navigation HTML
function buildSidebarHtml(filesBySection, activeLink) {
  let html = '';
  for (const section of SRC_DIRS) {
    const files = filesBySection[section] || [];
    const sectionLabel = getSectionLabel(section);

    html += `<div class="sidebar-section">\n`;
    html += `  <div class="sidebar-section-title">${sectionLabel}</div>\n`;
    html += `  <ul class="sidebar-nav-list">\n`;

    for (const file of files) {
      const isActive = activeLink.endsWith(file.relativeLink);
      const activeClass = isActive ? 'active' : '';
      
      // Determine link href prefix (homepage needs folder prefix, pages in subfolders need relative pathing)
      const href = activeLink.includes('/') ? `../${file.relativeLink}` : file.relativeLink;

      html += `    <li class="sidebar-nav-item">\n`;
      html += `      <a href="${href}" class="sidebar-nav-link ${activeClass}">${file.title}</a>\n`;
      html += `    </li>\n`;
    }

    html += `  </ul>\n`;
    html += `</div>\n`;
  }
  return html;
}

// Helper: Build Table of Contents HTML
function buildTocHtml(markdown) {
  const headerRegex = /^(##|###)\s+(.+)$/gm;
  let match;
  let html = '';
  let count = 0;

  while ((match = headerRegex.exec(markdown)) !== null) {
    count++;
    const depth = match[1].length;
    const titleText = match[2].trim();
    const id = titleText.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    html += `<li class="toc-item depth-${depth}">\n`;
    html += `  <a href="#${id}" class="toc-link">${titleText}</a>\n`;
    html += `</li>\n`;
  }

  if (count === 0) return '';
  return `
    <aside class="site-toc">
      <div class="toc-title">On this page</div>
      <ul class="toc-list">
        ${html}
      </ul>
    </aside>
  `;
}

// Helper: Build metadata badges HTML
function buildMetaBadgesHtml(metadata) {
  let badges = '';
  if (metadata.version) {
    badges += `<span class="meta-badge">Version ${metadata.version}</span>`;
  }
  if (metadata.status) {
    const cleanStatus = metadata.status.replace(/[-_]/g, ' ');
    badges += `<span class="meta-badge status-${metadata.status.toLowerCase().replace(/\s+/g, '-')}">${cleanStatus}</span>`;
  }
  if (metadata.priority) {
    badges += `<span class="meta-badge priority-${metadata.priority.toLowerCase()}">Priority ${metadata.priority}</span>`;
  }
  
  if (!badges) return '';
  return `<div class="doc-meta">${badges}</div>`;
}

// Helper: Build Next/Prev Footer Navigation
function buildFooterNavHtml(prevPage, nextPage, rootPath) {
  if (!prevPage && !nextPage) return '';
  let html = `<div class="doc-footer-nav">`;

  if (prevPage) {
    html += `
      <a href="${rootPath}${prevPage.relativeLink}" class="nav-card prev">
        <span class="nav-card-label">Previous</span>
        <span class="nav-card-title">${prevPage.title}</span>
      </a>
    `;
  }

  if (nextPage) {
    html += `
      <a href="${rootPath}${nextPage.relativeLink}" class="nav-card next">
        <span class="nav-card-label">Next</span>
        <span class="nav-card-title">${nextPage.title}</span>
      </a>
    `;
  }

  html += `</div>`;
  return html;
}

// Helper: Copy Stylesheet & Scripts
function copyAssets() {
  const cssIn = path.join(ASSETS_SRC_DIR, 'css', 'style.css');
  const jsIn = path.join(ASSETS_SRC_DIR, 'js', 'main.js');

  const cssOut = path.join(ASSETS_OUT_DIR, 'css', 'style.css');
  const jsOut = path.join(ASSETS_OUT_DIR, 'js', 'main.js');

  if (fs.existsSync(cssIn)) {
    fs.copyFileSync(cssIn, cssOut);
  } else {
    console.error('Error: style.css not found at source path');
  }

  if (fs.existsSync(jsIn)) {
    fs.copyFileSync(jsIn, jsOut);
  } else {
    console.error('Error: main.js not found at source path');
  }
}

// HTML Shell Template
function getHtmlTemplate({ title, rootPath, sidebarHtml, contentHtml, tocHtml, footerNavHtml }) {
  // Determine if index active
  const isIndex = rootPath === './';
  const logoHref = isIndex ? 'index.html' : '../index.html';

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="Damascus - Privacy-first, local-first intelligence operating system documentation">
  <link rel="stylesheet" href="${rootPath}assets/css/style.css">
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    window.damascusMermaid = mermaid;
  </script>
</head>
<body data-root="${rootPath}">

  <!-- Global Header -->
  <header class="site-header">
    <div class="brand">
      <button class="mobile-header-btn" aria-label="Toggle sidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <a href="${logoHref}" class="brand">
        <div class="logo">D</div>
        <span class="title">Damascus Docs</span>
      </a>
    </div>

    <div class="header-controls">
      <!-- Search Input Container -->
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" class="search-input" placeholder="Search docs..." aria-label="Search documentation">
          <kbd class="search-shortcut">/</kbd>
        </div>
        
        <!-- Results Dropdown -->
        <div class="search-results-dropdown"></div>
      </div>

      <!-- Theme Switcher -->
      <button class="theme-toggle-btn" aria-label="Toggle theme">
        <!-- Sun (Light Theme Icon) -->
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <!-- Moon (Dark Theme Icon) -->
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile Drawer Overlay -->
  <div class="sidebar-overlay"></div>

  <!-- Layout Grid -->
  <div class="layout-container">
    
    <!-- Left Navigation Sidebar -->
    <aside class="site-sidebar">
      ${sidebarHtml}
    </aside>

    <!-- Main Content Area -->
    <main class="main-content">
      <div class="content-wrapper">
        <article class="doc-content">
          ${contentHtml}
        </article>
        ${footerNavHtml}
      </div>
    </main>

    <!-- Right Table of Contents Sidebar -->
    ${tocHtml}

  </div>

  <script src="${rootPath}assets/js/main.js"></script>
</body>
</html>`;
}

// Run the script
main().catch(console.error);
