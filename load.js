// netlify/functions/load.js
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const { searchParams } = new URL(req.url);
  const season = searchParams.get('season') || '2024';
  const manager = searchParams.get('manager');
  if (!manager) return new Response('manager required', { status: 400 });

  const store = getStore({ name: 'keepers', consistency: 'strong' });
  const key = `${season}/${encodeURIComponent(manager)}`;
  const json = await store.get(key, { type: 'json' });
  return new Response(JSON.stringify(json || null), { headers: { 'content-type': 'application/json' } });
};
