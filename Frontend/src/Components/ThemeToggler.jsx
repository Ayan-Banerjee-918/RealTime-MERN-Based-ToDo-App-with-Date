import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"


const toggleTheme = (isDark) => {
    if (isDark) {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
    }
    else {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
    }
}

const getInitialTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        return true
      } else {
        document.documentElement.classList.remove('dark')
        return false
      }
}

const ThemeToggler = () => {
    const [isDark, setIsDark] = useState(getInitialTheme())
    
    return (
        <div>
        {isDark ?
        (<SunIcon onClick={()=>{setIsDark(false); toggleTheme(false)}} className="h-6 w-6 text-slate-500 dark:text-slate-400 transition-all ease-in-out duration-400" aria-hidden="true"/>)
        :
        (<MoonIcon onClick={()=>{setIsDark(true); toggleTheme(true)}} className="h-6 w-6 text-slate-500 dark:text-slate-400  transition-all ease-in-out duration-400" aria-hidden="true"/>)
        }
        </div>
    )
}

export default ThemeToggler