import { createDirectus, rest, authentication, createCollection, createField, updateCollection } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055').with(rest()).with(authentication());

async function setup() {
  console.log("Authenticating with Directus...");
  await directus.login('admin@n8elabs.com', 'admin@n8elabs.com');

  console.log("Setting up collections...");

  try {
    // 1. Global_Settings (Singleton)
    await directus.request(createCollection({
      collection: 'Global_Settings',
      meta: { singleton: true, icon: 'settings', note: 'Global website settings.' },
      schema: { name: 'Global_Settings' },
      fields: [
        { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } }
      ]
    }));
    await directus.request(createField('Global_Settings', { field: 'seo_title', type: 'string' }));
    await directus.request(createField('Global_Settings', { field: 'seo_description', type: 'string' }));
    await directus.request(createField('Global_Settings', { field: 'contact_email', type: 'string' }));
    await directus.request(createField('Global_Settings', { field: 'logo', type: 'uuid', schema: { foreign_key_table: 'directus_files', foreign_key_column: 'id' }, meta: { interface: 'file-image' } }));
    console.log("Global Settings created.");
  } catch (e) {
    if (e.errors?.[0]?.extensions?.code !== 'RECORD_NOT_UNIQUE') console.error(e);
  }

  try {
    // 2. Services
    await directus.request(createCollection({
      collection: 'Services',
      meta: { icon: 'build', note: 'Our Solutions.' },
      schema: { name: 'Services' },
      fields: [
        { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } }
      ]
    }));
    await directus.request(createField('Services', { field: 'title', type: 'string' }));
    await directus.request(createField('Services', { field: 'icon', type: 'string' }));
    await directus.request(createField('Services', { field: 'description', type: 'text', meta: { interface: 'input-multiline' } }));
    await directus.request(createField('Services', { field: 'sort', type: 'integer' }));
    console.log("Services created.");
  } catch (e) {
    if (e.errors?.[0]?.extensions?.code !== 'RECORD_NOT_UNIQUE') console.error(e);
  }

  try {
    // 3. Team
    await directus.request(createCollection({
      collection: 'Team',
      meta: { icon: 'group', note: 'The Core Team.' },
      schema: { name: 'Team' },
      fields: [
        { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } }
      ]
    }));
    await directus.request(createField('Team', { field: 'name', type: 'string' }));
    await directus.request(createField('Team', { field: 'role', type: 'string' }));
    await directus.request(createField('Team', { field: 'bio', type: 'text', meta: { interface: 'input-multiline' } }));
    await directus.request(createField('Team', { field: 'image', type: 'uuid', schema: { foreign_key_table: 'directus_files', foreign_key_column: 'id' }, meta: { interface: 'file-image' } }));
    console.log("Team created.");
  } catch (e) {
    if (e.errors?.[0]?.extensions?.code !== 'RECORD_NOT_UNIQUE') console.error(e);
  }

  try {
    // 4. Posts
    await directus.request(createCollection({
      collection: 'Posts',
      meta: { icon: 'article', note: 'Data Grid Transmissions.' },
      schema: { name: 'Posts' },
      fields: [
        { field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true } }
      ]
    }));
    await directus.request(createField('Posts', { field: 'title', type: 'string' }));
    await directus.request(createField('Posts', { field: 'slug', type: 'string', meta: { interface: 'system-display-template', options: { template: '{{title}}' } } }));
    await directus.request(createField('Posts', { field: 'date_published', type: 'date', meta: { interface: 'datetime' } }));
    await directus.request(createField('Posts', { field: 'content', type: 'text', meta: { interface: 'input-rich-text-md' } }));
    await directus.request(createField('Posts', { field: 'featured_image', type: 'uuid', schema: { foreign_key_table: 'directus_files', foreign_key_column: 'id' }, meta: { interface: 'file-image' } }));
    console.log("Posts created.");
  } catch (e) {
    if (e.errors?.[0]?.extensions?.code !== 'RECORD_NOT_UNIQUE') console.error(e);
  }

  console.log("Schema creation scripts compiled and executed. Setup finished.");
}

setup().catch(console.error);
