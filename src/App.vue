<script setup>
import { computed } from 'vue'
import { profile, apiPreview, experience, projects, skills, education } from './data.js'

const jsonLines = computed(() =>
  JSON.stringify(apiPreview, null, 2)
    .split('\n')
    .map((line) => {
      const m = line.match(/^(\s*)("[^"]+"): (.*)$/)
      return m ? { indent: m[1], key: m[2], val: m[3] } : { indent: '', key: '', val: line }
    }),
)
const year = new Date().getFullYear()
const btn = 'rounded-full px-5 py-2.5 font-semibold transition-colors'
</script>

<template>
  <div class="min-h-screen bg-bg font-sans text-ink antialiased">
    <div class="fixed inset-0 -z-10 h-full w-full bg-bg overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px] animate-blob"></div>
      <div class="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-400/20 blur-[150px] animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] h-[700px] w-[700px] rounded-full bg-fuchsia-400/10 blur-[150px] animate-blob animation-delay-4000"></div>
    </div>
    <header class="sticky top-0 z-10 bg-bg/80 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" class="font-extrabold tracking-tight">{{ profile.name }}</a>
        <nav class="flex gap-1 text-sm font-medium" aria-label="Sections">
          <a href="#work" class="rounded-full px-3 py-1.5 text-muted hover:bg-accent-soft hover:text-accent">Work</a>
          <a href="#experience" class="rounded-full px-3 py-1.5 text-muted hover:bg-accent-soft hover:text-accent">Experience</a>
          <a href="#contact" class="rounded-full px-3 py-1.5 text-muted hover:bg-accent-soft hover:text-accent">Contact</a>
        </nav>
      </div>
    </header>

    <main id="top" class="mx-auto max-w-5xl space-y-20 px-6 pb-16">
      <!-- Hero -->
      <section class="grid items-center gap-10 pt-10 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <div v-motion
          :initial="{ opacity: 0, x: -30 }"
          :enter="{ opacity: 1, x: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }">
          <h1 class="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            {{ profile.headline }}
          </h1>
          <p class="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">{{ profile.summary }}</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a :href="`mailto:${profile.email}`" :class="[btn, 'bg-accent text-on-accent hover:opacity-90']">Email me</a>
            <a :href="profile.linkedin" target="_blank" rel="noopener" :class="[btn, 'bg-surface ring-1 ring-line hover:ring-accent']">LinkedIn</a>
            <a :href="profile.github" target="_blank" rel="noopener" :class="[btn, 'bg-surface ring-1 ring-line hover:ring-accent']">GitHub</a>
          </div>
        </div>

        <div v-motion
          :initial="{ opacity: 0, x: 30 }"
          :enter="{ opacity: 1, x: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }" class="overflow-hidden relative group rounded-3xl bg-[#141416] font-mono text-sm text-[#e8e8ec] shadow-2xl ring-1 ring-black/10 transition-transform duration-500 hover:scale-[1.02]">
          <div class="flex items-center justify-between border-b border-white/10 px-5 py-3 text-[#a0a0a8]">
            <span>GET /api/developer</span>
            <span class="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-emerald-300">200 OK</span>
          </div>
          <pre class="overflow-x-auto p-5 leading-relaxed"><code><span
            v-for="(l, i) in jsonLines"
            :key="i"
            class="print-line block whitespace-pre"
            :style="{ animationDelay: `${0.25 + i * 0.09}s` }"
          >{{ l.indent }}<span class="text-violet-300">{{ l.key }}</span><span v-if="l.key">: </span><span :class="l.val.startsWith('&quot;') ? 'text-emerald-300' : ''">{{ l.val }}</span></span></code></pre>
        </div>
      </section>

      <!-- Work: bento grid -->
      <section id="work" v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }">
        <h2 class="text-2xl font-extrabold tracking-tight">Selected work</h2>
        <ul class="mt-6 grid gap-4 md:grid-cols-3">
          <li
            v-for="(p, i) in projects"
            :key="p.title"
            :class="[
              'group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 hover:ring-accent/50',
              i === 0 ? 'bg-accent-soft md:col-span-2' : 'bg-surface ring-1 ring-line',
              i === 3 ? 'md:col-span-2' : '',
            ]"
          >
            <h3 class="text-lg font-bold">{{ p.title }}</h3>
            <p class="mt-2 text-muted">{{ p.text }}</p>
            <ul class="mt-auto flex flex-wrap gap-2 pt-5">
              <li v-for="t in p.tags" :key="t" class="rounded-full bg-bg px-3 py-1 font-mono text-xs ring-1 ring-line">{{ t }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <!-- Experience -->
      <section id="experience" v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }">
        <h2 class="text-2xl font-extrabold tracking-tight">Experience</h2>
        <ol class="mt-6 space-y-4">
          <li v-for="(job, index) in experience" :key="job.company + job.period" class="group relative overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:ring-accent/50" v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }">
            <div class="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-colors group-hover:bg-accent/20"></div>
            <div class="relative z-10">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="font-bold">
                {{ job.role }} <span class="text-muted">at</span> <span class="text-accent">{{ job.company }}</span>
              </h3>
              <span class="flex items-center gap-2 font-mono text-sm text-muted">
                <span v-if="job.period.includes('Present')" class="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">Current</span>
                {{ job.period }}
              </span>
            </div>
            <ul v-if="job.points.length" class="mt-3 list-disc space-y-1 pl-5 text-muted marker:text-accent">
              <li v-for="pt in job.points" :key="pt">{{ pt }}</li>
            </ul>
            </div>
          </li>
        </ol>
      </section>

      <!-- Skills + Education -->
      <section class="grid gap-10 md:grid-cols-2" v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }">
        <div>
          <h2 class="text-2xl font-extrabold tracking-tight">Skills</h2>
          <dl class="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              v-for="(s, index) in skills"
              :key="s.group"
              class="group relative overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:ring-accent/50"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }"
             
            >
              <div class="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/5 blur-3xl transition-colors group-hover:bg-accent/20"></div>
              
              <dt class="relative z-10 flex items-center gap-2 text-sm font-bold text-accent">
                <span class="h-2 w-2 rounded-full bg-accent"></span>
                {{ s.group }}
              </dt>
              <dd class="relative z-10 mt-4 flex flex-wrap gap-2">
                <span 
                  v-for="it in s.items" 
                  :key="it" 
                  class="rounded-full bg-bg px-3 py-1 text-xs font-semibold text-ink ring-1 ring-line transition-colors group-hover:border-accent/30 group-hover:bg-accent/5"
                >
                  {{ it }}
                </span>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h2 class="text-2xl font-extrabold tracking-tight">Education</h2>
          <ul class="mt-6 space-y-4">
            <li v-for="e in education" :key="e.school" class="rounded-3xl bg-surface p-6 ring-1 ring-line">
              <h3 class="font-bold">{{ e.school }}</h3>
              <p class="text-muted">{{ e.detail }}</p>
              <p class="mt-2 font-mono text-sm text-muted">{{ e.period }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visibleOnce="{ opacity: 1, y: 0, transition: { type: 'tween', duration: 300, ease: 'easeOut' } }" class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent to-violet-800 p-8 text-on-accent shadow-2xl sm:p-12">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
        <div class="relative z-10">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Have a system to build or an integration to untangle?</h2>
        <p class="mt-3 text-lg opacity-90">Email or call me.</p>
        <div class="mt-8 flex flex-col gap-5 text-xl font-semibold sm:flex-row sm:flex-wrap sm:gap-x-10">
          <a :href="`mailto:${profile.email}`" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <span class="underline underline-offset-4">{{ profile.email }}</span>
          </a>
          <a :href="`tel:+${profile.phoneRaw}`" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span class="underline underline-offset-4">{{ profile.phone }}</span>
          </a>
        </div>
        <div class="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
          <a :href="`https://wa.me/${profile.phoneRaw}`" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-on-accent px-5 py-2.5 text-accent hover:opacity-90 transition-opacity shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            WhatsApp
          </a>
          <a :href="profile.linkedin" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-on-accent px-5 py-2.5 text-accent hover:opacity-90 transition-opacity shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
        </div>
        </div>
      </section>
    </main>

    <footer class="mx-auto max-w-5xl px-6 pb-8 text-sm text-muted">
      © {{ year }} {{ profile.name }}. {{ profile.location }}.
    </footer>
  </div>
</template>
