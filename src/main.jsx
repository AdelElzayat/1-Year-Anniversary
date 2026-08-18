import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AudioProvider } from './context/AudioContext'
import { GameProvider } from './context/GameContext'
import { SettingsProvider } from './context/SettingsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <AudioProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </AudioProvider>
    </SettingsProvider>
  </React.StrictMode>
)
