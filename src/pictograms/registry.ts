export const PICTOGRAMS = {
  swim: { name: 'Swim', svg: `
    <circle class="shape-c" cx="68" cy="9" r="4"/>
    <circle class="ornament-dot" cx="62" cy="4" r="0.9"/>
    <circle class="ornament-dot" cx="74" cy="4" r="0.9"/>
    <circle class="ornament-dot" cx="76" cy="13" r="0.9"/>
    <rect class="shape-a" x="22" y="19" width="22" height="6" rx="3"/>
    <circle class="shape-a" cx="46" cy="22" r="4"/>
    <rect class="shape-a" x="50" y="20" width="7" height="3" rx="1.5"/>
    <path class="stroke-b" d="M 4 32 Q 10 27 16 32 T 28 32 T 40 32 T 52 32 T 64 32 T 76 32" stroke-width="2.6"/>
  ` },
  hike: { name: 'Hike', svg: `
    <circle class="shape-c" cx="68" cy="9" r="4"/>
    <polygon class="shape-b" points="48,12 64,32 32,32"/>
    <polygon class="shape-a" points="22,6 42,32 2,32"/>
    <path class="ornament" d="M 16 13 L 22 6 L 27 13"/>
    <circle class="ornament-dot" cx="50" cy="36" r="1"/>
    <circle class="ornament-dot" cx="58" cy="37" r="1"/>
    <circle class="ornament-dot" cx="66" cy="36" r="1"/>
  ` },
  cookout: { name: 'Cookout', svg: `
    <path class="shape-c" d="M 30 16 C 28 11 30 7 34 4 C 36 9 40 12 38 18 C 36 21 32 21 30 16 Z"/>
    <path class="shape-b" d="M 22 18 C 20 15 22 11 26 9 C 28 14 30 16 26 20 C 24 21 22 20 22 18 Z"/>
    <rect class="shape-a" x="8" y="22" width="46" height="7" rx="2"/>
    <line class="stroke-a" x1="14" y1="29" x2="14" y2="36" stroke-width="2.6"/>
    <line class="stroke-a" x1="48" y1="29" x2="48" y2="36" stroke-width="2.6"/>
    <circle class="ornament-dot" cx="62" cy="14" r="1.4"/>
    <circle class="ornament-dot" cx="68" cy="10" r="1.4"/>
    <circle class="ornament-dot" cx="72" cy="16" r="1.4"/>
  ` },
  ride: { name: 'Ride', svg: `
    <circle class="stroke-a" cx="18" cy="28" r="8" stroke-width="3"/>
    <circle class="stroke-a" cx="58" cy="28" r="8" stroke-width="3"/>
    <polygon class="shape-b" points="20,28 38,12 56,28"/>
    <circle class="shape-c" cx="38" cy="9" r="3"/>
    <line class="ornament" x1="4" y1="22" x2="9" y2="22"/>
    <line class="ornament" x1="2" y1="28" x2="7" y2="28"/>
  ` },
  read: { name: 'Read', svg: `
    <path class="shape-a" d="M 8 10 L 38 11 L 38 32 L 8 31 Z"/>
    <path class="shape-b" d="M 42 11 L 72 10 L 72 31 L 42 32 Z"/>
    <line class="ornament" x1="40" y1="10" x2="40" y2="32" stroke-width="1.5"/>
    <line class="ornament" x1="14" y1="17" x2="32" y2="17"/>
    <line class="ornament" x1="14" y1="21" x2="28" y2="21"/>
    <line class="ornament" x1="14" y1="25" x2="32" y2="25"/>
    <line class="ornament" x1="46" y1="17" x2="64" y2="17"/>
    <line class="ornament" x1="46" y1="21" x2="68" y2="21"/>
    <line class="ornament" x1="46" y1="25" x2="62" y2="25"/>
    <circle class="shape-c" cx="40" cy="5" r="2.2"/>
  ` },
  listen: { name: 'Listen', svg: `
    <path class="stroke-a" d="M 14 22 C 14 6 60 6 60 22" stroke-width="3.5"/>
    <rect class="shape-b" x="8" y="20" width="11" height="13" rx="3"/>
    <rect class="shape-b" x="55" y="20" width="11" height="13" rx="3"/>
    <path class="ornament" d="M 70 16 Q 73 22 70 28"/>
    <path class="ornament" d="M 74 12 Q 79 22 74 32"/>
    <circle class="shape-c" cx="37" cy="9" r="2.2"/>
  ` },
  travel: { name: 'Travel', svg: `
    <polygon class="shape-a" points="4,30 62,8 62,22"/>
    <polygon class="shape-b" points="4,30 36,20 62,22"/>
    <line class="ornament" x1="2" y1="36" x2="8" y2="36"/>
    <line class="ornament" x1="12" y1="36" x2="18" y2="36"/>
    <line class="ornament" x1="22" y1="36" x2="28" y2="36"/>
    <circle class="shape-c" cx="72" cy="9" r="3.5"/>
  ` },
  gather: { name: 'Gather', svg: `
    <path class="shape-a" d="M 8 12 L 18 12 L 16 26 L 10 26 Z"/>
    <line class="stroke-a" x1="13" y1="26" x2="13" y2="33" stroke-width="2"/>
    <line class="stroke-a" x1="9" y1="34" x2="17" y2="34" stroke-width="2"/>
    <path class="shape-b" d="M 30 12 L 40 12 L 38 26 L 32 26 Z"/>
    <line class="stroke-b" x1="35" y1="26" x2="35" y2="33" stroke-width="2"/>
    <line class="stroke-b" x1="31" y1="34" x2="39" y2="34" stroke-width="2"/>
    <path class="shape-c" d="M 52 12 L 62 12 L 60 26 L 54 26 Z"/>
    <line class="stroke-c" x1="57" y1="26" x2="57" y2="33" stroke-width="2"/>
    <line class="stroke-c" x1="53" y1="34" x2="61" y2="34" stroke-width="2"/>
    <line class="ornament" x1="10" y1="15" x2="16" y2="15"/>
    <line class="ornament" x1="32" y1="15" x2="38" y2="15"/>
    <line class="ornament" x1="54" y1="15" x2="60" y2="15"/>
    <line class="ornament" x1="22" y1="6" x2="26" y2="9"/>
    <line class="ornament" x1="44" y1="6" x2="48" y2="9"/>
    <line class="ornament" x1="66" y1="6" x2="70" y2="9"/>
  ` },
  make: { name: 'Make', svg: `
    <rect class="shape-b" x="6" y="18" width="34" height="4" rx="2"/>
    <rect class="shape-c" x="40" y="14" width="5" height="12"/>
    <polygon class="shape-a" points="45,10 62,6 62,34 45,30"/>
    <circle class="shape-c" cx="70" cy="32" r="3.5"/>
    <circle class="ornament-dot" cx="76" cy="34" r="1.2"/>
    <circle class="ornament-dot" cx="66" cy="37" r="1.2"/>
    <circle class="ornament-dot" cx="74" cy="28" r="1"/>
  ` },
  watch: { name: 'Watch', svg: `
    <rect class="shape-a" x="8" y="8" width="64" height="22" rx="3"/>
    <rect class="shape-b" x="12" y="12" width="56" height="14" rx="1.5"/>
    <polygon class="shape-c" points="36,15 36,23 46,19"/>
    <line class="ornament-line" x1="30" y1="34" x2="50" y2="34" stroke-width="2.4"/>
    <line class="ornament-line" x1="36" y1="30" x2="36" y2="34"/>
    <line class="ornament-line" x1="44" y1="30" x2="44" y2="34"/>
  ` },
  rest: { name: 'Rest', svg: `
    <line class="stroke-a" x1="8" y1="6" x2="8" y2="34" stroke-width="3"/>
    <line class="stroke-a" x1="72" y1="6" x2="72" y2="34" stroke-width="3"/>
    <path class="stroke-b" d="M 8 14 Q 40 36 72 14" stroke-width="3"/>
    <ellipse class="shape-c" cx="40" cy="24" rx="12" ry="3"/>
    <circle class="ornament-dot" cx="22" cy="10" r="1"/>
    <circle class="ornament-dot" cx="26" cy="7" r="1"/>
    <circle class="ornament-dot" cx="30" cy="10" r="1"/>
    <circle class="shape-c" cx="56" cy="8" r="2.5"/>
  ` },
  sport: { name: 'Sport', svg: `
    <circle class="shape-a" cx="32" cy="9" r="4"/>
    <path class="shape-a" d="M 28 13 L 36 13 L 38 26 L 30 26 Z"/>
    <line class="stroke-b" x1="33" y1="16" x2="42" y2="22" stroke-width="3"/>
    <line class="stroke-b" x1="31" y1="18" x2="22" y2="14" stroke-width="3"/>
    <line class="stroke-c" x1="35" y1="26" x2="42" y2="36" stroke-width="3"/>
    <line class="stroke-c" x1="30" y1="26" x2="22" y2="34" stroke-width="3"/>
    <line class="ornament" x1="6" y1="14" x2="14" y2="14"/>
    <line class="ornament" x1="8" y1="22" x2="18" y2="22"/>
    <line class="ornament" x1="6" y1="30" x2="14" y2="30"/>
  ` },
} as const satisfies Record<string, { name: string; svg: string }>

export type PictogramId = keyof typeof PICTOGRAMS

export const PICTOGRAM_ORDER: PictogramId[] = [
  'swim',
  'hike',
  'ride',
  'cookout',
  'gather',
  'travel',
  'read',
  'listen',
  'make',
  'watch',
  'sport',
  'rest',
]

