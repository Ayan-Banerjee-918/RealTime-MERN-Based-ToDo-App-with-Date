import { TrashIcon } from "@heroicons/react/24/outline"

const TaskCard = (props) => {
    return (
    <>
    <div className={`container w-full mx-auto bg-slate-100 border border-solid border-slate-300 rounded-lg px-4 py-3 flex-auto flex flex-wrap items-center place-content-between ${props.completed?'line-through opacity-50':'hover:border-slate-400'}`}>
        <div className="container flex flex-wrap space-x-4 items-center w-fit">
            <div className={`container w-4 h-4 rounded-full inline-block border-2 border-solid border-slate-700 transition-all ease-in-out duration-400 ${props.completed ? 'opacity-80 bg-green-500':'hover:bg-green-500'}`}></div>
            <div className="container w-fit flex-col flex">
                <span>Task 1</span>
                <span className="text-xs text-slate-500 font-medium">Tomorrow</span>
            </div>
        </div>
        <TrashIcon className="h-5 w-5 text-slate-500 hover:text-red-500 transition-all ease-in-out duration-400" aria-hidden="true"/>
    </div>
    </>
    )
}
export default TaskCard