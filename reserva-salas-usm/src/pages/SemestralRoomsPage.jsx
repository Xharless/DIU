
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


// Datos de ejemplo para las salas, los maintenance son del tipo "arreglar cosas electricas o de funcionamiento", 
// mientras que other son reparaciones a las salas
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

function SemestralRoomsPage() {
    const navigate = useNavigate();
    const [selectedBlock, setSelectedBlock] = useState(null); 
    const [selectedRoom, setSelectedRoom] = useState(null); 
    const [selectedDay, setSelectedDay] = useState('Lunes');
    const [showRequestSuccessModal, setShowRequestSuccessModal] = useState(false);
    
    const blocks = ['A', 'B', 'E', 'K', 'F'];
    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setSelectedDay('Lunes'); 
        
        console.log(`Sala ${room.id} clickeada.`);
    };

    const closeRoomDetails = () => {
        setSelectedRoom(null);
    };

    const handleRequestSlot = (room, timeSlot, day) => {
        console.log(`Solicitando sala ${room.id}, Bloque ${timeSlot.label} para el día ${day}.`);
        setShowRequestSuccessModal(true); 
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
            <h2>Disponibilidad de Salas Semestrales</h2>

            {/* Bloques de salas */}
            <p>Seleccione un edificio para ver sus salas:</p>
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
                        {roomData[selectedBlock].map(room => (
                            <div
                                key={room.id}
                                className={`room-card ${
                                    room.maintenanceIssues ? 'border-maintenance' :
                                    room.otherIssues ? 'border-other' : ''
                                }`}
                                onClick={() => handleRoomClick(room)}
                            >
                                <span className="room-id">{room.id}</span>
                                <span className="room-capacity">Capacidad: {room.capacity}</span>
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
                                    Ver Horarios
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Formulario de Sala */}
            {selectedRoom && (
                <div className="room-details-overlay">
                    <div className="room-details-content">
                        <h3>Horarios y Solicitud para la Sala {selectedRoom.id}</h3>
                        <p>Capacidad: <strong>{selectedRoom.capacity} personas</strong></p>
                        {selectedRoom.maintenanceIssues && (
                            <p className="issue-detail maintenance-detail"> 
                                <span role="img" aria-label="wrench-emoji">🔧</span> <strong>En Mantención:</strong>{selectedRoom.maintenanceIssues}
                            </p>
                        )}
                        {selectedRoom.otherIssues && (
                            <p className="issue-detail other-issue-detail">
                                <span role="img" aria-label="warning-emoji">⚠️</span> <strong>Falla/Problema:</strong>{selectedRoom.otherIssues}
                            </p>
                        )}
                        

                        <div className="day-tabs">
                            {daysOfWeek.map(day => (
                                <button
                                    key={day}
                                    className={`day-tab-button ${selectedDay === day ? 'active' : ''}`}
                                    onClick={() => setSelectedDay(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>


                        <div className="schedules-table-container">
                            <h4>Disponibilidad para {selectedDay}:</h4>
                            <table className="schedules-table">
                                <thead>
                                    <tr>
                                        <th>Bloque</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedRoom.disponibilidadPorDia[selectedDay] && selectedRoom.disponibilidadPorDia[selectedDay].length > 0 ? (
                                        standardTimeSlots.map((slot, index) => {
                                            const roomSchedulesForCurrentDay = selectedRoom.disponibilidadPorDia[selectedDay];
                                            const isOccupied = isSlotOccupied(roomSchedulesForCurrentDay, slot.start, slot.end);
                                            return (
                                                <tr key={index} className={isOccupied ? 'occupied-row' : 'available-row'}>
                                                    <td>{slot.label}</td>
                                                    <td>
                                                        <span className={`status-text ${isOccupied ? 'occupied' : 'available'}`}>
                                                            {isOccupied ? 'Ocupado' : 'Libre'}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {!isOccupied ? (
                                                            <button
                                                                className="request-slot-button"
                                                                onClick={() => handleRequestSlot(selectedRoom, slot, selectedDay)} 
                                                            >
                                                                Solicitar
                                                            </button>
                                                        ) : (
                                                            <button className="view-details-button" disabled>Ver Detalles</button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="no-availability-message">No hay bloques registrados para el día {selectedDay}.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button className="close-button" onClick={closeRoomDetails}>Atras</button>
                    </div>
                </div>
            )}
            {showRequestSuccessModal && (
            <div className="request-success-overlay">
                <div className="request-success-content">
                    <h3>¡Solicitud Enviada con Éxito!</h3>
                    <p>Tu solicitud para la sala ha sido enviada. Te notificaremos sobre su estado.</p>
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
                Atras
            </button>
        </div>
    );
}

export default SemestralRoomsPage;