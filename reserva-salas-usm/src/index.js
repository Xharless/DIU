import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css'; // Importa los estilos globales de la aplicación

// Obtiene el elemento raíz donde se montará la aplicación
const container = document.getElementById('root');
const root = createRoot(container);

// Renderiza el componente principal de la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);