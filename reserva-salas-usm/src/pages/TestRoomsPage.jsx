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
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="page-container">
            <h2>Disponibilidad de Salas para Evaluación</h2>


            <div className="date-picker-container">
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
                    locale={es}
                />
            </div>

            <button className="back-button" onClick={() => navigate(-1)} style={{ marginBottom: '30px' }}> 
                Volver
            </button>
        </div>
    );
}

export default TestRoomsPage;