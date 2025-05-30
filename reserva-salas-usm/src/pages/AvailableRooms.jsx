import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './PageStyles.css'; 
import '../components/RoleSelection.css';


function AvailableRooms() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedDate = queryParams.get('date');
    const formattedDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString('es-CL')
        : '';

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Aquí iría la lógica real para obtener salas desde una API
        // Por ahora simulamos resultados
        if (selectedDate) {
            // Simulación
            setRooms([
                { id: 1, name: "Sala 101", capacidad: 30 },
                { id: 2, name: "Sala 204", capacidad: 25 },
            ]);
        }
    }, [selectedDate]);

    return (
        <div className="page-container">
            <h2>Salas disponibles para {formattedDate}</h2>
            {rooms.length === 0 ? (
                <p>No hay salas disponibles para esta fecha.</p>
            ) : (
                <ul>
                    {rooms.map(room => (
                        <li key={room.id}>
                            {room.name} - Capacidad: {room.capacidad}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AvailableRooms;
