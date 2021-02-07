const INITIAL_STATE = {
    currentUser: null //setting up the initial state for reducer like we set inital state inside constructor in App
}

//in es6 we can pass a default value to parameter to func if that paramter is not defined, but when parameter is defined as null it is still considered a value and state will not be passed as INITIAL_State
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return { //returning a new object with everything on state but changing currentUser with payload
                ...state,
                currentUser: action.payload                
            }
        default:
            return state;
    }
};

export default userReducer;
