# Soumik || thyfrei — Personal Portfolio

My personal portfolio website. It has a home page, a section for my writeups, a projects page that pulls my repositories straight from GitHub, and my CV. I built it with plain HTML, CSS, and JavaScript, so there are no frameworks and no build step. Any host that can serve static files will run it.

## About me

I'm Soumik Pal (alias: thyfrei). I'm pursuing Data Science and Applications at IIT Madras and Aerospace Engineering at IIEST Shibpur. This site is where I keep my writeups, projects, and CV together.

## Features

- Responsive layout with a hamburger menu on small screens
- The current page's name shows in the mobile header and changes as you move between pages
- The active page is underlined in the navigation bar
- Navigation links work from both the main folder and the nested page folders
- A projects page that loads my repositories live from the GitHub API, so new repos show up without me touching the site
- Each project card shows the description, language, stars, topics, last updated date, and a live-site link when there is one
- Click any image to see a larger preview, and press Escape to close it
- A gentle fade-in when a page loads, which switches off for people who prefer reduced motion
- External links open in a new tab

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| WriteUps | `hdTabs/writeups/writeups.html` |
| Projects | `hdTabs/project/project.html` |
| Curriculum Vitae | `hdTabs/cv/cv.html` |

## Project structure

```
Soumik/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── bg_main.png
│   ├── x.png
│   └── gihub.png
└── hdTabs/
    ├── writeups/
    │   ├── writeups.html
    │   ├── writeUpStyle.css
    ├── project/
    │   ├── project.html
    │   └── projectStyle.css
    └── cv/
    │   ├── cv.html
    │   └── cvStyle.css
```

## Running it locally

Clone the repository and start a simple local server:

```bash
git clone https://github.com/thyfrei/Soumik.git
cd Soumik
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. I'd suggest using a server instead of opening the HTML files directly, because some browsers block API requests from pages loaded straight from disk, and that would stop the projects page from loading.

## How it works

**The shared script.** `script.js` runs on every page. It works out which page you're on from the folder name in the URL, so it keeps working even when a host hides the `.html` extension. From there it sets the mobile page title, runs the hamburger menu, fixes the navigation links for the folder depth, marks the active link, adds the image preview, and makes external links open safely.

**The projects page.** It asks the GitHub API for my public repositories and builds a card for each one. The results are saved in the browser for ten minutes, which keeps the site well under GitHub's limit for requests without a token. If GitHub can't be reached, the page shows a short message with a link to my profile instead.

## Choosing which projects appear

Near the bottom of `hdTabs/project/project.html` there are three settings:

| Setting | What it does |
|---|---|
| `USERNAME` | The GitHub account to read repositories from |
| `TOPIC` | If set to something like `"portfolio"`, only repos with that topic are shown. Leave it empty to show everything |
| `EXCLUDE` | A list of repo names that should never appear |

Forked and archived repos are skipped automatically. The text on each card comes from the repo's About description on GitHub, so it's worth filling that in.

## Built with

- HTML5
- CSS3 (flexbox, grid, media queries)
- Vanilla JavaScript
- GitHub REST API
- Google Fonts (Crete Round)

## Find me

- GitHub: [thyfrei](https://github.com/thyfrei)
- X: [@InteractSoumik](https://x.com/InteractSoumik)