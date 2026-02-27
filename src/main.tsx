import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Focus } from './Components/Focus'
import FormLogin from './lab3/FormLogin'
import FormLogin2 from './lab3/FormLogin2'



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Focus />
    <FormLogin />
    <FormLogin2 />

  </StrictMode>
)
