# Mohamed Maatar — Portfolio

Personal portfolio website for **Mohamed Maatar**, Ph.D. Data Scientist & AI/RL Engineer.
A fast, responsive, single-page site built with plain HTML, CSS and vanilla JavaScript —
no build step required.

🔗 **Live site:** https://medmaatar.github.io/portfolio/

## Features

- Dark-first design with a persisted light/dark theme toggle
- Responsive layout (desktop → mobile) with an accessible mobile menu
- Scroll-reveal animations, animated typing headline, count-up stats and scroll progress bar
- Sections: Hero · About · Skills · Experience (timeline) · Projects · Education · Contact
- Downloadable résumé (PDF)
- Respects `prefers-reduced-motion` and `prefers-color-scheme`

## Structure

```
.
├── index.html              # Page markup
├── assets/
│   ├── css/style.css       # All styles (CSS variables for theming)
│   ├── js/main.js          # Theme, nav, reveal, typing, counters
│   └── files/              # Résumé PDF
└── .nojekyll               # Serve assets as-is on GitHub Pages
```

## Deploying on GitHub Pages

1. Push to the repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**.
4. Choose the branch and the `/ (root)` folder, then **Save**.
5. The site publishes at `https://<username>.github.io/portfolio/`.

## Customizing

- Text content lives directly in `index.html`.
- Colors, spacing and fonts are CSS variables at the top of `assets/css/style.css`.
- The rotating job titles are the `roles` array in `assets/js/main.js`.
- Replace `assets/files/Mohamed_Maatar_CV.pdf` to update the downloadable résumé.
