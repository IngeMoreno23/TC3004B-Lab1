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
    { id: 1, nombre: "Jorge Carranza", empresa: "Tec" },
    { id: 2, nombre: "Ramon Velez", empresa: "Banorte" },
    { id: 3, nombre: "Hugo Sanchez ", empresa: "Real Madrid" },
    { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona" },
    { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca" },
    { id: 6, nombre: "2N.Djokovic", empresa: "Serbia" },
    { id: 7, nombre: "Sergio Perez", empresa: "Cadillac" },
    { id: 8, nombre: "Max Verstapen", empresa: "Oracle Red Bull Racing" },
    { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing" },
];

class Usuarios extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
    },
  };

  mostrarModalActualizar = (dato: any   ) => {
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
      form: { id: "", nombre: "", empresa: "" },
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
                <th>Empresa</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>

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
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                onChange={this.handleChange}
                value={this.state.form.empresa}
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
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
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

export default Usuarios;