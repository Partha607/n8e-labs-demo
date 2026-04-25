import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';

// Uses Astro's import.meta.env when available, otherwise fallbacks to localhost
const directusUrl = import.meta?.env?.PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

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
      { name: "Partha", role: "Co-Founder & Director", bio: "Visionary architect behind the digital infrastructure connecting local systems to global grids.", staticImage: "/partha.png" },
      { name: "Julius", role: "Co-Founder & Director", bio: "Visionary leader behind the strategy, business analytics, and operations of N8E Labs from Guwahati.", staticImage: "/julius.png" }
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
