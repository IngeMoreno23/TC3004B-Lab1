import React from 'react';

const UserItem = ({ user, onDelete, onEdit }: { user: any; onDelete: () => void; onEdit: () => void }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="user-item">
            <div className="user-info">
                <div className="user-header">
                    <h3>👤 {user.nombre}</h3>
                    <span className="user-id">#{user.id}</span>
                </div>
                <div className="user-details">
                    <p><strong>📧 Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></p>
                    <p><strong>📅 Registrado:</strong> {formatDate(user.created_at)}</p>
                </div>
            </div>
            <div className="user-actions">
                <button onClick={onEdit} className="edit-btn">✏️ Editar</button>
                <button onClick={onDelete} className="delete-btn">🗑️ Eliminar</button>
            </div>
        </div>
    );
};

export default UserItem;
