import { Routes,Route } from 'react-router-dom'
import { Home} from '.'
import {Layout} from './Components/Layout'
import Login from './Components/Login'
import Signup from './Components/Signup'
import {Toaster} from 'react-hot-toast'
import {useEffect} from 'react'

const getInitialTheme = () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      return true
    } else {
      document.documentElement.classList.remove('dark')
      return false
    }
}

const App = () => {

  useEffect(() => {
    getInitialTheme()
  },[])

  return (
    <>
      <Toaster position="top-center" 
      gutter={2}
      toastOptions={
        {
          className: 'text-sm dark:bg-slate-800 dark:text-slate-300 text-slate-500',
      }}/>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Route>
      </Routes>
    </>
  )
}
export default App
