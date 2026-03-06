const express = require('express');
const cors = require('cors');
const countryRoutes = require('./routes/countryRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/countries', countryRoutes);
app.use('/api/users', userRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('API funcionando correctamente - Países y Usuarios con MySQL');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});