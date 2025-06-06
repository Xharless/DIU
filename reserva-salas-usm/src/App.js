import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import AdminPage from './pages/AdminPage';
import ProfesorPage from './pages/ProfesorPage';
import AyudantePage from './pages/AyudantePage';
import SemestralRoomsPage from './pages/SemestralRoomsPage';
import TestRoomsPage from './pages/TestRoomsPage';
import './App.css'; 



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <div className='logo-container'>
            <a href='/'>
              <img src="/logo2USM.png" alt="Logo USM" className="logo-usm" />
            </a>
          </div>
          
          <h1 className='app-title'>Sistema de Reserva de Salas USM</h1>
        </header>
        <main className="App-main-content">
          <Routes>
            {/*selección de roles (página de inicio) */}
            <Route path="/" element={<RoleSelection />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/professor" element={<ProfesorPage />} />
            <Route path="/assistant" element={<AyudantePage />} />
            <Route path="/professor/semestral-rooms" element={<SemestralRoomsPage />} />
            <Route path="/professor/test-rooms" element={<TestRoomsPage />} />
            <Route path="/professor/test-rooms/availability" element={<SemestralRoomsPage />} />
            <Route path="/assistant/semestral-rooms" element={<SemestralRoomsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;