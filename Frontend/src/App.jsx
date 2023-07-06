import { Routes,Route } from 'react-router-dom'
import { Home } from '.'
import {Layout} from './Components/Layout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </>
  )
}
export default App
