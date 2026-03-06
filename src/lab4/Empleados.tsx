import React from "react";
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
} from "reactstrap";

const data = [
    { id: 1, nombre: "Jorge Carranza", edad: "20", rol: "Analista", correo: "jorge.carranza@tec.mx" },
    { id: 2, nombre: "Ramon Velez", edad: "35", rol: "Desarrollador", correo: "ramon.velez@tec.mx" },
    { id: 3, nombre: "Hugo Sanchez ", edad: "50", rol: "Gerente", correo: "hugo.sanchez@tec.mx" },
    { id: 4, nombre: "Rafael Marquez", edad: "45", rol: "Director", correo: "rafael.marquez@tec.mx" },
    { id: 5, nombre: "Carlos Alcaraz", edad: "25", rol: "Analista", correo: "carlos.alcaraz@tec.mx" }
];

class Empleados extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            edad: "",
            rol: "",
            correo: "",
        },
    };

    mostrarModalActualizar = (dato: any) => {
        this.setState({
            form: { ...dato },
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
            form: { id: "", nombre: "", edad: "", rol: "", correo: "" },
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    handleChange = (e: any) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    insertar = () => {
        const nuevo = {
            ...this.state.form,
            id: this.state.data.length + 1,
        };

        this.setState({
            data: [...this.state.data, nuevo],
            modalInsertar: false,
        });
    };

    editar = (dato: any) => {
        const nuevaLista = this.state.data.map((registro) =>
            registro.id === dato.id ? dato : registro
        );

        this.setState({
            data: nuevaLista,
            modalActualizar: false,
        });
    };

    eliminar = (dato: any) => {
        const opcion = window.confirm(
            "¿Estás seguro que deseas eliminar el elemento " + dato.id + "?"
        );

        if (opcion) {
            const nuevaLista = this.state.data.filter(
                (registro) => registro.id !== dato.id
            );

            this.setState({ data: nuevaLista });
        }
    };

    render() {
        return (
            <>
                <Container>
                    <br />

                    <Button color="success" onClick={this.mostrarModalInsertar}>
                        Crear
                    </Button>

                    <br />
                    <br />

                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Rol</th>
                                <th>Correo</th>
                                <th>Acción</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.id}</td>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.edad}</td>
                                    <td>{dato.rol}</td>
                                    <td>{dato.correo}</td>
                                    <td>
                                        <Button
                                            color="primary"
                                            onClick={() => this.mostrarModalActualizar(dato)}
                                        >
                                            Editar
                                        </Button>{" "}
                                        <Button
                                            color="danger"
                                            onClick={() => this.eliminar(dato)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>

                {/* MODAL EDITAR */}

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <h3>Editar Registro</h3>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>ID:</label>
                            <input
                                className="form-control"
                                readOnly
                                value={this.state.form.id}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="nombre"
                                onChange={this.handleChange}
                                value={this.state.form.nombre}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Edad:</label>
                            <input
                                className="form-control"
                                name="edad"
                                onChange={this.handleChange}
                                value={this.state.form.edad}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Rol:</label>
                            <input
                                className="form-control"
                                name="rol"
                                onChange={this.handleChange}
                                value={this.state.form.rol}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Correo:</label>
                            <input
                                className="form-control"
                                name="correo"
                                onChange={this.handleChange}
                                value={this.state.form.correo}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.editar(this.state.form)}
                        >
                            Editar
                        </Button>

                        <Button
                            color="danger"
                            onClick={this.cerrarModalActualizar}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

                {/* MODAL INSERTAR */}

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <h3>Insertar Registro</h3>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input
                                className="form-control"
                                name="nombre"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Edad:</label>
                            <input
                                className="form-control"
                                name="edad"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Rol:</label>
                            <input
                                className="form-control"
                                name="rol"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Correo:</label>
                            <input
                                className="form-control"
                                name="correo"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.insertar}>
                            Insertar
                        </Button>

                        <Button color="danger" onClick={this.cerrarModalInsertar}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default Empleados;