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
    const today = new Date()
    const tomorrow = today.setDate(today.getDate()+1)
    const nextWeek = today.setDate(today.getDate()+6)
    return (
        <Datepicker
            useRange={false}
            asSingle={true}
            value={value}
            onChange={handleValueChange}
            displayFormat={"D MMM, YYYY"}
            placeholder={"Pick a Date"}
            startFrom={new Date()}
            primaryColor={"amber"}
            readOnly={true}
            popoverDirection="up"
            minDate={new Date()}
            showShortcuts={true}
            configs={{
                shortcuts: {
                today: "Today", 
                tomorrow: { 
                    text: "Tomorrow",
                    period: {
                      start: tomorrow,
                      end: tomorrow
                    }
                  }, 
                nextWeek: {
                    text: "Next Week",
                    period: {
                        start: nextWeek,
                        end: nextWeek
                    }
                }
                },
            }
        }
        />
    );
}; 
export default Calendar;