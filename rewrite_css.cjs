const fs = require('fs');
let content = fs.readFileSync('src/style.css', 'utf-8');

const themeInline = `@theme inline {
  --font-sans: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, monospace;
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-ink: var(--ink);
  --color-muted: var(--muted);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
  --color-on-accent: var(--on-accent);
  
  --animate-blob: blob 10s infinite;
  
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
}`;

content = content.replace(/@theme inline \{[\s\S]*?\}/, themeInline);

fs.writeFileSync('src/style.css', content);
console.log('CSS Done!');
