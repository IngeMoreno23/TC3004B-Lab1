import React from 'react';

const Variables2: React.FC = () => {
    const nombre: string = 'Juan';
    const edad: number = 25;
    const esEstudiante: boolean = true;

    return (
        <div>
            <h2>Variables 2</h2>
            <p>Nombre: {nombre}</p>
            <p>Edad: {edad}</p>
            <p>Es estudiante: {esEstudiante ? 'Sí' : 'No'}</p>
        </div>
    );
};

export default Variables2;