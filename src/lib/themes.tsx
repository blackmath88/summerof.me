export const THEMES = {
  a: {
    name: 'Mediterranean Noon',
    cardTitle: <>Mediterranean <em>noon.</em></>,
    sub: 'Cobalt, lemon, geranium. Greek-island confidence.',
  },
  c: {
    name: 'Tropical Pop',
    cardTitle: <>Tropical <em>pop.</em></>,
    sub: 'Hot pink, turquoise, sun. Memphis-Miami joy.',
  },
  d: {
    name: 'Lake & Pine',
    cardTitle: <>Lake & <em>pine.</em></>,
    sub: 'Pine, lake teal, terracotta. Alpine grown-up.',
  },
} as const

export type ThemeId = keyof typeof THEMES

export function nextTheme(theme: ThemeId): ThemeId {
  const themes: ThemeId[] = ['a', 'c', 'd']
  return themes[(themes.indexOf(theme) + 1) % themes.length]
}

