# **SYSTEM DIRECTIVE: N8E Labs Project Development**

**Target Agent:** Google AntiGravity  
**Project Role:** Full-Stack Developer & DevOps Architect  
**Supervisor:** Partha

## **1\. MISSION BRIEFING**

You are tasked with building the complete digital infrastructure for **N8E Labs**, a futuristic technology R\&D firm based in Guwahati, North East India. The brand aesthetic is "Dark Mode," "Cyberpunk," and "Tron-inspired."  
The architecture is strictly decoupled:

* **Backend:** Self-hosted Directus CMS with PostgreSQL (via Docker).  
* **Frontend:** Astro \+ Tailwind CSS (hosted on Vercel).

## **2\. REPOSITORY & RESOURCE REFERENCES**

### **Directus & MCP Integration**

To interact with, configure, and understand the headless backend, utilize the following official repositories:

* **Directus Core:** [https://github.com/directus/directus](https://github.com/directus/directus)  
* **Directus MCP (Model Context Protocol):** [https://github.com/directus/mcp](https://github.com/directus/mcp)  
* **Directus Docs:** [https://directus.io/docs/](https://directus.io/docs/)   
* **Directus API Docs:** [https://directus.io/docs/api](https://directus.io/docs/api)   
* **Directus OpenAPI Docs:** [https://github.com/directus/openapi](https://github.com/directus/openapi) 

### **Aesthetic Assets (Cyberpunk/Tron Theme)**

Use the following curated, royalty-free assets as image placeholders during the build to maintain the requested visual vibe:

* **Neon Grid/Code Background:** https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80\&w=2070  
* **Abstract Cyberpunk UI:** https://images.unsplash.com/photo-1614729939124-03290b04c9ce?q=80\&w=2070  
* **Dark Tech Network/Nodes:** https://images.unsplash.com/photo-1518770660439-4636190af475?q=80\&w=2070  
* **Neon City/Guwahati Vibe:** https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80\&w=2070

## **3\. DEVELOPMENT PHASES & INSTRUCTIONS**

### **PHASE 1: Backend Infrastructure (Directus \+ Docker)**

**Goal:** Establish the private vault on the local physical server.

1. **Docker Scaffold:** Create a robust docker-compose.yml that includes postgres:latest and directus/directus:latest.  
2. **Environment Variables:** Generate an .env template for database credentials, Directus admin email, password, and secret keys.  
3. **Schema Configuration (via API/MCP):** Define the data models required for the frontend.  
   * Global\_Settings (Singleton): Fields for logo, contact\_email, seo\_title, seo\_description.  
   * Services (Collection): Fields for title (String), icon (String/FontAwesome class), description (Text), order (Integer).  
   * Team (Collection): Fields for name (String), role (String), image (File), bio (Text).  
   * Posts (Collection): Fields for title (String), slug (String), featured\_image (File), content (Markdown/WYSWYG), date\_published (Date).

### **PHASE 2: Frontend Foundation (Astro \+ Tailwind)**

**Goal:** Initialize the global edge repository with the precise visual identity.

1. **Initialize Astro:** Run npm create astro@latest (select the "empty" or "basics" template).  
2. **Install Dependencies:** npm install tailwindcss @astrojs/tailwind gsap  
3. **Configure Tailwind (tailwind.config.mjs):**  
   * Set primary background: \#050505 and \#121212.  
   * Set accent colors: Cyber Cyan (\#00E5FF) and Electric Blue (\#007BFF).  
   * Configure Fonts: Import Google Fonts Orbitron (Headings) and Space Grotesk (Body).  
4. **Global CSS (global.css):**  
   * Create a CSS class for a moving background grid (linear-gradients simulating a 3D Tron grid).  
   * Create CSS classes for neon glows (e.g., .neon-text, .neon-box-shadow).  
   * Implement a custom CSS cursor (a small glowing cyan dot with a trailing effect).

### **PHASE 3: Page & Component Assembly**

**Goal:** Build the UI structures according to the Sitemap.

1. **Loading Screen:** Build a global component that triggers on initial load—a spinning cyan circle (using the provided logo geometry) lasting 1.5 seconds before fading out via GSAP.  
2. **Layout Wrapper:** Create Layout.astro containing the \<nav\> (glassmorphism), the custom cursor script, and the footer.  
3. **Home Page (index.astro):**  
   * Hero Section: Big bold "THE NEXT GENERATION OF TECH IS HERE", CTA buttons, and the interactive 8-state Node map.  
   * Core Pillars: Three glassmorphism cards using Tailwind's backdrop-blur-md and bg-white/5 with cyan borders.  
4. **About (about.astro):** Origin story text and futuristic team profile cards.  
5. **Services (services.astro):** Interactive accordions detailing MSME transformation, AI, and software dev.  
6. **Data Grid / Blog (blog/index.astro & blog/\[slug\].astro):** Masonry grid layout for articles.  
7. **Contact (contact.astro):** Minimalist form with cyan input borders focusing on focus states.

### **PHASE 4: Data Integration (Astro \-\> Directus)**

**Goal:** Connect the frontend to the backend API.

1. **API Client:** Create a lib/directus.js utility file to handle fetching data. Use the official @directus/sdk if necessary, or native fetch() calls.  
2. **Dynamic Routing:** Update the Astro pages to getStaticPaths() or use SSR (Server-Side Rendering mode in Astro config) to fetch Posts, Services, and Team from the Directus API endpoint.  
3. **Asset Handling:** Ensure image URLs fetched from Directus are correctly formatted (e.g., \[DIRECTUS\_URL\]/assets/\[IMAGE\_ID\]).

### **PHASE 5: Polish & Performance**

**Goal:** Ensure the site feels alive and loads instantly.

1. **GSAP Animations:** Implement scroll-triggered animations. Elements should slide up and fade in, or "glitch" into view as they enter the viewport.  
2. **Lighthouse Optimization:** Ensure images use Astro's \<Image /\> component for automatic WebP conversion and lazy loading.  
3. **Accessibility:** Ensure sufficient contrast ratios and proper ARIA labels, despite the dark mode theme.

## **4\. STRICT GUARDRAILS FOR ANTIGRAVITY**

* **NO MONOLITHS:** Do not attempt to merge the backend and frontend into one application. Astro and Directus must remain entirely separate.  
* **PERFORMANCE FIRST:** Astro must ship zero JavaScript by default. Only use client-side JS (like GSAP or the custom cursor) where strictly necessary for visual effects.  
* **AESTHETIC COMPLIANCE:** Never use rounded, bubbly, or soft UI elements. All corners should be sharp or slightly chamfered. Colors must strictly adhere to the cyan/black/blue Tron palette.

### **EXECUTING THIS PLAN**

Begin execution. Provide the docker-compose.yml for Phase 1 first, followed by the Astro setup scripts and tailwind.config.mjs for Phase 2\. Pause for Partha's review between major phases.