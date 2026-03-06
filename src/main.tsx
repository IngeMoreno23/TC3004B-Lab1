import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './lab5/App.tsx'
import App3 from './lab5/App3.tsx'
import App2 from './lab5/App2.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <App />
    <App2 />
    <App3 />

  </StrictMode>
)
