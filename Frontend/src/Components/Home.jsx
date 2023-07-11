import Navbar from './Navbar'
import TaskCard from "./TaskCard"
import TaskAdd from './TaskAdd'
import { Transition } from '@headlessui/react'
import { useState,useEffect,React } from 'react'
import { useSelector } from 'react-redux'
import {CSSTransition, TransitionGroup} from "react-transition-group"
import styled from 'styled-components'
import io from 'socket.io-client';
import {useDispatch} from 'react-redux'
import {updateToken, updateUsername, updateLoggedInState} from '../store/userStore'
import toast from 'react-hot-toast'

const transitionListItem = styled.div`
.transition-enter {
	opacity: 0.01;
	transform: translate(0, -3px);
}

.transition-enter-active {
	opacity: 1;
	transform: translate(0, 0);
	transition: all 200ms ease;
}

.transition-exit {
	opacity: 1;
	transform: translate(0,0);
}

.transition-exit-active {
	opacity: 0.01;
	transform: translate(0, -3px);
	transition: all 200ms ease;
}
`
const socket = io.connect(import.meta.env.VITE_API_URL);

const Home = () => {
    const API_BASE = useSelector(state => state.user.API_BASE)+'todo/';
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const auth_token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodos();
    }, []);

    useEffect(() => {
        socket.on("received_todo", () => {
            getTodos();
        })
    }, [socket]);

    useEffect(()=>{
        if (!isLoggedIn)
            savetoLocalStorage()
    },[todos] )

    const getTodos = async () => {
        setLoading(true);
        if (isLoggedIn) {
            await fetch(API_BASE, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+auth_token
                },
                credentials: 'include'
            }).then(res => {
                return res.json()})
                .then(data => setTodos(data));
        }
        else {
            let local_todos = localStorage.getItem('todos');
            local_todos = JSON.parse(local_todos);
            if(Array.isArray(local_todos) && local_todos[0]?.task_desc && local_todos[0]?.task_due && local_todos[0]?.is_complete != null) {
                setTodos(local_todos)
            }
        }
        setLoading(false);
    }

    const savetoLocalStorage = () => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }

    const addTaskCallback = async (title, due) => {
        const todo_obj = {
            task_desc: title,
            task_due: due.startDate,
        }
        if (isLoggedIn) {
            const data=await fetch(API_BASE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+auth_token
                },
                body: JSON.stringify(todo_obj),
                credentials: 'include'
            }).then(res => res.json());
            setTodos([...todos, data]);
            socket.emit("todo_change", todos);
        } else {
            todo_obj._id = todos?.length + 1;
            todo_obj.is_complete = false;
            setTodos([...todos, todo_obj]);
        }
    }

    const onDeleteTask = async (id) => {
        if (isLoggedIn) {
            await fetch(API_BASE + id, { method: "DELETE", headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth_token
            },
            credentials: 'include'
        }).then(res => {
            if(res.status==200) {
                setTodos((todos)=>todos.filter((todo)=>todo._id!=id))
                socket.emit("todo_change", todos);
            }
            else {
                toast.error("Error deleting task")
            }
        });
        }
        else {
            let updated_todos = structuredClone(todos);
            updated_todos = updated_todos.filter(t=>t._id!=id)
            updated_todos.forEach((t, i) => t._id = i+1)
            setTodos(updated_todos)
        }
    }

    const toggleComplete = async (id) => {
        if (isLoggedIn) {
            setTodos((todos)=>todos.map((todo)=>{ if(todo._id==id) todo.is_complete=!todo.is_complete; return todo;}))
            await fetch(API_BASE + 'completeTask/' + id, { method: "PUT",headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+auth_token
            },
            credentials: 'include',
            }).then(res => {
                if (res.status != 200) {
                    setTodos((todos)=>todos.map((todo)=>{ if(todo._id==id) todo.is_complete=!todo.is_complete; return todo;}))
                    toast.error("Error updating task")
            } else {
                socket.emit("todo_change", todos);
            }
            });
        }
        else {
            let updated_todos = structuredClone(todos);
            updated_todos[id - 1].is_complete = !updated_todos[id - 1].is_complete;
            setTodos(updated_todos)
        }
    }

    const updateTask = async (title, due, id) => {
        const todo_obj = {
            task_desc: title,
            task_due: due,
        }
        if (isLoggedIn) {
            const data=await fetch(API_BASE + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+auth_token
                },
                body: JSON.stringify(todo_obj),
                credentials: 'include'
            }).then(res => {
                if(res.status==200) {
                    setTodos((todos)=>todos.map((todo)=>{ if(todo._id==id) {todo.task_desc=title; todo.task_due=due} return todo;}))
                    socket.emit("todo_change", todos);
                } else {
                    toast.error("Error updating task")
                }
            });
        } else {
            let updated_todos = structuredClone(todos);
            updated_todos[id - 1].task_desc = title;
            updated_todos[id - 1].task_due = due;
            setTodos(updated_todos);
        }
    }

    const onSignOutCallback = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('todos')
        dispatch(updateLoggedInState(false))
        dispatch(updateToken(''))
        dispatch(updateUsername(''))
        toast('You were signed out!')
        setTodos([])
    }

    const pending = todos?.filter((t)=>!t.is_complete)
    const completed = todos?.filter((t)=>t.is_complete)

    return (
        <div className='antialiased min-h-screen h-full bg-slate-50 dark:bg-slate-900 transition-[background-color] duration-800 relative'>
            <Navbar signOut={onSignOutCallback} />
            <div className='px-4 sm:px-6'>
                <div className='max-w-[1100px] w-full mx-auto py-8'>
                    <h1 className='font-semibold text-2xl text-slate-800 dark:text-slate-200'>Tasks</h1>
                </div>
                <div className='flex-col items-center space-y-2 max-w-[1100px] w-full mx-auto rounded-xl'>
                        {!isLoading && todos?.length==0 ? <div className={`flex justify-center w-fill mt-16 text-sm text-slate-400`}>
                            No tasks</div> : null}
                            <TransitionGroup appear={true} component={transitionListItem} className="flex-col space-y-2">
                                {pending?.map((t,index)=>(
                                    <CSSTransition key={index} timeout={300} classNames={"transition"}>
                                        <TaskCard key={index} id={t._id} title={t.task_desc} due={t.task_due} completed={t.is_complete} deleteTask={() => { onDeleteTask(t._id) }} completeTask={() => { toggleComplete(t._id) }} onUpdate={updateTask} />
                                    </CSSTransition>
                                )).reverse()}
                            </TransitionGroup>
                            <h3 className={`font-semibold text-1xl text-slate-600 dark:text-slate-200 pt-4 pb-2 ${completed?.length == 0 ? 'collapse': '' }`}>Completed</h3>
                            <TransitionGroup appear={true} component={transitionListItem} className="flex-col space-y-2">
                                {completed?.map((t,index)=>(
                                    <CSSTransition key={index} timeout={300} classNames={"transition"}>
                                        <TaskCard key={index} id={t._id} title={t.task_desc} due={t.task_due} completed={t.is_complete} deleteTask={() => { onDeleteTask(t._id) }} completeTask={() => { toggleComplete(t._id) }} onUpdate={updateTask} />
                                    </CSSTransition>
                                )).reverse()}
                            </TransitionGroup>
                </div>
            </div>
            <TaskAdd addTask={addTaskCallback}/>
            <div className='h-40 bg-inherit'></div>
        </div>
  )
}

export default Home