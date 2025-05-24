import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css'; 
import '../components/RoleSelection.css';

function AssistantPage() {
    const navigate = useNavigate();
    
    const handleSemestralRoomsClick = () => {
        navigate('/assistant/semestral-rooms'); 
    };

    

    return (
        <div className="page-container">
            <h2>Tipo de Solicitud</h2>
            <p>Seleccione el tipo de sala que desea reservar:</p>
            <div className="professor-buttons-group"> 
                <button
                    className="role-button"
                    onClick={handleSemestralRoomsClick}
                >
                    Salas Semestrales
                </button>
            </div>
            <button className="back-button" onClick={() => navigate('/')}>
                Volver a Selección de Rol
            </button>
        </div>
    );
}

export default AssistantPage;