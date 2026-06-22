import type { PictogramId } from './registry'

export function guessPictogramId(text: string): PictogramId {
  const t=(text||'').toLowerCase();
  if(/swim|pool|lake|river|beach|sea|ocean|water|aare|night swim/.test(t)) return 'swim';
  if(/hike|walk|trail|mountain|climb|peak|forest/.test(t)) return 'hike';
  if(/cook|barbecue|bbq|grill|dinner|picnic|eat|food|fire/.test(t)) return 'cookout';
  if(/bike|cycle|ride|bicycle|skateboard|skate|scooter/.test(t)) return 'ride';
  if(/read|book|library|bookshop|novel/.test(t)) return 'read';
  if(/music|playlist|spotify|listen|concert|gig|dj|podcast/.test(t)) return 'listen';
  if(/travel|trip|train|flight|fly|drive to|lisbon|paris|berlin|rome|airport/.test(t)) return 'travel';
  if(/friend|gather|hang|meet|invite|people|text|party|drinks/.test(t)) return 'gather';
  if(/build|make|craft|guitar|piano|chess|paint|draw|write|knit/.test(t)) return 'make';
  if(/movie|film|cinema|show|watch|netflix|series|tv/.test(t)) return 'watch';
  if(/run|gym|tennis|sport|boulder|workout|jog|football/.test(t)) return 'sport';
  if(/rest|sleep|nap|relax|hammock|chill/.test(t)) return 'rest';
  return 'gather';
}
