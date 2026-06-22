import { useEffect, useMemo, useReducer, useState } from 'react'
import { Landing } from './components/Landing'
import { Manifesto } from './components/Manifesto'
import { Nav } from './components/Nav'
import { PictogramShowcase } from './components/PictogramShowcase'
import { Steps } from './components/Steps'
import { nextTheme, type ThemeId } from './lib/themes'
import { flowReducer, initialState, type FlowField } from './state'
import './App.css'

type Screen = 'landing' | 'flow' | 'manifesto'

function App() {
  const [theme, setTheme] = useState<ThemeId>('c')
  const [screen, setScreen] = useState<Screen>('landing')
  const [state, dispatch] = useReducer(flowReducer, initialState)
  const today = useMemo(
    () => new Date().toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric' }),
    [],
  )

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  function goToStep(step: number) {
    dispatch({ type: 'step', step })
    setScreen('flow')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function setField(field: FlowField, value: string) {
    dispatch({ type: 'field', field, value })
  }

  function generate() {
    setScreen('manifesto')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function restart() {
    dispatch({ type: 'restart' })
    setScreen('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <Nav theme={theme} today={today} setTheme={setTheme} />
      {screen === 'landing' ? <Landing theme={theme} setTheme={setTheme} begin={() => goToStep(1)} /> : null}
      {screen === 'flow' ? <Steps state={state} setField={setField} goToStep={goToStep} generate={generate} /> : null}
      {screen === 'manifesto' ? (
        <Manifesto
          state={state}
          theme={theme}
          restart={restart}
          cycleTheme={() => setTheme((current) => nextTheme(current))}
        />
      ) : null}
      <PictogramShowcase />
    </main>
  )
}

export default App

