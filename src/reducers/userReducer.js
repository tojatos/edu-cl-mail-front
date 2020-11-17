let user = {}
let loggedIn = false
try {
    const userStr = localStorage.getItem('user');
    if(userStr !== null) {
        user = JSON.parse(userStr);
        loggedIn = true
    }
} catch {}

const defaultState = {
    loggedIn: loggedIn,
    user: user,
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_USER":
            localStorage.setItem('user', JSON.stringify({...action.payload}));
            return {
                loggedIn: true,
                user: {...action.payload}
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                loggedIn: false,
                user: {}
            }
        default: return state
    }
}

export default userReducer
