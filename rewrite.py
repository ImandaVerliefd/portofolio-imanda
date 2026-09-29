import re

with open("src/App.vue", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update project cards
new_project_class = """'group flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 hover:ring-accent/50',"""
content = re.sub(
    r"'flex flex-col rounded-3xl p-6',",
    new_project_class,
    content
)

# 2. Update skills section
old_skills = """<dl class="mt-6 space-y-5">
            <div v-for="s in skills" :key="s.group">
              <dt class="text-sm font-semibold text-muted">{{ s.group }}</dt>
              <dd class="mt-2 flex flex-wrap gap-2">
                <span v-for="it in s.items" :key="it" class="rounded-full bg-surface px-3 py-1 text-sm ring-1 ring-line">{{ it }}</span>
              </dd>
            </div>
          </dl>"""
new_skills = """<dl class="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              v-for="(s, index) in skills"
              :key="s.group"
              class="group relative overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:ring-accent/50"
              v-motion-slide-visible-once-bottom
              :delay="index * 100"
            >
              <!-- Decorative background gradient -->
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
          </dl>"""
content = content.replace(old_skills, new_skills)

# 3. Add v-motion to sections
content = content.replace('<section id="work">', '<section id="work" v-motion-fade-visible-once>')
content = content.replace('<section id="experience">', '<section id="experience" v-motion-fade-visible-once>')
content = content.replace('<section class="grid gap-10 md:grid-cols-2">', '<section class="grid gap-10 md:grid-cols-2" v-motion-fade-visible-once>')
content = content.replace('<section id="contact" class="', '<section id="contact" v-motion-slide-visible-once-bottom class="')
content = content.replace('<div>\n          <h1 class="text-4xl', '<div v-motion-slide-left>\n          <h1 class="text-4xl')
content = content.replace('<div class="overflow-hidden', '<div v-motion-slide-right class="overflow-hidden relative group')
content = content.replace('shadow-xl ring-1 ring-black/10">', 'shadow-2xl ring-1 ring-black/10 transition-transform duration-500 hover:scale-[1.02]">')

# 4. Add interactive background blobs
new_header = """<div class="fixed inset-0 -z-10 h-full w-full bg-bg">
      <div class="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px] mix-blend-multiply animate-blob"></div>
      <div class="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-violet-400/20 blur-[150px] mix-blend-multiply animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-20%] left-[20%] h-[700px] w-[700px] rounded-full bg-fuchsia-400/20 blur-[150px] mix-blend-multiply animate-blob animation-delay-4000"></div>
    </div>
    <header class="sticky top-0 z-10 bg-bg/80 backdrop-blur">"""

content = content.replace('<header class="sticky top-0 z-10 bg-bg/80 backdrop-blur">', new_header)

# 5. Fix Job Cards
old_job = """<li v-for="job in experience" :key="job.company + job.period" class="rounded-3xl bg-surface p-6 ring-1 ring-line">"""
new_job = """<li v-for="(job, index) in experience" :key="job.company + job.period" class="group relative overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:ring-accent/50" v-motion-slide-visible-once-bottom :delay="index * 100">
            <div class="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-colors group-hover:bg-accent/20"></div>
            <div class="relative z-10">"""
content = content.replace(old_job, new_job)
# Close the div added for relative z-10
content = content.replace('</ul>\n          </li>', '</ul>\n            </div>\n          </li>')

# 6. Make contact section sexier
old_contact = """<section id="contact" v-motion-slide-visible-once-bottom class="rounded-[2rem] bg-accent p-8 text-on-accent sm:p-12">"""
new_contact = """<section id="contact" v-motion-slide-visible-once-bottom class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent to-violet-800 p-8 text-on-accent shadow-2xl sm:p-12">
        <div class="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
        <div class="relative z-10">"""
content = content.replace(old_contact, new_contact)
content = content.replace('</a>\n        </div>\n      </section>', '</a>\n        </div>\n        </div>\n      </section>')

with open("src/App.vue", "w", encoding="utf-8") as f:
    f.write(content)
