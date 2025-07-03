// src/components/EmpleadoList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmpleadoList() {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/empleados");
    setEmpleados(res.data);
  };

  const eliminarEmpleado = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/empleados/${id}`);
    cargarEmpleados();
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📋 Lista de Empleados</h4>
          <button
            onClick={() => navigate("/add")}
            className="btn btn-light btn-sm"
          >
            ➕ Nuevo Empleado
          </button>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {empleados.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      No hay empleados registrados.
                    </td>
                  </tr>
                ) : (
                  empleados.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.nombre}</td>
                      <td>{emp.apellido}</td>
                      <td>{emp.email}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/edit/${emp.id}`)}
                          className="btn btn-outline-warning btn-sm me-2"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => eliminarEmpleado(emp.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          🗑️ Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpleadoList;
