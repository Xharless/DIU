import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import AdminPage from './pages/AdminPage';
import ProfesorPage from './pages/ProfesorPage';
import AyudantePage from './pages/AyudantePage';
import './App.css'; // Estilos globales de la aplicación

function App() {
  return (
    <div className="App">
      {/* BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento */}
      <BrowserRouter>
        <header className="App-header">
          <h1>Sistema de Reserva de Salas USM</h1>
        </header>
        <main className="App-main-content">
          {/* Routes define las rutas de la aplicación */}
          <Routes>
            {/* Ruta para la selección de roles (página de inicio) */}
            <Route path="/" element={<RoleSelection />} />
            {/* Rutas para cada página de rol */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/professor" element={<ProfesorPage />} />
            <Route path="/assistant" element={<AyudantePage />} />
            {/* Puedes añadir una ruta para un error 404 si lo deseas */}
            {/* <Route path="*" element={<div>Página no encontrada</div>} /> */}
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;