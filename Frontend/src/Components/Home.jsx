import Navbar from './Navbar'
import TaskCard from "./TaskCard"
import TaskAdd from './TaskAdd'
import { Transition } from '@headlessui/react'
import { useState,useEffect,React } from 'react'
import { useSelector } from 'react-redux'
import {CSSTransition, TransitionGroup} from "react-transition-group"

const Home = () => {
    
    const API_BASE = useSelector(state => state.API_BASE); 
    const [refresh, setRefresh] = useState(false);
    
    const getTodos = async (url) => {
        await fetch(url + '/')
            .then(res => res.json())
            .then(data => setTodos(data));
    }

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos(API_BASE);
        console.log(todos);
    },[refresh]);

    const addTaskCallback = (title, due) => {
        console.log(title, due);
        setTodos([{ task_desc: title, task_due: due.startDate, is_complete: false }, ...todos]);
        setRefresh(!refresh);
    }

    const onDeleteTask = async (id) => {
        console.log(id);
        await fetch(API_BASE + '/' + id, { method: "DELETE" }).then(res => res.json());
        setRefresh(!refresh);
    }

    // DUMMY DATA - later GET from API
    // const taskList = [
    //     {id: 1, title: 'Task 1', due: 'Tomorrow', completed: true},
    //     {id: 2, title: 'Task 2', due: 'Tomorrow', completed: false},
    //     {id: 3, title: 'Task 3', due: 'Tomorrow', completed: true},
    //     {id: 4, title: 'Task 4', due: 'Tomorrow', completed: false}, 
    //     {id: 5, title: 'Task 5', due: 'Tomorrow', completed: true}, 
    //     {id: 6, title: 'Task 6', due: 'Tomorrow', completed: true}, 
    //     {id: 7, title: 'Task 7', due: 'Tomorrow', completed: false}, 
    //     {id: 8, title: 'Task 8', due: 'Tomorrow', completed: true},  
    // ]

    

    return (
        <div className='antialiased min-h-screen h-full dark:bg-slate-900 transition-[background-color] duration-800'>
            <div className=''>
                <div className='max-w-[1100px] w-full mx-auto py-8'>
                    <h1 className='font-semibold text-2xl text-slate-800 dark:text-slate-200'>Tasks</h1>
                </div>
                <div className='flex-col space-y-2 max-w-[1100px] w-full mx-auto rounded-xl'>
                    {todos.filter(t=>!t.is_complete).map((t,index)=>(
                        <TaskCard key={index} title={t.task_desc} due={t.task_due} completed={t.is_complete} deleteTask={() => { onDeleteTask(t._id) }} />
                    ))}
                    <h3 className='font-semibold text-1xl text-slate-600 dark:text-slate-200 pt-4'>Completed</h3>
                    {todos.filter(t=>t.is_complete).map((t,index)=>(
                        <TaskCard key={index} title={t.task_desc} due={t.task_due} completed={t.is_complete} deleteTask={() => { onDeleteTask(t._id) }} />
                    ))}
                </div>
            </div>
            <TaskAdd addTask={addTaskCallback}/>
            <div className='h-40 bg-inherit'></div>
        </div>
  )
}

export default Home