// import React from 'react'

function Variables() {

    const saludo = "Hola Mundo Variables"

    const mostrarSaludo = () => "Saludo desde función"

  return (
    <div>
        {saludo}
        <br />
        {mostrarSaludo()}
    </div>

  )
}

export default Variables