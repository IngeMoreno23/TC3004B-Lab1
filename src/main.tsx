import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import HolaMundo from './lab1/HolaMundo.tsx'
import Variables from './lab1/Variables.tsx'
import ImportArchivo from './lab1/ImportArchivo.tsx'
import HolaMundo2 from './lab2/HolaMundo2.tsx'
import Variables2 from './lab2/Variables2.tsx'
import ImportArchivo2 from './lab2/ImportArchivo2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HolaMundo />
    <br />
    <Variables />
    <br />
    <ImportArchivo />
    <hr />
    <HolaMundo2 />
    <br />
    <Variables2 />
    <br />
    <ImportArchivo2 />
  </StrictMode>,
)
