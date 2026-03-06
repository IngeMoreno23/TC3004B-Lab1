import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import MyUserItem from './myUserItem';
import MyUserForm from './myUserForm';

const MyUserList = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

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
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleFormSubmit = () => {
        fetchUsers();
        setEditingId(null);
    };

    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="country-list">
            <h2>Lista de Usuarios</h2>
            {!editingId && (
                <div className="new-country">
                    <h3>Agregar Nuevo Usuario</h3>
                    <MyUserForm onSubmitSuccess={handleFormSubmit} onCancel={function (): void { }} />
                </div>
            )}
            <div className="countries">
                {users.length === 0 ? (
                    <p>No hay usuarios registrados.</p>
                ) : (
                    users.map(user => (
                        <div key={user.id}>
                            {editingId === user.id ? (
                                <div className="edit-form">
                                    <h3>Editar Usuario</h3>
                                    <MyUserForm
                                        user={user}
                                        onSubmitSuccess={handleFormSubmit}
                                        onCancel={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <MyUserItem
                                    user={user}
                                    onDelete={() => handleDelete(user.id)}
                                    onEdit={() => handleEdit(user.id)}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyUserList;
