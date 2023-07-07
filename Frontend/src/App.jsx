import { Routes,Route } from 'react-router-dom'
import { Home} from '.'
import {Layout} from './Components/Layout'
import Login from './Components/Login'
import Signup from './Components/Signup'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/signup' element={<Signup/>}>
        </Route>
      </Routes>
    </>
  )
}
export default App
