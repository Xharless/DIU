import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css'; // Estilos comunes para las páginas

function ProfessorPage() {
    const navigate = useNavigate();

    return (
        <div className="page-container">
            <h2>Página de Profesor</h2>
            <p>INFO</p>
            <button className="back-button" onClick={() => navigate('/')}>
                Volver a Selección de Rol
            </button>
        </div>
    );
}

export default ProfessorPage;