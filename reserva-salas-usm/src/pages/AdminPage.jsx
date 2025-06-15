import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PageStyles.css';
import '../components/RoleSelection.css';
import './SemestralRoomsPage.css';
import './ScheduleModal.css';

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
        otherIssues: null,
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
        otherIssues: i === 0 ? 'Falla de proyector' : null,
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
    const [allRoomData, setAllRoomData] = useState(roomData);
    // Nuevo estado para el campo de descripci\'on del problema
    const [problemDescription, setProblemDescription] = useState('');

    const blocks = ['A', 'B', 'E', 'K', 'F'];
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setSelectedDay('Lunes');
        // Cuando se abre el modal, inicializa el input de problema
        // Podrías poner el problema existente si solo se edita uno, o vac\'io si es para nuevo
        setProblemDescription('');
        console.log(`Sala ${room.id} clickeada.`);
    };

    const closeRoomDetails = () => {
        setSelectedRoom(null);
        setProblemDescription(''); // Limpia el input al cerrar
    };

    // FUNCI\'ON UNIFICADA Y SEGURA PARA ACTUALIZAR PROBLEMAS
    const updateRoomIssue = (issueType, issueText) => {
        const newAllRoomData = { ...allRoomData };
        const buildingRooms = [...newAllRoomData[selectedBlock]];
        const roomIndex = buildingRooms.findIndex(r => r.id === selectedRoom.id);

        if (roomIndex !== -1) {
            const updatedRoom = { ...buildingRooms[roomIndex] }; // Crea una copia del objeto sala
            if (issueType === 'maintenance') {
                updatedRoom.maintenanceIssues = issueText;
                if (issueText) { // Si se reporta, limpiar el otro tipo de problema si est\'a vacío
                    updatedRoom.otherIssues = null;
                }
            } else if (issueType === 'other') {
                updatedRoom.otherIssues = issueText;
                if (issueText) { // Si se reporta, limpiar el otro tipo de problema si est\'a vacío
                    updatedRoom.maintenanceIssues = null;
                }
            }
            buildingRooms[roomIndex] = updatedRoom; // Actualiza la sala en la copia del array de salas
            newAllRoomData[selectedBlock] = buildingRooms; // Actualiza el bloque en la copia de todos los datos
            setAllRoomData(newAllRoomData); // Establece el nuevo estado global

            // IMPORTANTE: actualiza selectedRoom para que el modal refleje los cambios
            setSelectedRoom(updatedRoom);
        }
        setShowRequestSuccessModal(true);
        setProblemDescription(''); // Limpia el input despu\'es de enviar
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

                        {/* Mostrar problemas existentes */}
                        {selectedRoom.maintenanceIssues && (
                            <p className="issue-detail maintenance-detail">
                                <span role="img" aria-label="wrench-emoji">🔧</span> <strong>En Mantención:</strong> {selectedRoom.maintenanceIssues}
                                <button
                                    className='x-button'
                                    onClick={() => updateRoomIssue('maintenance', null)} 
                                > ⨉
                                </button>
                            </p>
                        )}
                        {selectedRoom.otherIssues && (
                            <p className="issue-detail other-issue-detail">
                                <span role="img" aria-label="warning-emoji">⚠️</span> <strong>Falla/Problema:</strong> {selectedRoom.otherIssues}
                                <button
                                    className='x-button'
                                    onClick={() => updateRoomIssue('other', null)} 
                                > ⨉
                                </button>
                            </p>
                        )}

                        {/* SECCI\'ON MEJORADA PARA REPORTAR/ACTUALIZAR PROBLEMAS */}
                        <div className="report-issue-section">
                            <h4>Reportar o Actualizar Problema:</h4>
                            <input
                                type="text"
                                value={problemDescription} 
                                onChange={(e) => setProblemDescription(e.target.value)}
                                placeholder="Describe el problema (ej. 'Proyector no enciende')"
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

                        {/* Visualizaci\'on de horarios */}
                        <div className="schedules-table-container">
                            <h4>Horarios Ocupados:</h4>
                            <div className="day-selection">
                                {daysOfWeek.map(day => (
                                    <button
                                        key={day}
                                        className={`day-button ${selectedDay === day ? 'active' : ''}`}
                                        onClick={() => setSelectedDay(day)}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <div className="schedule-grid">
                                {standardTimeSlots.map(slot => {
                                    const roomSchedulesForDay = selectedRoom.disponibilidadPorDia[selectedDay] || [];
                                    const occupied = isSlotOccupied(roomSchedulesForDay, slot.start, slot.end);
                                    return (
                                        <div
                                            key={slot.label}
                                            className={`time-slot ${occupied ? 'occupied' : 'available'}`}
                                        >
                                            {slot.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button className="close-button" onClick={closeRoomDetails}>Atrás</button>
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