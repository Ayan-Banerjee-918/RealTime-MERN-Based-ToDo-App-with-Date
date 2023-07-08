const UPDATE_TOKEN = 'UPDATE_TOKEN'

function updateToken() {
    return {
        type: UPDATE_TOKEN,
        info: 'Updating Token'
    }
}

const tokenInitialState = {
    token: localStorage.token
}

// const tokenReducer = (state = tokenInitialState, action) => {
//     switch(action.type) {
//         case UPDATE_TOKEN: return {
//             token: 
//         }
//     }
// }