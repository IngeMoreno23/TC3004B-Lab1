import React from 'react';

const MyUserItem = ({ user, onDelete, onEdit }: { user: any; onDelete: () => void; onEdit: () => void }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="country-item">
            <div className="country-info">
                <h3>{user.nombre}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Registrado:</strong> {formatDate(user.created_at)}</p>
            </div>
            <div className="country-actions">
                <button onClick={onEdit} className="edit-btn">Editar</button>
                <button onClick={onDelete} className="delete-btn">Eliminar</button>
            </div>
        </div>
    );
};

export default MyUserItem;
