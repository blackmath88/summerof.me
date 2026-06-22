import type { ThemeId } from '../lib/themes'

export function Nav({ theme, today, setTheme }: { theme: ThemeId; today: string; setTheme: (theme: ThemeId) => void }) {
  return <nav className="nav"><div className="brand"><span className="brand-dot"></span> Name Your Summer</div><div className="nav-right"><div className="theme-switcher">{(['a','c','d'] as const).map((id) => <button key={id} className={`pill ${theme === id ? 'active' : ''}`} data-pill={id} onClick={() => setTheme(id)} title={themeTitle(id)} aria-label={themeTitle(id)} type="button" />)}</div><div className="nav-date">{today}</div></div></nav>
}

function themeTitle(theme: ThemeId) {
  return { a: 'Mediterranean Noon', c: 'Tropical Pop', d: 'Lake & Pine' }[theme]
}
