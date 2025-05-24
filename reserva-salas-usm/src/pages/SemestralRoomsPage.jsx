
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css'; 
import '../components/RoleSelection.css'; 
import './SemestralRoomsPage.css'; 


const k_room_ids = [
    'K201', 'K202', 'K203', 'K204', 'K205', 'K206', 'K207', 
    'K300', 'K301', 'K302', 'K303', 'K304', 'K305', 'K306', 'K307', 
    'K402' 
];


// Datos de ejemplo para las salas
const roomData = {
    A: Array.from({ length: 12 }, (_, i) => ({ id: `A${String(i + 1).padStart(3, '0')}`, status: i % 3 === 0 ? 'available' : 'occupied' })),
    B: Array.from({ length: 12 }, (_, i) => ({ id: `B${String(i + 1).padStart(3, '0')}`, status: i % 2 === 0 ? 'available' : 'occupied' })),
    E: Array.from({ length: 5 }, (_, i) => ({ id: `E${String(i + 200).padStart(3, '0')}`, status: i % 4 === 0 ? 'available' : 'occupied' })),
    K: k_room_ids.map(id => ({
        id: id,
        status: (id === 'K301' || id === 'K402') ? 'occupied' : 'available' 
    })),
    F: Array.from({ length: 10 }, (_, i) => ({ id: `F${String(i + 401).padStart(3, '0')}`, status: 'available' })), 
};

function SemestralRoomsPage() {
    const navigate = useNavigate();
    const [selectedBlock, setSelectedBlock] = useState(null); 
    const [selectedRoom, setSelectedRoom] = useState(null); 

    const blocks = ['A', 'B', 'E', 'K', 'F'];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        console.log(`Sala ${room.id} clickeada. Estado: ${room.status}`);
        
    };

    const closeRoomDetails = () => {
        setSelectedRoom(null);
    };

    return (
        <div className="page-container">
            <h2>Disponibilidad de Salas Semestrales</h2>

            {/* Bloques de salas */}
            <p>Seleccione un bloque para ver sus salas:</p>
            <div className="block-selection-group">
                {blocks.map(block => (
                    <button
                        key={block}
                        className={`block-button ${selectedBlock === block ? 'active' : ''}`}
                        onClick={() => setSelectedBlock(block)}
                    >
                        Bloque {block}
                    </button>
                ))}
            </div>

            
            {selectedBlock && (
                <div className="rooms-list-container">
                    <h3>Salas del Bloque {selectedBlock}</h3>
                    <div className="rooms-grid">
                        {roomData[selectedBlock].map(room => (
                            <div
                                key={room.id}
                                className={`room-card ${room.status}`}
                                onClick={() => handleRoomClick(room)}
                            >
                                <span className="room-id">{room.id}</span>
                                <span className="room-status-text">
                                    {room.status === 'available' ? 'Disponible' : 'Ocupada'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Formulario de Sala */}
            {selectedRoom && (
                <div className="room-details-overlay">
                    <div className="room-details-content">
                        <h3>Detalles de la Sala {selectedRoom.id}</h3>
                        <p>Estado: <span className={`status-text ${selectedRoom.status}`}>{selectedRoom.status === 'available' ? 'Disponible' : 'Ocupada'}</span></p>
                        {selectedRoom.status === 'available' ? (
                            <div>
                                <p>Esta sala está disponible para reserva.</p>
                                {/* Reserva de las salas (ver con el dani que haremos aqui) */}
                                <button className="reserve-button" onClick={() => alert(`Reservando sala ${selectedRoom.id}`)}>Reservar</button>
                            </div>
                        ) : (
                            <div>
                                <p>Esta sala está actualmente ocupada.</p>
                                <p>Detalles (ejemplo): Profesor X, Curso Y, de 10:00 a 12:00.</p>
                            </div>
                        )}
                        <button className="close-button" onClick={closeRoomDetails}>Cerrar</button>
                    </div>
                </div>
            )}

            <button className="back-button" onClick={() => navigate(-1)}> 
                Volver
            </button>
        </div>
    );
}

export default SemestralRoomsPage;