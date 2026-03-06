import { useState } from 'react'
import UserList from './components/UserList';
import '../App.css';

function App3() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Administrador de Usuarios</h1>
                <p>Gestión de cuentas y perfiles</p>
            </header>
            <main>
                <UserList />
            </main>
            <footer>
                <p>Sistema de Usuarios © 2026</p>
            </footer>
        </div>
    )
}
export default App3
