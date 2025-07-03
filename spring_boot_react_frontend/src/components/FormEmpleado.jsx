// src/components/FormEmpleado.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./FormEmpleado.css";


function FormEmpleado() {
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/v1/empleados/${id}`)
        .then((res) => setEmpleado(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:8080/api/v1/empleados/${id}`, empleado);
    } else {
      await axios.post("http://localhost:8080/api/v1/empleados", empleado);
    }
    navigate("/empleados");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Empleado" : "Nuevo Empleado"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            name="nombre"
            value={empleado.nombre}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Apellido:</label>
          <input
            name="apellido"
            value={empleado.apellido}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={empleado.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        <button
          onClick={() => navigate("/empleados")}
          type="button"
          className="btn btn-secondary ms-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default FormEmpleado;
