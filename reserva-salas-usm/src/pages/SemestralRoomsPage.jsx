
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css'; // Estilos comunes de la página
import '../components/RoleSelection.css'; // Para los estilos de los botones
import './SemestralRoomsPage.css'; // Estilos específicos para esta página

// Datos de ejemplo para las salas
const roomData = {
    A: Array.from({ length: 10 }, (_, i) => ({ id: `A${String(i + 1).padStart(3, '0')}`, status: i % 3 === 0 ? 'available' : 'occupied' })),
    B: Array.from({ length: 10 }, (_, i) => ({ id: `B${String(i + 1).padStart(3, '0')}`, status: i % 2 === 0 ? 'available' : 'occupied' })),
    E: Array.from({ length: 10 }, (_, i) => ({ id: `E${String(i + 1).padStart(3, '0')}`, status: i % 4 === 0 ? 'available' : 'occupied' })),
    K: Array.from({ length: 10 }, (_, i) => ({ id: `K${String(i + 1).padStart(3, '0')}`, status: i % 5 === 0 ? 'available' : 'occupied' })),
    F: Array.from({ length: 10 }, (_, i) => ({ id: `F${String(i + 1).padStart(3, '0')}`, status: 'available' })), // Todas disponibles en F por ejemplo
};

function SemestralRoomsPage() {
    const navigate = useNavigate();
    const [selectedBlock, setSelectedBlock] = useState(null); // Estado para el bloque seleccionado (A, B, E, K, F)
    const [selectedRoom, setSelectedRoom] = useState(null); // Estado para la sala seleccionada (para mostrar detalles/formulario)

    const blocks = ['A', 'B', 'E', 'K', 'F'];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        console.log(`Sala ${room.id} clickeada. Estado: ${room.status}`);
        // Aquí podrías abrir un modal o renderizar un formulario de reserva/detalles
    };

    const closeRoomDetails = () => {
        setSelectedRoom(null);
    };

    return (
        <div className="page-container">
            <h2>Disponibilidad de Salas Semestrales</h2>

            {/* 1. Selector de Bloques */}
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

            {/* 2. Visualización de Salas (condicional) */}
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

            {/* 3. Detalles/Formulario de Sala (Modal/Overlay) */}
            {selectedRoom && (
                <div className="room-details-overlay">
                    <div className="room-details-content">
                        <h3>Detalles de la Sala {selectedRoom.id}</h3>
                        <p>Estado: <span className={`status-text ${selectedRoom.status}`}>{selectedRoom.status === 'available' ? 'Disponible' : 'Ocupada'}</span></p>
                        {selectedRoom.status === 'available' ? (
                            <div>
                                <p>Esta sala está disponible para reserva.</p>
                                {/* Aquí iría un formulario de reserva más elaborado */}
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

            <button className="back-button" onClick={() => navigate(-1)}> {/* navigate(-1) vuelve a la página anterior */}
                Volver
            </button>
        </div>
    );
}

export default SemestralRoomsPage;