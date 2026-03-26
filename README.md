# Beez

Beez is a mobile-first Angular app for beekeepers to track:

- Apiaries
- Hives
- Inspections

Data is stored in local browser storage so you can quickly log updates from your phone.

## Run locally

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## PWA usage

The app includes Angular Service Worker support and a web app manifest.

- Production build contains the service worker.
- Install prompt appears depending on browser heuristics.
- On Android Chrome, use "Add to Home Screen".
- On iOS Safari, use Share -> Add to Home Screen.

For local PWA verification, run a production build and serve the generated output over HTTP.
