import { TrashIcon } from "@heroicons/react/24/outline"

const TaskCard = (props) => {
    let dueDate = new Date(props.due);
    const today = new Date();
    const tomorrow = new Date().setDate(new Date().getDate() + 1);
    const yesterday = new Date().setDate(new Date().getDate() - 1);
    const formatDate = (date) => {
        return `${new Date(date).toLocaleDateString('en-gb', {day:'numeric'})} ${new Date(date).toLocaleDateString('en-gb', {month:'short'})}, ${new Date(date).toLocaleDateString('en-gb', {year:'numeric'})}`;
    }
    console.log(formatDate(today));

    if (formatDate(today) == formatDate(dueDate)) {
        dueDate = 'Today';
    } else if(formatDate(tomorrow) == formatDate(dueDate)) {
        dueDate = 'Tomorrow'; 
    } else if(formatDate(yesterday) == formatDate(dueDate)) {
        dueDate = 'Yesterday';
    } else {
        dueDate = formatDate(dueDate);
    }
    //${props.due < Date().getDate()? 'bg-red-100 dark:bg-[#ffb3b3]' : 'bg-amber-50 dark:bg-[#2f2600]'} can this work for the tasks passed deadlines
    
    return (
    <>
    <div className={`container w-full mx-auto ${props.completed ?'bg-slate-100 dark:bg-slate-700':'bg-amber-50 dark:bg-[#2f2600]'} 
                    border border-solid border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 flex-auto flex flex-wrap items-center place-content-between ${props.completed?'opacity-60 dark:opacity-75':'hover:border-slate-400 dark:hover:border-slate-500'} transition-all duration-800`}>
        <div className="container flex flex-wrap space-x-4 items-center w-fit">
            <div className={`container w-4 h-4 rounded-full inline-block border-2 border-solid border-amber-500 dark:border-amber-400 transition-all ease-in-out duration-400 ${props.completed ? 'opacity-80 bg-amber-500 hover:bg-slate-100 dark:hover:bg-slate-600':'hover:bg-amber-400'}`} onClick={()=>{props.completeTask()}}></div>
            <div className="container w-fit flex-col flex">
                <span className={`font-medium text-amber-700 dark:text-amber-400  ${props.completed?'line-through':''}`}>{props.title}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-300 font-medium">{dueDate}</span>
            </div>
        </div>
        <TrashIcon className="h-5 w-5 text-slate-500 dark:text-slate-200 hover:text-red-400 dark:hover:text-red-500 transition-all ease-in-out duration-400" aria-hidden="true" onClick={()=>{props.deleteTask()}}/>
    </div>
    </>
    )
}
export default TaskCard