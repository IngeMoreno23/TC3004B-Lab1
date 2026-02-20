// import React from 'react'
import { bancos } from '../assets/bancos.ts'

function ImportArchivo() {
    return (
        <div>
            <h3>Lista de Bancos</h3>
            <ul>
                {bancos.map((item) => (
                    <li key={item.id}>
                        {item.id} — {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ImportArchivo