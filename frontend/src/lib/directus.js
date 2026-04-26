import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';

// Uses Astro's import.meta.env when available, otherwise fallbacks to localhost
const directusUrl = import.meta?.env?.PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const withBase = (path = '') => `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`;

export const directus = createDirectus(directusUrl).with(rest());

/** Helper functions with dummy fallbacks in case schema hasn't been populated */

export async function getGlobalSettings() {
  try {
    return await directus.request(readSingleton('Global_Settings'));
  } catch (error) {
    // console.warn("Using fallback for Global_Settings.");
    return {
      seo_title: 'N8E Labs | Modern Tech Hub',
      seo_description: 'Pioneering the technological renaissance in North East India.',
      contact_email: 'hello@n8elabs.com'
    };
  }
}

export async function getTeamMembers() {
  try {
    const team = await directus.request(readItems('Team'));
    if (team.length) return team;
    throw new Error("Empty Team");
  } catch (error) {
    return [
      { name: "Julius", role: "Co-Founder & CEO", bio: "As the strategic engine of N8E Labs, I translate complex business analytics into actionable growth from our base in Guwahati. My focus is on galvanizing the tech landscape of the Northeast by bridging the gap between regional potential and high-level corporate strategy. I lead our operations with a mission to ensure that every project we undertake is as efficient as it is ambitious.", staticImage: withBase('/julius.png') },
      { name: "Partha", role: "Co-Founder & CTO", bio: "I architect the digital ecosystems that anchor our mission. My work focuses on engineering high-performance, resilient infrastructure designed to connect local innovation with global digital grids. By integrating modern, decoupled architectures and AI-driven workflows, I build the scalable technology needed to empower the 8 States of our region, while maintaining a world-class standard of technical integrity.", staticImage: withBase('/partha.png') },
      { name: "Tridib", role: "External Technology Advisor", bio: "I don't just manage data; I advise on the strategic architecture of the data ecosystems driving N8E Labs forward. By scouting high-impact tech trends and vetting system integrity, I help define the scalable foundations that allow the team to push boundaries without limits.", staticImage: withBase('/Tridib.jpeg') },
      { name: "Benerjit", role: "External Scientific Advisor", bio: "I operate at the nexus of biodiversity and molecular biology, deploying data-driven models to solve critical environmental challenges. My mission is to translate complex ecological data into clear, actionable science while constantly evolving through continuous learning.", staticImage: withBase('/Benerjit.jpeg') },
      { name: "Shubham", role: "External Scientific Advisor", bio: "My background in astrophysics allows me to view technical obstacles through a cosmic lens. I apply rigorous scientific inquiry to dismantle multifaceted problems, turning complex variables into elegant, high-impact solutions.", staticImage: withBase('/shubham.jpg') },
      { name: "Siddhant", role: "Hardware and Software Engineer", bio: "I live in the space where silicon meets code. As a full-spectrum engineer, I thrive on diagnosing and dismantling complex failures across the entire stack, ensuring our hardware and software work in perfect, indestructible harmony.", staticImage: withBase('/Siddhant.png') },
      { name: "Prashant", role: "AI and Automation Engineer", bio: "I specialize in the 'intelligence' behind our operations. By architecting custom, scalable Machine Learning and Deep Learning frameworks, I bridge the gap between manual processes and high-level autonomous innovation.", staticImage: withBase('/prashant.jpeg') },
      { name: "Arnav", role: "Business and Sales Representative", bio: "I am the engine of growth at N8E Labs. My focus is on identifying untapped market opportunities and closing the high-impact commercial deals that propel our regional innovations onto the global stage.", staticImage: withBase('/Arnav.jpeg') },
      { name: "Ankush", role: "Head of Operations (Manipur)", bio: "I lead our operations in Manipur, navigating complex logistical landscapes with a resilient, adaptive mindset. I specialize in solving localized challenges on the fly to keep our mission moving forward, regardless of the terrain.", staticImage: withBase('/Ankush.jpeg') },
      { name: "Amaan", role: "Head of Operations (Guwahati)", bio: "I am the pulse of our operations in Guwahati. As a street-smart strategist and orator, I rely on sharp intuition to deliver immediate, 'fit-for-the-moment' solutions in our most fast-moving environments.", staticImage: withBase('/amaan.png') }
    ];
  }
}

export async function getServices() {
  try {
    const services = await directus.request(readItems('Services', { sort: ['sort'] }));
    if (services.length) return services;
    throw new Error("Empty Services");
  } catch (error) {
    return [
      { title: "Digital Transformation for MSMEs", description: "Cloud Migration, Modern ERP, and Digital Inventory Management." },
      { title: "Custom Software Development", description: "Bespoke full-stack applications tailored to organizational needs." },
      { title: "AI & Automation Integrations", description: "ChatGPT/LLM integrations, automated support bots, and data extraction." }
    ];
  }
}

export async function getPosts() {
  try {
    const posts = await directus.request(readItems('Posts', { sort: ['-date_published'] }));
    if (posts.length) return posts;
    throw new Error("Empty Posts");
  } catch (error) {
    return [
      { title: "The N8E Initiative Commences", slug: "sample-transmission-1", date_published: "2026-04-14", content: "Julius posts the very first transmission detailing our vision for Guwahati's technological overhaul." },
      { title: "Scaling Local E-Commerce", slug: "sample-transmission-2", date_published: "2026-04-10", content: "A brief technical look at how moving to regional edge networks reduced latency." },
      { title: "Why We Choose Astro + Directus", slug: "sample-transmission-3", date_published: "2026-04-05", content: "An exploration of the decoupled architecture powering N8E Labs." }
    ];
  }
}

export function getAssetURL(id) {
  if (!id) return null;
  return `${directusUrl}/assets/${id}`;
}
