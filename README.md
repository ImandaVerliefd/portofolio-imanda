# Imanda Verliefd — Portfolio

Vite + Vue 3 + Tailwind CSS v4. All content lives in `src/data.js`.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Cloudflare Pages
1. Push this repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build settings:
   - Framework preset: Vue (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
4. (Optional) Add environment variable `NODE_VERSION` = `22`. The `.node-version` file already sets this.
