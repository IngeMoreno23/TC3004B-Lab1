import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import UserItem from './UserItem';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setError('Error al eliminar el usuario');
            }
        }
    };

    const handleEdit = (id: string) => {
        setEditingId(id);
        setShowForm(true);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setShowForm(false);
    };

    const handleFormSubmit = () => {
        fetchUsers();
        setEditingId(null);
        setShowForm(false);
    };

    const handleAddNew = () => {
        setEditingId(null);
        setShowForm(true);
    };

    const filteredUsers = users.filter(user =>
        user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="loading">Cargando usuarios...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="user-list-container">
            <div className="user-controls">
                <button onClick={handleAddNew} className="add-btn">
                    ➕ Nuevo Usuario
                </button>
                <input
                    type="text"
                    placeholder="🔍 Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {showForm && (
                <div className="form-container">
                    <UserForm
                        userId={editingId}
                        onSubmitSuccess={handleFormSubmit}
                        onCancel={handleCancelEdit}
                    />
                </div>
            )}

            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <UserItem
                            key={user.id}
                            user={user}
                            onDelete={() => handleDelete(user.id)}
                            onEdit={() => handleEdit(user.id)}
                        />
                    ))
                ) : (
                    <div className="no-users">
                        <p>No hay usuarios registrados</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserList;
