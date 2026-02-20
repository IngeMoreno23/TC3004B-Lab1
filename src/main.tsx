import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FetchAPI from './lab2/FetchAPI'
import FetchAPI2 from './lab2/FetchAPI2'
// import App from './App.tsx'
// import HolaMundo from './lab1/HolaMundo.tsx'
// import Variables from './lab1/Variables.tsx'
// import ImportArchivo from './lab1/ImportArchivo.tsx'
// import HolaMundo2 from './lab1/HolaMundo2.tsx'
// import Variables2 from './lab1/Variables2.tsx'
// import ImportArchivo2 from './lab1/ImportArchivo2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HolaMundo />
    <br />
    <Variables />
    <br />
    <ImportArchivo />
    <hr />
    <HolaMundo2 />
    <br />
    <Variables2 />
    <br />
    <ImportArchivo2 /> */}
    <FetchAPI pokemonName="ditto" />
    <FetchAPI2 pokemonName='ditto'/>

  </StrictMode>
)
