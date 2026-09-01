/**
 * Single source of truth for site content. Components render this data; updating
 * the bio, skills or projects means editing this file and nothing else.
 */

export const site = {
  name: 'Shawn Meister',
  brand: 'fullstackchef',
  domain: 'fullstackchef.dev',
  url: 'https://fullstackchef.dev',
  role: 'Full-Stack Developer',
  tagline: 'Full-stack developer, former head chef',
  location: 'Fredericton, New Brunswick',
  description:
    'Full-stack developer in Fredericton, NB. Working across legacy and modern ' +
    'codebases - PHP, JavaScript, C, C++ and PL/B - modernizing long-running sites and ' +
    'building new ones to spec.'
}

export const socialLinks = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@CookingMeister',
    url: 'https://github.com/CookingMeister?tab=repositories',
    icon: 'github',
    blurb: 'Public projects, experiments and source code.'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'in/shawn-meister',
    url: 'https://www.linkedin.com/in/shawn-meister/',
    icon: 'linkedin',
    blurb: 'Work history, and the best place to start a conversation.'
  }
]

export const about = {
  heading: 'I am Shawn Meister',
  subheading: 'Full-Stack Developer / Former Head Chef / Homelab Tinkerer',
  paragraphs: [
    'I came to this career sideways. Before writing software I ran kitchens as a head chef, and the habits came with me: work clean, respect the timing, and never send out something you would not happily eat yourself. That is where the name fullstackchef.dev comes from.',

    'I work across both legacy and modern codebases - PHP, JavaScript, C, C++, and PL/B including Visual PL/B. Much of my work is on the PL/B language runtime itself - a long-lived C and C++ codebase, where every change is inherited by all applications written in the language. The rest is modernization: taking sites that have been running for decades and rewriting, refactoring, or rebuilding them to client specification. I have delivered three of those end to end, running on Azure and IIS 10.',

    'Most recently I wrote a regex engine in C for the PL/B runtime - a lighter alternative to PCRE2 that still supports grouping, backtracking, and replacement.',

    'Off the clock I run a homelab on Proxmox VE, TrueNAS SCALE CE and OPNsense. It started as a way to learn Bash, Linux and networking properly, and it keeps paying that back. When I am not in a terminal I am outdoors somewhere in the Saint John River valley.'
  ],
  portrait: {
    src: '/img/profile.png',
    alt: 'Shawn Meister smiling outdoors on a sunny day beside the water'
  }
}

/** `links: []` marks closed-source work; those cards render without a link row. */
export const projects = [
  {
    id: 'plb-regex-engine',
    title: 'PL/B Regex Engine',
    description:
      'A regular expression engine written from scratch in C for the PL/B language runtime. ' +
      'Lighter than PCRE2 while still supporting grouping, backtracking, and replacement.',
    tags: ['C', 'C++', 'PL/B', 'Parsing', 'Backtracking'],
    featured: true,
    closedSource: true,
    links: []
  },
  {
    id: 'legacy-modernization',
    title: 'Legacy Site Modernization',
    description:
      'Three client sites delivered end to end - rewrites, refactors, and ground-up builds to ' +
      'client specification, migrating long-running code to modern standards on Azure and IIS 10.',
    tags: ['PHP', 'JavaScript', 'Azure', 'IIS 10', 'Refactoring'],
    featured: true,
    closedSource: true,
    links: []
  },
  {
    id: 'openai-vue-app',
    title: 'OpenAI Chat App',
    description:
      'Text and image chat client for the OpenAI API. A Vue 3 front end talks to an Express ' +
      'backend that keeps the API key server-side and handles image uploads.',
    tags: ['Vue 3', 'Vite', 'Express', 'OpenAI API'],
    // No demo: the app needs an OpenAI API key, so there is nothing to host publicly.
    links: [{ type: 'github', url: 'https://github.com/CookingMeister/openai-vue-app' }]
  },
  {
    id: 'music-festival-hub',
    title: 'Music Festival Wear',
    description: 'MERN stack e-commerce application with a product catalogue and cart.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
    image: '/img/festival.png',
    alt: 'E-commerce landing page with logo and best-sellers carousel',
    links: [
      { type: 'demo', url: 'https://music-festival-hub.onrender.com/' },
      { type: 'github', url: 'https://github.com/CookingMeister/music-festival-hub' }
    ]
  },
  {
    id: 'simplyfit',
    title: 'SimplyFit App',
    description: 'MVC fitness tracker with a REST API for creating and updating workouts.',
    tags: ['Node', 'Express', 'MVC', 'REST'],
    image: '/img/dashboard.png',
    alt: 'Exercise dashboard with sections to add, update, and delete workouts',
    // No demo: Heroku retired its free dynos.
    links: [{ type: 'github', url: 'https://github.com/CookingMeister/fitness-tracker-mvc' }]
  },
  {
    id: 'tech-blog',
    title: 'Tech Blog',
    description: '90s-themed MVC blog with authentication, posts, and threaded comments.',
    tags: ['Sequelize', 'MySQL', 'Express', 'Handlebars'],
    image: '/img/blog.png',
    alt: 'Tech blog with user login and signup, post, and comment functionality',
    // No demo: Heroku retired its free dynos.
    links: [{ type: 'github', url: 'https://github.com/CookingMeister/tech-blog-sequelize' }]
  },
  {
    id: 'christmas-movie-generator',
    title: 'Christmas Movie Generator',
    description: 'Interactive movie picker built on a third-party film API.',
    tags: ['JavaScript', 'REST API', 'CSS'],
    image: '/img/XmasMockup.png',
    alt: 'Christmas movie generator with user input to generate a random movie',
    links: [
      { type: 'demo', url: 'https://samgreenwood84.github.io/christmas-movie-generator/' },
      { type: 'github', url: 'https://github.com/CookingMeister/christmas-movie-generator' }
    ]
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Five-day forecast with city search and persisted recent lookups.',
    tags: ['JavaScript', 'REST API', 'localStorage'],
    image: '/img/weather.png',
    alt: 'Weather dashboard with a search bar for current weather and a five-day forecast',
    links: [
      { type: 'demo', url: 'https://cookingmeister.github.io/weather-dashboard/' },
      { type: 'github', url: 'https://github.com/CookingMeister/weather-dashboard' }
    ]
  },
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Express note-taking app persisting records to a JSON store.',
    tags: ['Node', 'Express', 'JSON'],
    image: '/img/Note.png',
    alt: 'Note taker with add, edit and delete note functionality',
    links: [
      { type: 'demo', url: 'https://note-taker-express-2rft.onrender.com/' },
      { type: 'github', url: 'https://github.com/CookingMeister/note-taker-express' }
    ]
  }
]

export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      'JavaScript (ES6+)',
      'PHP',
      'C',
      'C++',
      'PL/B + Visual PL/B',
      'Java',
      'HTML + CSS',
      'SQL',
      'YAML'
    ]
  },
  {
    id: 'frameworks',
    title: 'Libraries & Frameworks',
    skills: [
      'Vue 3 + Vue Router',
      'React + React Router',
      'Node',
      'Express',
      'Spring Boot',
      'Apollo Server',
      'Bootstrap',
      'Tailwind'
    ]
  },
  {
    id: 'modernization',
    title: 'Legacy Modernization',
    skills: [
      'Legacy site rewrites',
      'Refactoring long-lived code',
      'Client-specification builds',
      'Responsive retrofits',
      'Cross-browser support'
    ]
  },
  {
    id: 'hosting',
    title: 'Hosting & Deployment',
    skills: ['Azure', 'IIS 10', 'Netlify', 'Render', 'Heroku', 'AWS EC2']
  },
  {
    id: 'databases',
    title: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'GraphQL', 'phpMyAdmin']
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    skills: [
      'Git + GitHub/GitLab',
      'Vite',
      'Webpack',
      'Vitest + Jest',
      'Postman + Insomnia',
      'WAMP/XAMPP'
    ]
  },
  {
    id: 'infrastructure',
    title: 'Virtualization & Homelab',
    skills: [
      'Proxmox VE + clusters',
      'TrueNAS SCALE CE',
      'Kubernetes',
      'Talos Linux',
      'Sidero Omni',
      'Flux CD (GitOps)',
      'Docker + Podman + Compose',
      'Portainer'
    ]
  },
  {
    id: 'networking',
    title: 'Networking',
    skills: [
      'OPNsense firewall & routing',
      'Managed switches',
      'DNS + DHCP servers',
      'Pi-hole + AdGuard'
    ]
  },
  {
    id: 'systems',
    title: 'Operating Systems & Shell',
    skills: ['Linux', 'Bash + Zsh', 'Windows + WSL', 'PowerShell', 'macOS']
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    skills: ['Ollama', 'OpenWebUI', 'Claude (Code)', 'ChatGPT', 'Qwen', 'Gemma', 'Pi Agent']
  }
]

/** Version-neutral path: replace the file in `public/` and the link still works. */
export const resumeFile = '/resume.pdf'
