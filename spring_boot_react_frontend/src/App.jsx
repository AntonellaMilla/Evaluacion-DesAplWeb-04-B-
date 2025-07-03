// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmpleadoList from "./components/EmpleadoList";
import FormEmpleado from "./components/FormEmpleado";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<EmpleadoList />} />
          <Route path="/add" element={<FormEmpleado />} />
          <Route path="/edit/:id" element={<FormEmpleado />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
