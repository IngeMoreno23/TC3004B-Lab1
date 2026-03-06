import { useState } from 'react'
import MyUserList from './components/myUserList';
import '../App.css';

function App2() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Administrador de Usuarios</h1>
            </header>
            <main>
                <MyUserList />
            </main>
            <footer>
                <p>CRUD de Usuarios © 2026</p>
            </footer>
        </div>
    )
}
export default App2
