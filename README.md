# Orcutt Above

Classroom points, avatars, shop, math arena, arcade and the Realm, for grades 6–12.

- `index.html` — the app
- `live.js` — Google sign-in for teachers, class code + PIN for students, and Firestore sync
- `realm-*.js` — the Realm game
- `firestore.rules` — database security rules (paste into Firebase console > Firestore Database > Rules, then Publish)

Hosted on Netlify, which redeploys automatically when this repository changes.

## Adding a Realm hero (painted art)

Each hero needs two sheets from the AI image tool, on a plain grey background:
1. **Standing sheet**: stages 1, 2 and 3 side by side.
2. **Casting sheet**: 3 × 3 grid. Either one row per stage showing reach → charge → release,
   or one row per stage with one pose per skill (attack, shield/support, special).
   Ask for the magic to be **separate from the body** (a projectile in mid-air, roots on the ground,
   a magic circle off to the side) so it can be cut out cleanly.

In code:
- `art/<id>-1..3.webp` standing art and `art/<id>-<stage>c<frame>.webp` casting frames, listed in `RL_ART` in `realm-images.js`
  (`pose:'skill'` when each casting picture belongs to one skill).
- Spell effects are cut from the casting sheet into `art/fx-<id>-*.webp` and listed on each stage's spell
  as `paint:{shot, burst, sigil, aura, aoe:'fan'|'rain'}` (see the PAINTED SPELLS block in `realm-images.js`).
- Name, rarity, role, skills and signature colour go in `RL_ROSTER` in `realm-roster.js`.
