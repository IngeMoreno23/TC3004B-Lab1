import React, { useState, useEffect } from 'react';
import { createUser, updateUser, getUser } from '../services/api.js';

const UserForm = ({ userId, onSubmitSuccess, onCancel }: { userId?: string | null; onSubmitSuccess: () => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: '',
        confirmPassword: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (userId) {
            loadUser();
        }
    }, [userId]);

    const loadUser = async () => {
        try {
            const user = await getUser(userId!);
            setFormData({
                email: user.email || '',
                nombre: user.nombre || '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError('Error al cargar el usuario');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true });
    };

    const validateForm = (): boolean => {
        const newErrors: string[] = [];

        if (!formData.nombre.trim()) {
            newErrors.push('El nombre es obligatorio');
        }
        if (!formData.email.trim()) {
            newErrors.push('El email es obligatorio');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.push('Email inválido');
        }

        if (!userId) {
            if (!formData.password) {
                newErrors.push('La contraseña es obligatoria');
            } else if (formData.password.length < 6) {
                newErrors.push('La contraseña debe tener al menos 6 caracteres');
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.push('Las contraseñas no coinciden');
            }
        } else {
            if (formData.password && formData.password.length < 6) {
                newErrors.push('La contraseña debe tener al menos 6 caracteres');
            }
            if (formData.password && formData.password !== formData.confirmPassword) {
                newErrors.push('Las contraseñas no coinciden');
            }
        }

        if (newErrors.length > 0) {
            setError(newErrors.join(', '));
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
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

            if (userId) {
                await updateUser(userId, dataToSend);
            } else {
                await createUser(dataToSend);
            }

            setFormData({ email: '', nombre: '', password: '', confirmPassword: '' });
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Error al guardar el usuario');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h3>{userId ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h3>

            {error && <div className="error">{error}</div>}

            <div className="form-group">
                <label htmlFor="nombre">Nombre Completo *:</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    onBlur={() => handleBlur('nombre')}
                    disabled={submitting}
                    required
                    placeholder="Juan Pérez"
                />
                {touched.nombre && !formData.nombre.trim() && <span className="field-error">Este campo es requerido</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email *:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    disabled={submitting}
                    required
                    placeholder="usuario@ejemplo.com"
                />
                {touched.email && !formData.email.trim() && <span className="field-error">Este campo es requerido</span>}
                {touched.email && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && <span className="field-error">Email inválido</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña {userId ? '(dejar en blanco para no cambiar)' : '*'}:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    disabled={submitting}
                    required={!userId}
                    placeholder="••••••••"
                />
                {touched.password && formData.password && formData.password.length < 6 && <span className="field-error">Mínimo 6 caracteres</span>}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña {userId ? '(dejar en blanco para no cambiar)' : '*'}:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    disabled={submitting}
                    required={!userId}
                    placeholder="••••••••"
                />
                {touched.confirmPassword && formData.password !== formData.confirmPassword && <span className="field-error">Las contraseñas no coinciden</span>}
            </div>

            <div className="form-actions">
                <button type="submit" disabled={submitting} className="submit-btn">
                    {submitting ? 'Guardando...' : userId ? 'Actualizar Usuario' : 'Crear Usuario'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={submitting} className="cancel-btn">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default UserForm;
