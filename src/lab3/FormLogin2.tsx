import { useState, useEffect, useRef } from "react";
import "../styles/FormLogin2.css";

interface FormData {
    matricula: string;
    nombre: string;
    apellidos: string;
    edad: string;
    universidad: string;
    carrera: string;
}

function FormLogin2() {
    const [formData, setFormData] = useState<FormData>({
        matricula: "",
        nombre: "",
        apellidos: "",
        edad: "",
        universidad: "",
        carrera: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const matriculaRef = useRef<HTMLInputElement>(null);

    // useEffect para hacer focus en el primer input al montar
    useEffect(() => {
        matriculaRef.current?.focus();
    }, []);

    // useEffect para monitorear cambios en el formulario
    useEffect(() => {
        console.log("Formulario actualizado:", formData);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleReset = () => {
        setFormData({
            matricula: "",
            nombre: "",
            apellidos: "",
            edad: "",
            universidad: "",
            carrera: "",
        });
        setSubmitted(false);
        matriculaRef.current?.focus();
    };

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h2 className="form-title">Formulario de Registro</h2>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="matricula">Matrícula</label>
                        <input
                            ref={matriculaRef}
                            type="text"
                            id="matricula"
                            name="matricula"
                            value={formData.matricula}
                            onChange={handleChange}
                            placeholder="Ej: 2024001"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            placeholder="Tus apellidos"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edad">Edad</label>
                        <input
                            type="number"
                            id="edad"
                            name="edad"
                            value={formData.edad}
                            onChange={handleChange}
                            placeholder="Ej: 20"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="universidad">Universidad</label>
                        <input
                            type="text"
                            id="universidad"
                            name="universidad"
                            value={formData.universidad}
                            onChange={handleChange}
                            placeholder="Tu universidad"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="carrera">Carrera</label>
                        <input
                            type="text"
                            id="carrera"
                            name="carrera"
                            value={formData.carrera}
                            onChange={handleChange}
                            placeholder="Tu carrera"
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">
                            Enviar
                        </button>
                        <button type="button" onClick={handleReset} className="btn btn-secondary">
                            Limpiar
                        </button>
                    </div>
                </form>

                {submitted && (
                    <div className="results">
                        <h3>Datos Enviados</h3>
                        <p><strong>Matrícula:</strong> {formData.matricula || "No especificado"}</p>
                        <p><strong>Nombre:</strong> {formData.nombre || "No especificado"}</p>
                        <p><strong>Apellidos:</strong> {formData.apellidos || "No especificado"}</p>
                        <p><strong>Edad:</strong> {formData.edad || "No especificado"}</p>
                        <p><strong>Universidad:</strong> {formData.universidad || "No especificado"}</p>
                        <p><strong>Carrera:</strong> {formData.carrera || "No especificado"}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FormLogin2;
