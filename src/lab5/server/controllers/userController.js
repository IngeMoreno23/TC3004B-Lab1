const pool = require('../db');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, email, nombre, created_at FROM users ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, email, nombre, created_at FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
    const { email, password, nombre } = req.body;

    // Validación básica
    if (!email || !password || !nombre) {
        return res.status(400).json({ error: 'Email, contraseña y nombre son obligatorios' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // Verificar si el email ya existe
        const [existingUser] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO users (email, password, nombre) VALUES (?, ?, ?)',
            [email, hashedPassword, nombre]
        );

        res.status(201).json({ 
            id: result.insertId, 
            email, 
            nombre,
            created_at: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
    const { email, password, nombre } = req.body;
    const userId = req.params.id;

    // Validación básica
    if (!email || !nombre) {
        return res.status(400).json({ error: 'Email y nombre son obligatorios' });
    }

    if (password && password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
        // Verificar si el usuario existe
        const [checkRows] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (checkRows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar si el email ya existe (en otro usuario)
        const [existingEmail] = await pool.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
        if (existingEmail.length > 0) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Actualizar usuario
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query(
                'UPDATE users SET email = ?, password = ?, nombre = ? WHERE id = ?',
                [email, hashedPassword, nombre, userId]
            );
        } else {
            await pool.query(
                'UPDATE users SET email = ?, nombre = ? WHERE id = ?',
                [email, nombre, userId]
            );
        }

        res.json({ id: userId, email, nombre });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        // Verificar si el usuario existe
        const [checkRows] = await pool.query('SELECT id FROM users WHERE id = ?', [userId]);
        if (checkRows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Eliminar el usuario
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
