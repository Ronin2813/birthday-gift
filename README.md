# A Birthday Gift From My Heart ❤️

A luxury, cinematic, single-page romantic birthday website — a digital love letter designed to feel handcrafted and deeply personal.

## Quick Start

1. Open `index.html` in a modern browser (Chrome, Firefox, Safari, Edge).
2. For the best experience, serve it locally:
   ```bash
   # Python
   python -m http.server 8000

   # or Node
   npx serve .
   ```
3. Visit `http://localhost:8000`

## Customization Guide

### 1. Personal Name & Messages

Edit the content directly in `index.html`. Search for these key sections:

| Section | Location in HTML | What to change |
|---------|------------------|----------------|
| Intro | `#intro` | Title & subtitle |
| Hero | `#hero` | "Happy Birthday" headline & subheadline |
| Before Anything Else | `#intro-letter` | Opening letter paragraphs |
| Thank You | `#thank-you` | Gratitude paragraphs |
| Qualities | `#qualities` | The 10 cards (titles + descriptions) |
| Love Letter | `#love-letter` | Full letter lines inside `#loveLetterContent` |
| Gift Reveal | `#gift` | Why this gift exists |
| Promise | `#promise` | Your promises |
| Final Scene | `#final` | Closing wish |

### 2. Photos

In the **Photo Gallery** section, replace each `.photo-placeholder` with a real image:

```html
<div class="gallery-frame">
  <img src="assets/photo1.jpg" alt="A beautiful memory" loading="lazy" />
</div>
```

Recommended:
- Portrait orientation (3:4)
- Optimized web images (WebP or compressed JPG)
- 6–10 photos work best

### 3. Background Music (Optional)

Add just before the closing `</body>` tag:

```html
<audio id="bgMusic" loop preload="auto">
  <source src="assets/your-song.mp3" type="audio/mpeg" />
</audio>
```

Then trigger play after the "Open My Gift" button is clicked (inside the button click handler in `js/main.js`).

### 4. Colors & Theme

All colors live in `css/styles.css` under `:root`. Main variables:

- `--bg-primary` / `--bg-secondary` — deep blacks
- `--accent-pink` / `--accent-pink-light` — romantic glows
- `--sunflower` / `--sunflower-light` — golden accents

### 5. Fonts

Currently using:
- **Cormorant Garamond** — elegant serif headings
- **Inter** — clean body text
- **Great Vibes** — handwriting / script moments

Change the Google Fonts link in `<head>` if desired.

## Technical Notes

- **Animations**: GSAP + ScrollTrigger (loaded via CDN)
- **Particles**: Lightweight canvas (hearts, dust, stars, petals)
- **Performance**: Hardware-accelerated, respects `prefers-reduced-motion`
- **Responsive**: Mobile-first, fluid typography, touch-friendly gallery
- **Accessibility**: ARIA labels, keyboard-friendly buttons, high-contrast text

## File Structure

```
birthday-gift/
├── index.html          # Full page structure & content
├── css/
│   └── styles.css      # Design system + all visual styles
├── js/
│   └── main.js         # Animations, particles, interactions
├── assets/             # Place photos & music here
└── README.md
```

## Emotion & Tone

The writing intentionally focuses on **gratitude** and admiration for her character (hardworking, kind, organized, strong) rather than generic romance clichés. Feel free to rewrite every paragraph so it sounds exactly like you.

Made with quiet intention.
