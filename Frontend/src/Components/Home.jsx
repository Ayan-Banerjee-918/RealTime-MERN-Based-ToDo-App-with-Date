import Navbar from './Navbar'
import TaskCard from "./TaskCard"
import TaskAdd from './TaskAdd'
import { Transition } from '@headlessui/react'
import { useState,useEffect,React } from 'react'
import { useSelector } from 'react-redux'
import {CSSTransition, TransitionGroup} from "react-transition-group"
import styled from 'styled-components'
import io from 'socket.io-client';

const transitionListItem = styled.div`
.transition-enter {
	opacity: 0.01;
	transform: translate(0, -5px);
}

.transition-enter-active {
	opacity: 1;
	transform: translate(0, 0);
	transition: all 300ms ease;
}

.transition-exit {
	opacity: 1;
	transform: translate(0,0);
}

.transition-exit-active {
	opacity: 0.01;
	transform: translate(0, -5px);
	transition: all 300ms ease;
}
`
const socket = io.connect(import.meta.env.VITE_API_URL);

const Home = () => {    
    const API_BASE = useSelector(state => state.API_BASE);  

    const getTodos = async (url) => {
        await fetch(url)
            .then(res => {
               return res.json()})
            .then(data => setTodos(data));
        setIsLoading(false)
    }

    const [todos, setTodos] = useState([]);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        getTodos(API_BASE);
    }, []);
    
    useEffect(() => {
        socket.on("received_todo", () => {
            getTodos(API_BASE);
        })
    }, [socket]);
    
    const addTaskCallback = async (title, due) => {
        const data=await fetch(API_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task_desc: title,
                task_due: due.startDate,
                user_id: 0
            })
        }).then(res => res.json());
        setTodos([data, ...todos]);
        socket.emit("todo_change", todos);
    }
   
    const onDeleteTask = async (id) => {
        await fetch(API_BASE + id, { method: "DELETE" })
            .then(res => res.json());
        getTodos(API_BASE);
        socket.emit("todo_change", todos);
    }

    const toggleComplete = async (id) => {
        await fetch(API_BASE + 'completeTask/' + id, { method: "PUT",
        }).then(res => res.json());
        getTodos(API_BASE);
        socket.emit("todo_change", todos);
    }

    const pending = todos.filter((t)=>!t.is_complete)
    const completed = todos.filter((t)=>t.is_complete)

    return (
        <div className='antialiased min-h-screen h-full bg-slate-50 dark:bg-slate-900 transition-[background-color] duration-800 relative'>
            <div className=''>
                <div className='max-w-[1100px] w-full mx-auto py-8'>
                    <h1 className='font-semibold text-2xl text-slate-800 dark:text-slate-200'>Tasks</h1>
                </div>
                <div className='flex-col items-center space-y-2 max-w-[1100px] w-full mx-auto rounded-xl'>
                        {/* {isloading ? <svg className='animate-spin absolute top-1/4 left-1/2 transform -translate-x-1/2' width="24px" height="24px" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd">
                            <circle cx="7" cy="7" r="6" stroke="#000000" stroke-opacity=".1" stroke-width="2"/>
                            <path fill="#000000" fill-opacity=".1" fill-rule="nonzero" d="M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z"/>
                            </g>
                            </svg> : null
                        } */}
                        {!isloading && todos.length==0 ? <p className={`text-center pt-4 text-sm text-slate-400`}>No Tasks</p> : null}
                            <TransitionGroup appear={true} component={transitionListItem} className="flex-col space-y-2">
                                {pending.map((t,index)=>(
                                    <CSSTransition key={index} timeout={300} classNames={"transition"}>
                                        <TaskCard key={index} title={t.task_desc} due={t.task_due} completed={t.is_complete} deleteTask={() => { onDeleteTask(t._id) }} completeTask={()=>{toggleComplete(t._id)}} />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                            <h3 className={`font-semibold text-1xl text-slate-600 dark:text-slate-200 pt-4 ${completed.length == 0 ? 'collapse': '' }`}>Completed</h3>
                            <TransitionGroup appear={true} component={transitionListItem} className="flex-col space-y-2">
                                {completed.map((t,index)=>(
                                    <CSSTransition key={index} timeout={300} classNames={"transition"}>
                                        <TaskCard key={index} title={t.task_desc} due={t.task_due} completed={t.is_complete} deleteTask={() => { onDeleteTask(t._id) }} completeTask={()=>{toggleComplete(t._id)}} />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                </div>
            </div>
            <TaskAdd addTask={addTaskCallback}/>
            <div className='h-40 bg-inherit'></div>
        </div>
  )
}

export default Home