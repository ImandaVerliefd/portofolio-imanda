const fs = require('fs');

let content = fs.readFileSync('src/App.vue', 'utf-8');

// 1. Add icons to Contact Section
const oldContactContent = `<div class="mt-8 flex flex-col gap-3 text-xl font-semibold sm:flex-row sm:flex-wrap sm:gap-x-10">
          <a :href="\`mailto:\${profile.email}\`" class="underline underline-offset-4">{{ profile.email }}</a>
          <a :href="\`tel:+\${profile.phoneRaw}\`" class="underline underline-offset-4">{{ profile.phone }}</a>
        </div>
        <div class="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <a :href="\`https://wa.me/\${profile.phoneRaw}\`" target="_blank" rel="noopener" class="rounded-full bg-on-accent px-4 py-2 text-accent">WhatsApp</a>
          <a :href="profile.linkedin" target="_blank" rel="noopener" class="rounded-full bg-on-accent px-4 py-2 text-accent">LinkedIn</a>
        </div>`;

const newContactContent = `<div class="mt-8 flex flex-col gap-5 text-xl font-semibold sm:flex-row sm:flex-wrap sm:gap-x-10">
          <a :href="\`mailto:\${profile.email}\`" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span class="underline underline-offset-4">{{ profile.email }}</span>
          </a>
          <a :href="\`tel:+\${profile.phoneRaw}\`" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span class="underline underline-offset-4">{{ profile.phone }}</span>
          </a>
        </div>
        <div class="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
          <a :href="\`https://wa.me/\${profile.phoneRaw}\`" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-on-accent px-5 py-2.5 text-accent hover:opacity-90 transition-opacity shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            WhatsApp
          </a>
          <a :href="profile.linkedin" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-on-accent px-5 py-2.5 text-accent hover:opacity-90 transition-opacity shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
        </div>`;
content = content.replace(oldContactContent, newContactContent);


// 2. Remove delay and increase motion speed
// v-motion-slide-visible-once-bottom :delay="index * 100" -> remove delay
content = content.replace(/ :delay="index \* 100"/g, '');

// To fix the sluggish motion delay, we'll replace the motion directives with custom ones that have a shorter duration
// We will use standard v-motion but pass custom config object or we can use native CSS transitions which are always perfectly in sync.
// Actually, with `@vueuse/motion`, by default it uses a spring. To fix "when i scroll to fast it makes a delay", 
// it's mostly because of the `visible-once` intersection observer threshold and the spring animation time.
// Let's replace v-motion-slide-visible-once-bottom with an inline custom preset that has 0 delay and faster duration, or just switch to simple v-motion fade.

// Let's replace the `v-motion-slide-visible-once-bottom` with custom configuration to make it faster
const fastMotionSlideBottom = `v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }"`;

content = content.replace(/v-motion-slide-visible-once-bottom/g, fastMotionSlideBottom);

// Let's replace `v-motion-slide-left` and `v-motion-slide-right` to be faster too
const fastMotionSlideLeft = `v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }"`;
content = content.replace(/v-motion-slide-left/g, fastMotionSlideLeft);

const fastMotionSlideRight = `v-motion
          :initial="{ opacity: 0, x: 30 }"
          :enter="{ opacity: 1, x: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }"`;
content = content.replace(/v-motion-slide-right/g, fastMotionSlideRight);

// Let's replace `v-motion-fade-visible-once` 
const fastMotionFade = `v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }"`;
content = content.replace(/v-motion-fade-visible-once/g, fastMotionFade);

fs.writeFileSync('src/App.vue', content);
console.log('App.vue updated successfully.');
