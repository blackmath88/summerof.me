import { useEffect, useMemo, useReducer, useState } from 'react'
import { Landing } from './components/Landing'
import { Manifesto } from './components/Manifesto'
import { Nav } from './components/Nav'
import { Steps } from './components/Steps'
import { Toast } from './components/Toast'
import { SPAR_PROMPTS } from './data/sparPrompts'
import { nextTheme, type ThemeId } from './lib/themes'
import { flowReducer, initialState, type FlowField } from './state'
import './App.css'

type Screen = 'landing' | 'flow' | 'manifesto'
type StepNum = 1 | 2 | 3 | 4 | 5 | 6

function App() {
  const [theme, setTheme] = useState<ThemeId>('c')
  const [screen, setScreen] = useState<Screen>('landing')
  const [state, dispatch] = useReducer(flowReducer, initialState)
  const [toast, setToast] = useState('')
  const today = useMemo(() => new Date().toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' }), [])

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'd') {
        event.preventDefault()
        loadDemo()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  })

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 4000)
    return () => window.clearTimeout(timer)
  }, [toast])

  function goToStep(step: number) {
    dispatch({ type: 'step', step })
    setScreen('flow')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function setField(field: FlowField, value: string) {
    dispatch({ type: 'field', field, value })
  }

  function generateManifesto() {
    setScreen('manifesto')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    dispatch({ type: 'restart' })
    setScreen('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function loadDemo() {
    const date = new Date()
    date.setDate(date.getDate() + 22)
    dispatch({ type: 'demo', anchorDate: date.toISOString().split('T')[0] })
    setScreen('manifesto')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function copySpar(step: StepNum) {
    const prompt = SPAR_PROMPTS[step]
    void navigator.clipboard.writeText(prompt).then(() => {
      setToast('✓ Sparring prompt copied. Paste into Claude, ChatGPT, or any chat.')
    }).catch(() => {
      setToast('Copy failed. Try again or select manually.')
    })
  }

  return <main>
    <Nav theme={theme} today={today} setTheme={(next) => setTheme(next)} />
    {screen === 'landing' ? <Landing theme={theme} setTheme={setTheme} begin={() => goToStep(1)} goToStep={goToStep} loadDemo={loadDemo} /> : null}
    {screen === 'flow' ? <Steps state={state} setField={setField} goToStep={goToStep} copySpar={copySpar} generateManifesto={generateManifesto} /> : null}
    {screen === 'manifesto' ? <Manifesto state={state} theme={theme} restart={restart} cycleTheme={() => setTheme((current) => nextTheme(current))} /> : null}
    <Toast message={toast} />
  </main>
}

export default App
