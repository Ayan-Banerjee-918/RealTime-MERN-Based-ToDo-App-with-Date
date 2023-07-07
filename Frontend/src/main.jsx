import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
console.log(import.meta.env.VITE_API_URL);
const store = createStore(()=>({
  API_BASE: import.meta.env.VITE_API_URL + 'todo/',
  isLoggedIn: false
}))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
