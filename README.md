# Damascus Docs

A premium, fast, and responsive documentation website for the Damascus operating system, compiled into static HTML/CSS/JS and fully optimized for hosting on **GitHub Pages**.

## Features

- 🌓 **Auto & Manual Dark/Light Mode**: Elegant, high-tech dark theme by default, with a smooth transitioning light theme toggle (saves choice to `localStorage`).
- 🔍 **Instant Client-Side Search**: Offline search index (`search-index.json`) generated at build time, offering full-text search with highlighting and matching snippets.
- 📱 **Fully Responsive Layout**: Premium desktop experience with a glassmorphism left navigation sidebar, center content area, and right Table of Contents scroll spy, adapting seamlessly to a hamburger-activated drawer menu on mobile devices.
- 📋 **Code Copying**: A quick copy button appears on hover in the corner of all code blocks.
- 🔗 **Heading Anchor Links**: H2 and H3 elements have hover-activated links for quick copying and sharing.
- 🔄 **Next/Previous Navigation**: Auto-calculated next and previous page cards at the bottom of each document.

---

## Local Development & Build

This project is built using a lightweight Node.js script. It compiles the documentation dynamically without bloating the site size with large frameworks.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies

Install the Markdown parsing engine:

```bash
npm install
```

### 2. Build the Documentation

Generate the static website:

```bash
npm run build
```

This compiles all `.md` files inside the `00-Vision/`, `01-Research/`, and `02-Architecture/` folders and places the final assets and HTML documents inside the `/docs` directory.

### 3. Run Local Server

Start a local server to test the site:

```bash
npx http-server docs -p 8080
```

Open your browser to [http://localhost:8080](http://localhost:8080) to preview.

---

## GitHub Pages Deployment

The compiled output is saved under the `/docs` folder. This is standard for GitHub Pages, allowing you to host the site directly from your default branch without setting up complex CI/CD.

### Setup Instructions

1. **Commit and Push** the changes (including the `docs/` folder) to your repository on GitHub:
   ```bash
   git add .
   git commit -m "feat: generate Damascus documentation site"
   git push origin main
   ```
2. Open your repository on **GitHub** in your browser.
3. Click on the **Settings** tab.
4. Under the left-hand menu, click on **Pages**.
5. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: Select your branch (e.g., `main` or `master`)
   - Folder: Select `/docs` (instead of `/ (root)`)
6. Click **Save**.

Your documentation site will be live at `https://<your-github-username>.github.io/<your-repo-name>/` in a couple of minutes!
