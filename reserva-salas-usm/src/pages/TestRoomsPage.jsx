import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './PageStyles.css'; 
import '../components/RoleSelection.css'; 
import './TestRoomsPage.css'; 

function TestRoomsPage(){
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setErrorMessage("");
    };

    const handleCheckAvailability = () => {
        if (!selectedDate) {
            setErrorMessage("Por favor seleccione una fecha primero.");
            return;
        }
        setErrorMessage("");

        console.log("Fecha seleccionada:", selectedDate);
        navigate(`/professor/test-rooms/availability?date=${selectedDate.toISOString().split('T')[0]}`);
    };

    return (
        <div className="page-container">
            <h2>Disponibilidad de Salas para Evaluación</h2>


            <div className="date-picker-container">
                <div className='datepicker-wrapper'>
                    <h3>Seleccione fecha de la evaluación:</h3>
                    <DatePicker
                        label="Fecha Evaluación"
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()} //no permitir fechas pasadas
                        filterDate={(date) => date.getDay() !== 0} //no permitir domingos
                        calendarStartDay={1}
                        isClearable
                        showMonthDropdown
                        popperPlacement="right-start"
                        locale={es}
                    />
                </div>

                {errorMessage && (
                    <div className="notification-error">
                        {errorMessage}
                    </div>
                )}

                <button className="set-button" onClick={handleCheckAvailability}> 
                    Ver Disponibilidad
                </button>
            </div>

            <button className="back-button" onClick={() => navigate(-1)} style={{ marginBottom: '30px' }}> 
                Volver
            </button>
        </div>
    );
}

export default TestRoomsPage;