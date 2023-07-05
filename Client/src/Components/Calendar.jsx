import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const Calendar = () => { 
    const [value, setValue] = useState({ 
        startDate: null,
        endDate: null
    }); 
    const handleValueChange = (newValue) => {
        console.log(newValue);
        setValue(newValue); 
    } 
    return (
        <Datepicker
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
            displayFormat={"DD-MM-YYYY"}
            placeholder={"Pick a Date"}
            startFrom={new Date()}
        />
    );
}; 
export default Calendar;