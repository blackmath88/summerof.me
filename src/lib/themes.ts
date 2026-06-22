export const THEMES = {
  a: { name: 'Mediterranean Noon', sub: 'Cobalt, lemon, geranium.' },
  c: { name: 'Tropical Pop', sub: 'Hot pink, turquoise, sun.' },
  d: { name: 'Lake & Pine', sub: 'Pine, lake teal, terracotta.' },
} as const

export type ThemeId = keyof typeof THEMES

export function nextTheme(theme: ThemeId): ThemeId {
  const themes: ThemeId[] = ['a', 'c', 'd']
  return themes[(themes.indexOf(theme) + 1) % themes.length]
}
