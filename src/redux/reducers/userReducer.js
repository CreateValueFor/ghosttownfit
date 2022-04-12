import {
    LOGOUT,
    LOGIN
} from "../actions/userActions"

const initState = {
    isLoggedIn: false,
    User: {}
};

const userReducer = (state = initState, action) => {

    const user = action.payload;
    if (action.type === LOGIN) {

        return {
            isLoggedIn: true,
            User: user
        }
    } else if (action.type === LOGOUT) {
        return {
            isLoggedIn: false,
            User: {}
        }
    }
    return state
}

export default userReducer;