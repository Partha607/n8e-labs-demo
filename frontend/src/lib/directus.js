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
      { name: "Julius", role: "Co-Founder & CEO", bio: "Visionary leader behind the strategy, business analytics, and operations of N8E Labs from Guwahati.", staticImage: withBase('/julius.png') },
      { name: "Partha", role: "Co-Founder & CTO", bio: "Visionary architect behind the digital infrastructure connecting local systems to global grids.", staticImage: withBase('/partha.png') },
      { name: "Tridib", role: "External Technology Advisor", bio: "An expert Database Administrator and strategic technology evaluator with a profound ability to discern high-impact technical trends. His expertise lies in architecting robust data ecosystems and ensuring seamless system integrity across complex environments.", staticImage: withBase('/Tridib.jpeg') },
      { name: "Benerjit", role: "External Scientific Advisor", bio: "A researcher working at the intersection of biodiversity conservation, ecological modelling, and molecular biology. My work focuses on applying data driven approaches to solve real environmental challenges. I am also passionate about continous learning and clear scientific communication.", staticImage: withBase('/Benerjit.jpeg') },
      { name: "Shubham", role: "External Scientific Advisor", bio: "An astrophysicist by trade and an elite problem solver, applying rigorous scientific inquiry to tackle multifaceted technical challenges.", staticImage: withBase('/shubham.jpg') },
      { name: "Siddhant", role: "Hardware and Software Engineer", bio: "A versatile engineer with a dual-threat capability to identify, diagnose, and resolve complex issues across both hardware architecture and software systems.", staticImage: withBase('/Siddhant.png') },
      { name: "Prashant", role: "AI and Automation Engineer", bio: "Specialist in Machine Learning and Deep Learning, architecting intelligent automation solutions that drive high-level technical innovation.", staticImage: withBase('/prashant.jpeg') },
      { name: "Arnav", role: "Business and Sales Representative", bio: "A high-impact sales strategist with a relentless drive for market growth and a proven ability to close complex commercial opportunities.", staticImage: withBase('/Arnav.jpeg') },
      { name: "Ankush", role: "Head of Operations (Manipur)", bio: "A resilient problem solver and adaptive leader, specialized in managing complex logistical landscapes and localized operational challenges.", staticImage: withBase('/Ankush.jpeg') },
      { name: "Amaan", role: "Head of Operations (Guwahati)", bio: "An agile, street-smart operational lead and expert orator, leveraging rapid intuition to deliver effective, moment-fit solutions.", staticImage: withBase('/amaan.png') }
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
