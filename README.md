# Emoji Secret — MVP v1.0

A free, multilingual emoji puzzle PWA starter built with plain HTML, CSS and JavaScript.

## Included
- English, Arabic (RTL), and French interface
- 4 categories (Riddles, Emoji, Quiz, Logic) x 3 levels (Easy, Medium, Hard), 60 puzzles (20 per level) in EN/AR/FR
- Picture puzzles (generated SVG) and a Daily Challenge (5 puzzles, shareable result)
- Points scale with level (10/20/30)
- Answer checking, hints, reveal, score and local progress
- Create a custom emoji puzzle and share it as a URL
- Responsive dark purple design
- Basic PWA manifest and offline service worker

## Run locally
Because service workers require a local web server or HTTPS, do not open `index.html` directly if you want offline/PWA features.

From this folder, run one of:
- Python: `python -m http.server 8000`
- VS Code: use the Live Server extension

Then open `http://localhost:8000`.

## Free hosting for a prototype
You can publish the static files using GitHub Pages or another static host with a free tier. Check the provider's current limits before publishing.

## Current MVP limitations
- Progress is stored only on the current device (`localStorage`).
- Daily puzzle rotation is a simple local date-based rotation, not a globally synchronized daily schedule.
- Shared puzzles encode the answer in the URL. This is fine for a casual prototype, not secure or cheat-proof.
- There is no online account system, moderation, multiplayer room, global leaderboard, or ad integration yet.
- The sample puzzle set is intentionally small and should be expanded with original, reviewed content.
- The Google Fonts import is optional; the app falls back to system fonts if offline.

## Before public release
Add privacy information, content/reporting controls if user-generated puzzles are public, robust localization review, analytics with consent where required, and test the app on real devices. Add ads only after the gameplay is stable and after reviewing the current AdMob and app-store policies.
