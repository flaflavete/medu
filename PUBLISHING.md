# Publishing **Medu** to the App Store & Google Play

Medu is a self-contained web app (in `www/`). To put it on the stores we wrap
that exact web code in a native shell with **Capacitor** — no rewrite. This
guide assumes you have a **Mac** (needed for iOS) and Node.js installed.

> The app is already **offline-ready**: fonts, data, and photos are bundled
> and a service worker caches everything. Nothing depends on the internet at
> runtime, which is what the stores require.

---

## 0. What you need first

| Item | Cost | Notes |
|---|---|---|
| Apple Developer account | **US$ 99 / year** | developer.apple.com — required for the App Store |
| Google Play Developer account | **US$ 25 once** | play.google.com/console |
| Xcode (Mac) | free | App Store → Xcode. Needed to build/submit iOS. |
| Android Studio | free | developer.android.com/studio |
| A privacy policy URL | free | A simple web page. Medu collects no personal data. |

Both stores keep **15–30%** of any sale or subscription.

---

## 1. One-time setup (run in this project folder)

```bash
npm install                 # installs the Capacitor tooling
npx cap add ios             # creates ios/     (needs your Mac)
npx cap add android         # creates android/
npx capacitor-assets generate --iconBackgroundColor '#C65D3B' --splashBackgroundColor '#FBF3E2'
```

`ios/` and `android/` are native projects (git-ignored). The `assets` command
generates every icon + splash size from `www/icons/icon-1024.png`.

## 2. Every time you change the app

```bash
npx cap copy                # push the web changes into the native projects
```

Bump the version before each upload:
- iOS: Xcode → target → **Version** / **Build**.
- Android: `android/app/build.gradle` → `versionCode` (+1), `versionName`.

---

## 3. Ship Android (Google Play) — easiest, start here

```bash
npx cap open android        # opens Android Studio
```
1. **Build → Generate Signed Bundle / APK → Android App Bundle (.aab)**.
2. Create an **upload keystore** the first time — **keep it forever** (every
   future update must use the same key).
3. Upload the `.aab` in **Play Console → your app → Production** (or Internal
   testing first). Fill the listing (section 5) and submit.

*No Android Studio?* Because Medu is a PWA you can also generate a Play
package with [PWABuilder](https://pwabuilder.com) from a deployed URL.

---

## 4. Ship iOS (App Store) — on your Mac

```bash
npx cap open ios            # opens Xcode
```
1. **App** target → **Signing & Capabilities** → pick your Apple **Team**.
2. Bundle Identifier: `app.medu.hieroglyphs` (or your own).
3. **Any iOS Device** → **Product → Archive**.
4. Organizer → **Distribute App → App Store Connect → Upload**.
5. In [App Store Connect](https://appstoreconnect.apple.com): create the app,
   attach the build, fill the listing, submit for review.

---

## 5. Store listing assets (both stores)

- **Name:** Medu — subtitle e.g. "Learn Egyptian Hieroglyphs".
- **Description** (short + full), English first.
- **Keywords:** hieroglyphs, Egypt, ancient Egyptian, learn to read, cartouche.
- **Screenshots** per required device size — capture the Type / Learn / Train
  screens in the iOS Simulator and Android emulator.
- **App icon** — already generated (the owl).
- **Privacy:** Medu stores only local progress and collects no personal data.
  Answer "no data collected" in both stores' data-safety questionnaires, and
  provide a privacy-policy URL saying exactly that.
- **Category:** Education.

---

## 6. Selling later (Medu+)

To charge inside the app you must use each store's billing (Apple StoreKit /
Google Play Billing) via Capacitor purchase plugins, then gate the Medu+
features behind a successful purchase. Do this after the free MVP is live.

---

## Quick reference

```bash
npm install                        # once
npx cap add ios | android          # once per platform
npx cap copy                       # after each web change
npx cap open ios | android         # build & submit from the IDE
```

Bundle id: `app.medu.hieroglyphs` · Web root: `www/` · Offline: yes
