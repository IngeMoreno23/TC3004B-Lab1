import React from 'react';
import { bancos, type Banco } from '../assets/bancos';

const ImportArchivo2: React.FC = () => {
    return (
        <div>
            <h3>Lista de Bancos 2 (Type Safe)</h3>
            <ul>
                {bancos.map((banco: Banco) => (
                    <li key={banco.id}>
                        {banco.id} — {banco.name} ({banco.country})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImportArchivo2;