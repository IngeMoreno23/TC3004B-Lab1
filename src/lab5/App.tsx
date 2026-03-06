import { useState } from 'react'
import CountryList from './components/CountryList';
import '../App.css';

function App() {
    const [count, setCount] = useState(0)
    return (
        <div className="App">
            <header className="App-header">
                <h1>Administrador de Países</h1>
            </header>
            <main>
                <CountryList />
            </main>
            <footer>
                <p>CRUD de Países © 2026</p>
            </footer>
        </div>
    )
}
export default App