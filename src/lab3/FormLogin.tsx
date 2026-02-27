import { useState, useEffect, useRef } from "react";

function FormLogin() {
    const [matricula, setMatricula] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState<number | null>(null);
    const [university, setUniversity] = useState("");
    const [career, setCareer] = useState("");

    const matriculaRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const focusMatricula = () => {
        matriculaRef.current?.focus();
    };

    useEffect(() => {
        focusMatricula();
    }, []);

    useEffect(() => {
        if (matriculaRef.current) {
            matriculaRef.current.value = matricula;
        }
        if (nameRef.current) {
            nameRef.current.value = name;
        }
        if (lastNameRef.current) {
            lastNameRef.current.value = lastName;
        }
    }, [matricula, name, lastName]);

    return (
        <div>
            <h2>Formulario de Login</h2>
            <form>
                <div>
                    <label className="form-label">Matrícula</label>
                    <input
                        ref={matriculaRef}
                        type="text"
                        className="form-control"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label">Nombre</label>
                    <input
                        ref={nameRef}
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label">Apellido</label>
                    <input
                        ref={lastNameRef}
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label">Edad</label>
                    <input
                        type="number"
                        className="form-control"
                        value={age || ""}
                        onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : null)}
                    />
                </div>

                <div>
                    <label className="form-label">Universidad</label>
                    <input
                        type="text"
                        className="form-control"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label">Carrera</label>
                    <input
                        type="text"
                        className="form-control"
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                    />
                </div>

                <button type="button" className="btn btn-success me-2" onClick={focusMatricula}>Enviar</button>
            </form>
        </div>
    )
}

export default FormLogin