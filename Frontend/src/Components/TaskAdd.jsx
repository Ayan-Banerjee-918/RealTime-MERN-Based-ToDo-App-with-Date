import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const TaskAdd = (props) => {
    const [value, setValue] = useState({ 
        startDate: null,
        endDate: null
    }); 
    const [title, setTitle] = useState('');

    const handleValueChange = (newValue) => {
        console.log(newValue);
        setValue(newValue); 
    } 

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        console.log(title) //addTask function ta kothai re?
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(value.startDate)
        if (title == '' || value.startDate == '' || value.startDate == null) return
        props.addTask(title, value)
    }

    const today = new Date()
    const tomorrow = today.setDate(today.getDate()+1)
    const nextWeek = today.setDate(today.getDate()+6)
    
    return (
    <>
    <form onSubmit={onFormSubmit} className={`container w-4/5 max-w-[1200px] mx-auto bg-slate-100 dark:bg-slate-800 border border-solid rounded-lg px-4 py-3 flex-auto flex flex-wrap items-center place-content-between border-slate-300 dark:border-slate-600 shadow-md fixed bottom-10 left-0 right-0 transition-all delay-[95ms] duration-800 ease-in-out`}>
        <div className="container flex flex-wrap space-x-4 items-center w-3/5">
            <div className={`container w-4 h-4 rounded-full inline-block border-2 border-solid border-slate-700 dark:border-slate-400`}>
            </div>
            <div className="w-4/5 flex-col flex">
                <input className="w-full bg-inherit focus:outline-none text-amber-800 dark:text-slate-200 dark:placeholder:text-slate-300 font-medium" placeholder="Add Task" type="text" name="task" onChange={handleTitleChange}/>
            </div>
        </div>
        <div className="container flex flex-wrap space-x-4 items-center w-fit">
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
        </div>
        <button type='submit' hidden>Add Task</button>
    </form>
    </>
    )
}
export default TaskAdd