import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './CalendarComponent.css'

function CalenderComponent({value, setValue }) {

    





    
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