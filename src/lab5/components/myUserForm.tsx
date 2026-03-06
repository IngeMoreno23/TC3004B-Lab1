import React, { useState, useEffect } from 'react';
import { createUser, updateUser, getUser } from '../services/api.js';

const MyUserForm = ({ user, onSubmitSuccess, onCancel }: { user?: any; onSubmitSuccess: () => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        confirmPassword: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email || '',
                nombre: user.nombre || '',
                password: '',
                confirmPassword: ''
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.nombre.trim()) {
            setError('El nombre es obligatorio');
            return;
        }

        if (!formData.email.trim()) {
            setError('El email es obligatorio');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Email inválido');
            return;
        }

        if (!user) {
            if (!formData.password) {
                setError('La contraseña es obligatoria');
                return;
            }
            if (formData.password.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
        } else {
            if (formData.password && formData.password.length < 6) {
                setError('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            if (formData.password && formData.password !== formData.confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
        }

        setSubmitting(true);
        setError(null);

        try {
            const dataToSend: any = {
                email: formData.email,
                nombre: formData.nombre
            };

            if (formData.password) {
                dataToSend.password = formData.password;
            }

            if (user) {
                await updateUser(user.id, dataToSend);
            } else {
                await createUser(dataToSend);
            }

            setFormData({ email: '', nombre: '', password: '', confirmPassword: '' });
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError('Error al guardar el usuario');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="country-form">
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <label htmlFor="nombre">Nombre*:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email*:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña {user ? '(opcional)' : '*'}:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={submitting}
                    required={!user}
                />
            </div>
            {formData.password && (
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña*:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={submitting}
                        required={!!formData.password}
                    />
                </div>
            )}
            <div className="form-actions">
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : user ? 'Actualizar' : 'Crear'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={submitting}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default MyUserForm;
