import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css'; // Estilos específicos para este componente

function RoleSelection() {
    // useNavigate es un hook de React Router para la navegación programática
    const navigate = useNavigate();

    // Función para manejar el clic en los botones de rol
    const handleRoleClick = (role) => {
        // Redirige a la ruta correspondiente al rol seleccionado
        navigate(`/${role}`);
    };

    return (
        <div className="role-selection-container">
            <h2>Por favor, selecciona tu rol:</h2>
            <div className="button-group">
                <button className="role-button" onClick={() => handleRoleClick('admin')}>
                    Administrador
                </button>
                <button className="role-button" onClick={() => handleRoleClick('professor')}>
                    Profesor
                </button>
                <button className="role-button" onClick={() => handleRoleClick('assistant')}>
                    Ayudantes
                </button>
            </div>
        </div>
    );
}

export default RoleSelection;