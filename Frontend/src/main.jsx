import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import toast from 'react-hot-toast'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import userStore from './store/userStore.js'
import {updateUsername, updateLoggedInState} from './store/userStore'

const store = configureStore({
  reducer: {
    user: userStore
  }})


const authenticateToken =  async (auth_token, API_BASE) => {
  if (!auth_token) return
  await fetch(API_BASE + 'user/', { 
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+auth_token
    },
}).then(res=> {
  if (res.status==200) {
      return res.json()
  } else if (res.status==403) {
    toast('Session expired. Need to login again!') 
    throw new Error(403)
  }
  else {
    throw new Error(res.status)
  }
}).then(res=> {
    store.dispatch(updateLoggedInState(true))
    store.dispatch(updateUsername(res?.username))
}).catch(err=> {
  console.log(err)
  console.log("Session Expired. Relogin")
})
}

const API_BASE = store.getState().user.API_BASE
const auth_token = store.getState().user.token
await authenticateToken(auth_token, API_BASE)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)

