import React, { useState, useMemo } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table,
    Button,
    Container,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Badge,
    Alert,
} from "reactstrap";

interface Empleado {
    id: number;
    nombre: string;
    edad: number;
    rol: string;
    correo: string;
    departamento: string;
    salario: number;
}

const datosIniciales: Empleado[] = [
    {
        id: 1,
        nombre: "Jorge Carranza",
        edad: 20,
        rol: "Analista",
        correo: "jorge.carranza@tec.mx",
        departamento: "IT",
        salario: 25000,
    },
    {
        id: 2,
        nombre: "Ramon Velez",
        edad: 35,
        rol: "Desarrollador",
        correo: "ramon.velez@tec.mx",
        departamento: "Desarrollo",
        salario: 35000,
    },
    {
        id: 3,
        nombre: "Hugo Sanchez",
        edad: 50,
        rol: "Gerente",
        correo: "hugo.sanchez@tec.mx",
        departamento: "Dirección",
        salario: 50000,
    },
    {
        id: 4,
        nombre: "Rafael Marquez",
        edad: 45,
        rol: "Director",
        correo: "rafael.marquez@tec.mx",
        departamento: "Dirección",
        salario: 60000,
    },
    {
        id: 5,
        nombre: "Carlos Alcaraz",
        edad: 25,
        rol: "Analista",
        correo: "carlos.alcaraz@tec.mx",
        departamento: "IT",
        salario: 28000,
    },
];

const DEPARTAMENTOS = ["IT", "Desarrollo", "Dirección", "RRHH", "Marketing"];
const ROLES = ["Analista", "Desarrollador", "Gerente", "Director", "Asistente"];

const COLORES_DEPARTAMENTO: Record<string, string> = {
    IT: "primary",
    Desarrollo: "success",
    Dirección: "warning",
    RRHH: "info",
    Marketing: "danger",
};

export default function CRUDAI() {
    const [empleados, setEmpleados] = useState<Empleado[]>(datosIniciales);
    const [modalActualizar, setModalActualizar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [ordenar, setOrdenar] = useState<"nombre" | "salario" | "edad">("nombre");
    const [filtroDepart, setFiltroDepart] = useState<string>("");
    const [mensaje, setMensaje] = useState<{
        tipo: "success" | "danger" | "warning";
        texto: string;
    } | null>(null);
    const [erroresForm, setErroresForm] = useState<Record<string, string>>({});

    const [form, setForm] = useState<Empleado>({
        id: 0,
        nombre: "",
        edad: 0,
        rol: "",
        correo: "",
        departamento: "",
        salario: 0,
    });

    const mostrarMensaje = (
        tipo: "success" | "danger" | "warning",
        texto: string
    ) => {
        setMensaje({ tipo, texto });
        setTimeout(() => setMensaje(null), 3000);
    };

    // Filtrado y ordenamiento
    const empleadosFiltrados = useMemo(() => {
        let resultado = empleados;

        // Filtro de búsqueda
        if (busqueda) {
            resultado = resultado.filter(
                (emp) =>
                    emp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                    emp.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
                    emp.rol.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // Filtro de departamento
        if (filtroDepart) {
            resultado = resultado.filter((emp) => emp.departamento === filtroDepart);
        }

        // Ordenamiento
        return resultado.sort((a, b) => {
            if (ordenar === "nombre") {
                return a.nombre.localeCompare(b.nombre);
            } else if (ordenar === "salario") {
                return b.salario - a.salario;
            } else if (ordenar === "edad") {
                return a.edad - b.edad;
            }
            return 0;
        });
    }, [empleados, busqueda, ordenar, filtroDepart]);

    const validarFormulario = (): boolean => {
        const errores: Record<string, string> = {};

        if (!form.nombre.trim())
            errores.nombre = "El nombre es requerido";
        if (form.edad < 18 || form.edad > 70)
            errores.edad = "La edad debe estar entre 18 y 70";
        if (!form.correo.includes("@"))
            errores.correo = "Email inválido";
        if (!form.rol) errores.rol = "Selecciona un rol";
        if (!form.departamento)
            errores.departamento = "Selecciona un departamento";
        if (form.salario < 10000)
            errores.salario = "El salario mínimo es 10,000";

        setErroresForm(errores);
        return Object.keys(errores).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "edad" || name === "salario" ? parseInt(value) : value,
        });
        // Limpiar error del campo
        if (erroresForm[name]) {
            setErroresForm({ ...erroresForm, [name]: "" });
        }
    };

    const abrirModalActualizar = (dato: Empleado) => {
        setForm(dato);
        setErroresForm({});
        setModalActualizar(true);
    };

    const cerrarModalActualizar = () => {
        setModalActualizar(false);
        setErroresForm({});
    };

    const abrirModalInsertar = () => {
        setForm({
            id: Math.max(...empleados.map((e) => e.id), 0) + 1,
            nombre: "",
            edad: 18,
            rol: "",
            correo: "",
            departamento: "",
            salario: 20000,
        });
        setErroresForm({});
        setModalInsertar(true);
    };

    const cerrarModalInsertar = () => {
        setModalInsertar(false);
        setErroresForm({});
    };

    const insertar = () => {
        if (!validarFormulario()) return;

        setEmpleados([...empleados, form]);
        mostrarMensaje("success", `✓ Empleado ${form.nombre} agregado correctamente`);
        cerrarModalInsertar();
    };

    const editar = () => {
        if (!validarFormulario()) return;

        const nuevaLista = empleados.map((registro) =>
            registro.id === form.id ? form : registro
        );

        setEmpleados(nuevaLista);
        mostrarMensaje("success", `✓ Empleado ${form.nombre} actualizado`);
        cerrarModalActualizar();
    };

    const eliminar = (dato: Empleado) => {
        if (
            window.confirm(
                `¿Eliminar a ${dato.nombre}? Esta acción no se puede deshacer.`
            )
        ) {
            setEmpleados(empleados.filter((registro) => registro.id !== dato.id));
            mostrarMensaje("danger", `✗ Empleado ${dato.nombre} eliminado`);
        }
    };

    const salarioPromedioFiltrado = useMemo(() => {
        if (empleadosFiltrados.length === 0) return 0;
        const suma = empleadosFiltrados.reduce((acc, emp) => acc + emp.salario, 0);
        return suma / empleadosFiltrados.length;
    }, [empleadosFiltrados]);

    return (
        <>
            <Container className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="text-primary fw-bold">
                        🤖 CRUD AI - Gestión de Empleados
                    </h1>
                    <Button color="success" size="lg" onClick={abrirModalInsertar}>
                        ➕ Agregar Empleado
                    </Button>
                </div>

                {mensaje && (
                    <Alert color={mensaje.tipo} className="mb-3">
                        {mensaje.texto}
                    </Alert>
                )}

                {/* Controles de Filtrado */}
                <div className="card p-4 mb-4 bg-light">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <Input
                                type="text"
                                placeholder="🔍 Buscar por nombre, email o rol..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="form-control-lg"
                            />
                        </div>
                        <div className="col-md-3">
                            <Input
                                type="select"
                                value={filtroDepart}
                                onChange={(e) => setFiltroDepart(e.target.value)}
                                className="form-control-lg"
                            >
                                <option value="">📊 Todos los Departamentos</option>
                                {DEPARTAMENTOS.map((dept) => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        <div className="col-md-3">
                            <Input
                                type="select"
                                value={ordenar}
                                onChange={(e) =>
                                    setOrdenar(
                                        e.target.value as "nombre" | "salario" | "edad"
                                    )
                                }
                                className="form-control-lg"
                            >
                                <option value="nombre">↑ Ordenar por Nombre</option>
                                <option value="salario">📈 Ordenar por Salario</option>
                                <option value="edad">🎂 Ordenar por Edad</option>
                            </Input>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                            <Button
                                color="warning"
                                outline
                                block
                                onClick={() => {
                                    setBusqueda("");
                                    setFiltroDepart("");
                                    setOrdenar("nombre");
                                }}
                            >
                                🔄 Limpiar
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card p-3 text-center bg-primary text-white">
                            <h5>Total Empleados</h5>
                            <h2 className="fw-bold">{empleadosFiltrados.length}</h2>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 text-center bg-success text-white">
                            <h5>Salario Promedio</h5>
                            <h2 className="fw-bold">
                                ${salarioPromedioFiltrado.toFixed(0)}
                            </h2>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 text-center bg-info text-white">
                            <h5>Edad Promedio</h5>
                            <h2 className="fw-bold">
                                {(
                                    empleadosFiltrados.reduce((acc, emp) => acc + emp.edad, 0) /
                                    (empleadosFiltrados.length || 1)
                                ).toFixed(0)} años
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                {empleadosFiltrados.length > 0 ? (
                    <div className="table-responsive">
                        <Table bordered hover>
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Rol</th>
                                    <th>Departamento</th>
                                    <th>Correo</th>
                                    <th>Salario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empleadosFiltrados.map((dato) => (
                                    <tr key={dato.id}>
                                        <td>
                                            <Badge color="dark">#{dato.id}</Badge>
                                        </td>
                                        <td className="fw-bold">{dato.nombre}</td>
                                        <td>{dato.edad} años</td>
                                        <td>{dato.rol}</td>
                                        <td>
                                            <Badge
                                                color={
                                                    COLORES_DEPARTAMENTO[dato.departamento] ||
                                                    "secondary"
                                                }
                                            >
                                                {dato.departamento}
                                            </Badge>
                                        </td>
                                        <td>{dato.correo}</td>
                                        <td className="fw-bold text-success">
                                            ${dato.salario.toLocaleString()}
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                className="me-2"
                                                onClick={() => abrirModalActualizar(dato)}
                                            >
                                                ✏️ Editar
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                onClick={() => eliminar(dato)}
                                            >
                                                🗑️ Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <Alert color="warning" className="text-center">
                        <h5>😕 No se encontraron empleados</h5>
                        <p>Intenta ajustar los filtros de búsqueda</p>
                    </Alert>
                )}
            </Container>

            {/* MODAL EDITAR */}
            <Modal isOpen={modalActualizar} toggle={cerrarModalActualizar} size="lg">
                <ModalHeader toggle={cerrarModalActualizar}>
                    <h4>✏️ Editar Empleado: {form.nombre}</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">ID:</label>
                                <Input
                                    type="text"
                                    readOnly
                                    value={form.id}
                                    className="form-control-lg"
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Nombre: *</label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    onChange={handleChange}
                                    value={form.nombre}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.nombre}
                                />
                                {erroresForm.nombre && (
                                    <small className="text-danger">{erroresForm.nombre}</small>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Edad: *</label>
                                <Input
                                    type="number"
                                    name="edad"
                                    onChange={handleChange}
                                    value={form.edad}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.edad}
                                />
                                {erroresForm.edad && (
                                    <small className="text-danger">{erroresForm.edad}</small>
                                )}
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Rol: *</label>
                                <Input
                                    type="select"
                                    name="rol"
                                    onChange={handleChange}
                                    value={form.rol}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.rol}
                                >
                                    <option value="">Selecciona un rol</option>
                                    {ROLES.map((rol) => (
                                        <option key={rol} value={rol}>
                                            {rol}
                                        </option>
                                    ))}
                                </Input>
                                {erroresForm.rol && (
                                    <small className="text-danger">{erroresForm.rol}</small>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Departamento: *</label>
                                <Input
                                    type="select"
                                    name="departamento"
                                    onChange={handleChange}
                                    value={form.departamento}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.departamento}
                                >
                                    <option value="">Selecciona departamento</option>
                                    {DEPARTAMENTOS.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </Input>
                                {erroresForm.departamento && (
                                    <small className="text-danger">
                                        {erroresForm.departamento}
                                    </small>
                                )}
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Salario: *</label>
                                <Input
                                    type="number"
                                    name="salario"
                                    onChange={handleChange}
                                    value={form.salario}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.salario}
                                />
                                {erroresForm.salario && (
                                    <small className="text-danger">{erroresForm.salario}</small>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                    <FormGroup>
                        <label className="fw-bold">Correo: *</label>
                        <Input
                            type="email"
                            name="correo"
                            onChange={handleChange}
                            value={form.correo}
                            className="form-control-lg"
                            invalid={!!erroresForm.correo}
                        />
                        {erroresForm.correo && (
                            <small className="text-danger">{erroresForm.correo}</small>
                        )}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="lg" onClick={editar}>
                        💾 Guardar Cambios
                    </Button>
                    <Button color="danger" onClick={cerrarModalActualizar}>
                        ❌ Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* MODAL INSERTAR */}
            <Modal isOpen={modalInsertar} toggle={cerrarModalInsertar} size="lg">
                <ModalHeader toggle={cerrarModalInsertar}>
                    <h4>➕ Agregar Nuevo Empleado</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Nombre: *</label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    onChange={handleChange}
                                    value={form.nombre}
                                    placeholder="Ej: Juan Pérez"
                                    className="form-control-lg"
                                    invalid={!!erroresForm.nombre}
                                />
                                {erroresForm.nombre && (
                                    <small className="text-danger">{erroresForm.nombre}</small>
                                )}
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Edad: *</label>
                                <Input
                                    type="number"
                                    name="edad"
                                    onChange={handleChange}
                                    value={form.edad}
                                    min="18"
                                    max="70"
                                    className="form-control-lg"
                                    invalid={!!erroresForm.edad}
                                />
                                {erroresForm.edad && (
                                    <small className="text-danger">{erroresForm.edad}</small>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Rol: *</label>
                                <Input
                                    type="select"
                                    name="rol"
                                    onChange={handleChange}
                                    value={form.rol}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.rol}
                                >
                                    <option value="">Selecciona un rol</option>
                                    {ROLES.map((rol) => (
                                        <option key={rol} value={rol}>
                                            {rol}
                                        </option>
                                    ))}
                                </Input>
                                {erroresForm.rol && (
                                    <small className="text-danger">{erroresForm.rol}</small>
                                )}
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Departamento: *</label>
                                <Input
                                    type="select"
                                    name="departamento"
                                    onChange={handleChange}
                                    value={form.departamento}
                                    className="form-control-lg"
                                    invalid={!!erroresForm.departamento}
                                >
                                    <option value="">Selecciona departamento</option>
                                    {DEPARTAMENTOS.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </Input>
                                {erroresForm.departamento && (
                                    <small className="text-danger">
                                        {erroresForm.departamento}
                                    </small>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Salario: *</label>
                                <Input
                                    type="number"
                                    name="salario"
                                    onChange={handleChange}
                                    value={form.salario}
                                    min="10000"
                                    className="form-control-lg"
                                    invalid={!!erroresForm.salario}
                                />
                                {erroresForm.salario && (
                                    <small className="text-danger">{erroresForm.salario}</small>
                                )}
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <label className="fw-bold">Correo: *</label>
                                <Input
                                    type="email"
                                    name="correo"
                                    onChange={handleChange}
                                    value={form.correo}
                                    placeholder="usuario@example.com"
                                    className="form-control-lg"
                                    invalid={!!erroresForm.correo}
                                />
                                {erroresForm.correo && (
                                    <small className="text-danger">{erroresForm.correo}</small>
                                )}
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" size="lg" onClick={insertar}>
                        ✅ Crear Empleado
                    </Button>
                    <Button color="danger" onClick={cerrarModalInsertar}>
                        ❌ Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
