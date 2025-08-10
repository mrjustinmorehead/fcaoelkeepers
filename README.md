# FCAOEL Keeper Tool — Netlify Blobs (server save) + Auto-save

This build adds **auto-save** on each change (debounced) to Netlify Blobs.

## Deploy
1) New site on Netlify → deploy this folder (drag & drop or repo).  
2) Netlify installs deps and bundles functions automatically.  
3) Share links like `https://facaoelkeepers.netlify.app/?manager=First%20Last` (locked to the manager).

## Notes
- Auto-save waits ~0.9s after a change before saving. You still have a **Save (Server)** button.
- The status line under the title shows **Saving…**, **Auto-saved ✓**, or an error.
- Server enforces **max 2** keepers per manager.
