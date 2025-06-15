import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PageStyles.css';
import '../components/RoleSelection.css';
import './SemestralRoomsPage.css';
import './ScheduleModal.css'; // Asegúrate de que este CSS esté enlazado o añade el CSS a uno existente

const standardTimeSlots = [
    { label: '1-2', start: 1, end: 2},
    { label: '3-4', start: 3, end: 4},
    { label: '5-6', start: 5, end: 6},
    { label: '7-8', start: 7, end: 8},
    { label: '9-10', start: 9, end: 10},
    { label: '11-12', start: 11, end: 12},
    { label: '13-14', start: 13, end: 14}
]

const k_room_ids = [
    'K201', 'K202', 'K203', 'K204', 'K205', 'K206', 'K207',
    'K300', 'K301', 'K302', 'K303', 'K304', 'K305', 'K306', 'K307',
    'K402'
];

// Datos de ejemplo para las salas (mantener como están)
const roomData = {
    A: Array.from({ length: 12 }, (_, i) => ({ 
        id: `A${String(i + 1).padStart(3, '0')}`, 
        capacity: 20 + i * 2,
        maintenanceIssues: i === 1 ? 'Proyector en mantención' : null,
        otherIssues: i === 4 ? 'No tiene calefacción' : null,
        disponibilidadPorDia: {
            'Lunes':
                i === 0 ? [{ start: 1, end: 2 }] : 
                i === 1 ? [{ start: 3, end: 4 }] : 
                i === 2 ? [{ start: 5, end: 6 }] : 
                [{ start: 7, end: 8 }, { start: 9, end: 10 }], 
            'Martes': 
                i === 0 ? [{ start: 9, end: 10 }] :
                i === 1 ? [{ start: 1, end: 2 }] :
                i === 2 ? [{ start: 5, end: 6 }, { start: 9, end: 10 }] : 
                [{ start: 11, end: 12 }], 
            'Miércoles':
                i === 0 ? [{ start: 1, end: 2 }] : 
                i === 1 ? [{ start: 11, end: 12 }] : 
                i === 2 ? [{ start: 3, end: 4 }] : 
                [{ start: 5, end: 6 }, { start: 7, end: 8 }], 
            'Jueves':
                i === 0 ? [{ start: 13, end: 14 }] : 
                i === 1 ? [{ start: 5, end: 6 }] :
                i === 2 ? [{ start: 7, end: 8 }] :
                [{ start: 9, end: 10 }], 
            'Viernes':
                i === 0 ? [{ start: 7, end: 8 }] : 
                i === 1 ? [{ start: 7, end: 8 }] : 
                i === 2 ? [{ start: 1, end: 2 }] : 
                [{ start: 3, end: 4 }, { start: 5, end: 6 }], 
        },
    })),
    B: Array.from({ length: 12 }, (_, i) => ({ 
        id: `B${String(i + 1).padStart(3, '0')}`,  
        capacity: 30 + i * 3,
        maintenanceIssues: i === 0 ? 'Falla de audio' : null,
        otherIssues: null,
        disponibilidadPorDia: {
            'Lunes':
                i === 0 ? [{ start: 7, end: 8 }] : 
                i === 1 ? [{ start: 1, end: 2 }] : 
                i === 2 ? [{ start: 3, end: 4 }] : 
                [{ start: 5, end: 6 }, { start: 9, end: 10 }], 
            'Martes':
                i === 0 ? [{ start: 9, end: 10 }] :
                i === 1 ? [{ start: 11, end: 12 }] :
                i === 2 ? [{ start: 13, end: 14 }] :
                [{ start: 1, end: 2 }],
            'Miércoles':
                i === 0 ? [{ start: 1, end: 2 }] :
                i === 1 ? [{ start: 3, end: 4 }] :
                i === 2 ? [{ start: 5, end: 6 }] :
                [{ start: 7, end: 8 }, { start: 9, end: 10 }],
            'Jueves':
                i === 0 ? [{ start: 11, end: 12 }] :
                i === 1 ? [{ start: 13, end: 14 }] :
                i === 2 ? [{ start: 1, end: 2 }] :
                [{ start: 3, end: 4 }],
            'Viernes':
                i === 0 ? [{ start: 5, end: 6 }] :
                i === 1 ? [{ start: 7, end: 8 }] :
                i === 2 ? [{ start: 9, end: 10 }] :
                [{ start: 11, end: 12 }],
        },
    })),
    E: Array.from({ length: 5 }, (_, i) => ({ 
        id: `E${String(i + 200).padStart(3, '0')}`, 
        capacity: 25 + i * 4,
        maintenanceIssues: null,
        otherIssues: i === 2 ? 'Sillas rotas' : null,
        disponibilidadPorDia: {
            'Lunes':
                i === 0 ? [{ start: 1, end: 2 }] :
                i === 1 ? [{ start: 3, end: 4 }] :
                i === 2 ? [{ start: 5, end: 6 }] :
                i === 3 ? [{ start: 7, end: 8 }] :
                [{ start: 9, end: 10 }], 
            'Martes':
                i === 0 ? [{ start: 11, end: 12 }] :
                i === 1 ? [{ start: 5, end: 7 }] : 
                i === 2 ? [{ start: 13, end: 14 }] :
                i === 3 ? [{ start: 1, end: 2 }] :
                [{ start: 3, end: 4 }],
            'Miércoles':
                i === 0 ? [{ start: 5, end: 6 }] :
                i === 1 ? [{ start: 7, end: 8 }] :
                i === 2 ? [{ start: 9, end: 10 }] :
                i === 3 ? [{ start: 11, end: 12 }] :
                [{ start: 13, end: 14 }],
            'Jueves':
                i === 0 ? [{ start: 1, end: 2 }] :
                i === 1 ? [{ start: 3, end: 4 }] :
                i === 2 ? [{ start: 5, end: 6 }] :
                i === 3 ? [{ start: 7, end: 8 }] :
                [{ start: 9, end: 10 }],
            'Viernes':
                i === 0 ? [{ start: 11, end: 12 }] :
                i === 1 ? [{ start: 13, end: 14 }] :
                i === 2 ? [{ start: 1, end: 2 }] :
                i === 3 ? [{ start: 3, end: 4 }] :
                [{ start: 5, end: 6 }],
        },
    })),

    K: k_room_ids.map((id, index) => ({
        id: id,
        capacity: 25 + index * 2,
        maintenanceIssues: (id === 'K203' || id === 'K305') ? 'Falla de audio' : null,
        otherIssues: (id === 'K402') ? 'Filtración de agua' : null,
        disponibilidadPorDia: {
            'Lunes':
                (id === 'K301') ? [{ start: 5, end: 6 }] : 
                (id === 'K201') ? [{ start: 1, end: 2 }] : 
                (id === 'K300') ? [{ start: 3, end: 4 }] : 
                [{ start: 7, end: 8 }, { start: 9, end: 10 }],
            'Martes':
                (id === 'K202') ? [{ start: 11, end: 12 }] :
                (id === 'K302') ? [{ start: 13, end: 14 }] :
                (id === 'K203') ? [{ start: 1, end: 2 }] :
                [{ start: 3, end: 4 }],
            'Miércoles':
                (id === 'K402') ? [{ start: 1, end: 2 }] : 
                (id === 'K204') ? [{ start: 5, end: 6 }] :
                (id === 'K303') ? [{ start: 7, end: 8 }] :
                [{ start: 9, end: 10 }, { start: 11, end: 12 }],
            'Jueves':
                (id === 'K205') ? [{ start: 13, end: 14 }] :
                (id === 'K304') ? [{ start: 1, end: 2 }] :
                (id === 'K206') ? [{ start: 3, end: 4 }] :
                [{ start: 5, end: 6 }],
            'Viernes':
                (id === 'K305') ? [{ start: 7, end: 8 }] :
                (id === 'K207') ? [{ start: 9, end: 10 }] :
                (id === 'K306') ? [{ start: 11, end: 12 }] :
                [{ start: 13, end: 14 }],
        },
    })),
    F: Array.from({ length: 10 }, (_, i) => ({ 
        id: `F${String(i + 401).padStart(3, '0')}`,  
        capacity: 40 + i * 5,
        maintenanceIssues: i === 2 ? 'Proyector en mantención' : null,
        otherIssues: i === 3 ? 'Ventanas no cierran': null,
        disponibilidadPorDia: {
            'Lunes':
                i === 0 ? [{ start: 1, end: 2 }] :
                i === 1 ? [{ start: 3, end: 4 }] :
                i === 2 ? [{ start: 5, end: 6 }] :
                [{ start: 7, end: 8 }, { start: 9, end: 10 }],
            'Martes':
                i === 0 ? [{ start: 11, end: 12 }] :
                i === 1 ? [{ start: 13, end: 14 }] :
                i === 2 ? [{ start: 1, end: 2 }] :
                [{ start: 3, end: 4 }],
            'Miércoles':
                i === 0 ? [{ start: 5, end: 6 }] :
                i === 1 ? [{ start: 7, end: 8 }] :
                i === 2 ? [{ start: 9, end: 10 }] :
                [{ start: 11, end: 12 }, { start: 13, end: 14 }],
            'Jueves':
                i === 0 ? [{ start: 1, end: 2 }] :
                i === 1 ? [{ start: 3, end: 4 }] :
                i === 2 ? [{ start: 5, end: 6 }] :
                [{ start: 7, end: 8 }],
            'Viernes':
                i === 0 ? [{ start: 9, end: 10 }] :
                i === 1 ? [{ start: 11, end: 12 }] :
                i === 2 ? [{ start: 13, end: 14 }] :
                [{ start: 1, end: 2 }, { start: 3, end: 4 }],
        },
    })), 
};

function AdminPage() {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDate = queryParams.get('date');
    const getLocalDateFromISO = (isoString) => {
        const [year, month, day] = isoString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };
    const formattedDate = selectedDate
        ? getLocalDateFromISO(selectedDate).toLocaleDateString('es-CL')
        : '';

    const [selectedBlock, setSelectedBlock] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDay, setSelectedDay] = useState('Lunes');
    const [showRequestSuccessModal, setShowRequestSuccessModal] = useState(false);
    // NUEVOS ESTADOS PARA EL MODAL DE CONFIRMACIÓN
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmActionType, setConfirmActionType] = useState(null); // 'maintenance' o 'other'
    const [allRoomData, setAllRoomData] = useState(roomData);
    // Estado para el campo de descripción del problema (se mantiene para reportar nuevos)
    const [problemDescription, setProblemDescription] = useState('');

    const blocks = ['A', 'B', 'E', 'K', 'F'];
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setSelectedDay('Lunes');
        setProblemDescription(''); // Limpia el input al abrir el modal para un posible nuevo reporte
        console.log(`Sala ${room.id} clickeada.`);
    };

    const closeRoomDetails = () => {
        setSelectedRoom(null);
        setProblemDescription(''); // Limpia el input al cerrar el modal
    };

    // FUNCIÓN UNIFICADA Y SEGURA PARA ACTUALIZAR PROBLEMAS (Reportar o Eliminar)
    const updateRoomIssue = (issueType, issueText) => {
        const newAllRoomData = { ...allRoomData };
        const buildingRooms = [...newAllRoomData[selectedBlock]];
        const roomIndex = buildingRooms.findIndex(r => r.id === selectedRoom.id);

        if (roomIndex !== -1) {
            const updatedRoom = { ...buildingRooms[roomIndex] }; // Crea una copia del objeto sala

            if (issueType === 'maintenance') {
                updatedRoom.maintenanceIssues = issueText;
                // Si se reporta un problema de mantención, limpiar el otro tipo si existiera.
                // Esto asegura que una sala no tenga ambos tipos de problemas a la vez por la interfaz de reporte.
                if (issueText && updatedRoom.otherIssues) {
                    updatedRoom.otherIssues = null;
                }
            } else if (issueType === 'other') {
                updatedRoom.otherIssues = issueText;
                // Si se reporta un problema "otro", limpiar el de mantención si existiera.
                if (issueText && updatedRoom.maintenanceIssues) {
                    updatedRoom.maintenanceIssues = null;
                }
            }

            buildingRooms[roomIndex] = updatedRoom; // Actualiza la sala en la copia del array de salas
            newAllRoomData[selectedBlock] = buildingRooms; // Actualiza el bloque en la copia de todos los datos
            setAllRoomData(newAllRoomData); // Establece el nuevo estado global

            // IMPORTANTE: actualiza selectedRoom para que el modal refleje los cambios inmediatamente
            setSelectedRoom(updatedRoom);
        }
        setShowRequestSuccessModal(true); // Muestra el modal de éxito.
        // Limpia el input de descripción solo si se estaba reportando un problema nuevo con texto
        if (issueText) {
            setProblemDescription('');
        }
    };
    
    // Funciones específicas para ABRIR EL MODAL DE CONFIRMACIÓN
    const handleRemoveMaintenanceClick = (e) => {
        e.stopPropagation(); // Evita que el clic se propague al card de la sala
        setConfirmActionType('maintenance');
        setShowConfirmModal(true);
    };

    const handleRemoveOtherClick = (e) => {
        e.stopPropagation(); // Evita que el clic se propague al card de la sala
        setConfirmActionType('other');
        setShowConfirmModal(true);
    };

    // Lógica para CONFIRMAR la eliminación desde el modal
    const confirmRemoval = () => {
        if (confirmActionType === 'maintenance') {
            updateRoomIssue('maintenance', null);
        } else if (confirmActionType === 'other') {
            updateRoomIssue('other', null);
        }
        setShowConfirmModal(false);
        setConfirmActionType(null); // Restablecer el tipo de acción
    };

    // Lógica para CANCELAR la eliminación desde el modal
    const cancelRemoval = () => {
        setShowConfirmModal(false);
        setConfirmActionType(null); // Restablecer el tipo de acción
    };

    const isSlotOccupied = (roomSchedulesForDay, slotStart, slotEnd) => {
        return roomSchedulesForDay.some(schedule => {
            const reservedStart = schedule.start;
            const reservedEnd = schedule.end;
            return slotStart < reservedEnd && reservedStart < slotEnd;
        });
    };

    return (
        <div className="page-container">
            {selectedDate && (<h2>Salas disponibles para {formattedDate}</h2>)}
            {!selectedDate && (<h2>Estado Actual de Salas de Clases</h2>)}

            {/* Bloques de salas */}
            <p>Seleccione un edificio para ver las salas:</p>
            <div className="block-selection-group">
                {blocks.map(block => (
                    <button
                        key={block}
                        className={`block-button ${selectedBlock === block ? 'active' : ''}`}
                        onClick={() => setSelectedBlock(block)}
                    >
                        Edificio {block}
                    </button>
                ))}
            </div>


            {selectedBlock && (
                <div className="rooms-list-container">
                    <h3>Salas del Edificio {selectedBlock}</h3>
                    <div className="rooms-grid">
                        {allRoomData[selectedBlock].map(room => (
                            <div
                                key={room.id}
                                className={`room-card ${
                                    room.maintenanceIssues ? 'border-maintenance' :
                                    room.otherIssues ? 'border-other' : ''
                                }`}
                                onClick={() => handleRoomClick(room)}
                            >
                                <span className="room-id">{room.id}</span>
                                {room.maintenanceIssues && (
                                    <span className="room-issue maintenance">
                                        <span role="img" aria-label="wrench-emoji">🔧</span>
                                    </span>
                                )}
                                {room.otherIssues && (
                                    <span className="room-issue other">
                                        <span role="img" aria-label="warning-emoji">⚠️</span>
                                    </span>
                                )}
                                <button
                                    className="view-schedule-button"
                                    onClick={(e) => { e.stopPropagation(); handleRoomClick(room); }}
                                >
                                    Ver Estado
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Formulario de Sala - MODAL DETALLE DE SALA */}
            {selectedRoom && (
                <div className="room-details-overlay">
                    <div className="room-details-content">
                        <h3>Estado de Sala: {selectedRoom.id}</h3>
                        <p>Capacidad: {selectedRoom.capacity} personas</p>
                        {(selectedRoom.maintenanceIssues || selectedRoom.otherIssues) && (
                            <div className="existing-issues-section"> 
                                <h4>Quitar Problema Existente:</h4> 
                                {selectedRoom.maintenanceIssues && (
                                    <p className="issue-detail maintenance-detail">
                                        <span role="img" aria-label="wrench-emoji">🔧</span> <strong>En Mantención:</strong> {selectedRoom.maintenanceIssues}
                                        <button
                                            className='x-button'
                                            onClick={handleRemoveMaintenanceClick} 
                                        > Quitar
                                        </button>
                                    </p>
                                )}
                                {selectedRoom.otherIssues && (
                                    <p className="issue-detail other-issue-detail">
                                        <span role="img" aria-label="warning-emoji">⚠️</span> <strong>Falla/Problema:</strong> {selectedRoom.otherIssues}
                                        <button
                                            className='x-button'
                                            onClick={handleRemoveOtherClick}
                                        > Quitar
                                        </button>
                                    </p>
                                )}
                            </div>
                        )}
                        {!(selectedRoom.maintenanceIssues || selectedRoom.otherIssues) && (
                            <p className="no-issues-message">Esta sala no tiene problemas reportados actualmente.</p>
                        )}


                        {/* SECCIÓN MEJORADA PARA REPORTAR/ACTUALIZAR PROBLEMAS */}
                        <div className="report-issue-section">
                            <h4>Reportar o Actualizar Problema:</h4>
                            <input
                                type="text"
                                value={problemDescription}
                                onChange={(e) => setProblemDescription(e.target.value)}
                                placeholder="Describe el nuevo problema (ej. 'Proyector no enciende')"
                                size="40"
                            />
                            <div className="issue-action-buttons">
                                <button
                                    className="maintenance-button"
                                    onClick={() => updateRoomIssue('maintenance', problemDescription)}
                                    disabled={!problemDescription.trim()}
                                >
                                    Reportar como Mantención
                                </button>
                                <button
                                    className="failure-button"
                                    onClick={() => updateRoomIssue('other', problemDescription)}
                                    disabled={!problemDescription.trim()}
                                >
                                    Reportar como Falla/Problema
                                </button>
                            </div>
                        </div>
                        <button className="close-button" onClick={closeRoomDetails}>Atrás</button>
                    </div>
                </div>
            )}

            {/* MODAL DE CONFIRMACIÓN PERSONALIZADO */}
            {showConfirmModal && (
                <div className="custom-confirm-overlay">
                    <div className="custom-confirm-content">
                        <h2>¿Estás seguro?</h2>
                        <p>
                            Estás a punto de quitar este problema
                        </p>
                        <div className="confirm-buttons">
                            <button 
                                className="confirm-yes-button" 
                                onClick={confirmRemoval}
                            >
                                Sí, quitar
                            </button>
                            <button 
                                className="confirm-no-button" 
                                onClick={cancelRemoval}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {showRequestSuccessModal && (
            <div className="request-success-overlay">
                <div className="request-success-content">
                    <h2>¡Estado de sala cambiado exitosamente!</h2>
                    <button
                        className="close-success-modal-button"
                        onClick={() => setShowRequestSuccessModal(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
            )}
            

            <button className="main-back-button" onClick={() => navigate(-1)}>
                Atrás
            </button>
        </div>
    );
}

export default AdminPage;