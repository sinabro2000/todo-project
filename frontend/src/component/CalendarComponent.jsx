import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css'
import './CalendarComponent.css'

function CalenderComponent() {
    const [value, setValue] = useState([new Date(), new Date()]);

    useEffect(() => {
        console.log('value 변경됨:', value);
    }, [value]);


    return (
        <>
            <Calendar
                locale='ko'
                onChange={setValue}
                value={value}
            />
        </>
    );
}

export default CalenderComponent;