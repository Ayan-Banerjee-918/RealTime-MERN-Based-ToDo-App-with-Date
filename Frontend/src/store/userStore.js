import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token: localStorage.getItem('token'),
    username: '',
    isLoggedIn: false,
    API_BASE: import.meta.env.VITE_API_URL
}

export const userStore = createSlice ({
    name: 'user',
    initialState,
    reducers: {
        updateToken: (state,action) => {
            state.token = action.payload
        },
        updateUsername: (state, action) => {
            state.username = action.payload
        },
        updateLoggedInState: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const {updateLoggedInState, updateToken, updateUsername} = userStore.actions

export default userStore.reducer