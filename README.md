# Medu 𓅓

**Write your name in Egyptian hieroglyphs — then learn to read them.**

Medu is a small, self-contained web app that also ships as a native iOS and
Android app. Type any name and see it in genuine ancient Egyptian signs,
learn to read in six short lessons, and drill the signs with flip-cards.

> A standalone commercial product. It reuses Egyptological material by the
> same author but is its own project, with its own identity and license.

---

## Run it locally

No build step, no server needed — it's plain HTML/CSS/JavaScript.

```bash
# just open the file…
open www/index.html            # macOS

# …or serve it (needed for the offline service worker to register)
cd www && python3 -m http.server 8000   # then visit http://localhost:8000
```

## What's inside

```
www/                 The whole web app (this is what ships)
  index.html         Four tabs: Type · Learn · Train · Medu+
  medu.css           Design system ("sunlit papyrus"), fonts bundled locally
  manifest.webmanifest, sw.js   Installable PWA + offline cache
  js/                App code (keypad, lessons, training, shell)
  data/              Sign list (Gardiner) and the six lessons
  fonts/             Fredoka · Nunito · Noto Sans Egyptian Hieroglyphs (bundled)
  photos/            Photographs used in the lessons
  icons/             App icons (the owl)
capacitor.config.json   Native app config (appId app.medu.hieroglyphs)
package.json            Capacitor tooling + scripts
PUBLISHING.md           Step-by-step: App Store & Google Play
LICENSE, NOTICE         Proprietary license + third-party credits
```

## Features

- **Type** — any name → real uniliteral signs inside a cartouche; copy,
  save as PNG, share. On-screen keyboard. Honest note that it's a phonetic
  approximation.
- **Learn** — six lessons with quizzes and saved progress.
- **Train** — flip-card drills over the phonetic signs, with a streak.
- **Medu+** — placeholder for the premium tier (to be defined).
- **Offline** — fonts, data, and photos are all bundled; nothing needs the
  network at runtime.

## Publish to the app stores

See **[PUBLISHING.md](PUBLISHING.md)**. Short version: `npm install`, then
`npx cap add ios` / `npx cap add android`, then build & submit from Xcode /
Android Studio.

## License

Proprietary — © 2026 @corpasflavia. See [LICENSE](LICENSE) and
[NOTICE](NOTICE). (This is intentionally **not** an open/non-commercial
license, since Medu is meant to be sold.)

*Made with hieroglyphs.* 𓂋𓈖
