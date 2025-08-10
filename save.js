// netlify/functions/save.js
import { getStore } from '@netlify/blobs';

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  try {
    const { season = 2024, manager, selections } = await req.json();
    if (!manager || !Array.isArray(selections)) return new Response('Bad payload', { status: 400 });

    const clean = selections.slice(0, 2).map(s => ({
      id: String(s.id || ''),
      player_name: String(s.player_name || ''),
      drafted_round: s.drafted_round == null ? null : Number(s.drafted_round),
      base_keep_round: s.base_keep_round == null ? null : Number(s.base_keep_round),
      assigned_keep_round: s.assigned_keep_round == null ? null : Number(s.assigned_keep_round)
    }));

    const store = getStore({ name: 'keepers', consistency: 'strong' });
    const key = `${season}/${encodeURIComponent(manager)}`;
    await store.setJSON(key, {
      season, manager,
      selections: clean,
      updated_at: new Date().toISOString()
    });
    return new Response('ok');
  } catch (e) {
    return new Response(e.message || String(e), { status: 500 });
  }
};
