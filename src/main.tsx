import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Usuarios from './lab4/Usuarios.tsx'
import Empleados from './lab4/Empleados.tsx'
import CRUDAI from './lab4/CRUDAI.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Usuarios />
    <Empleados />
    <CRUDAI />

  </StrictMode>
)
