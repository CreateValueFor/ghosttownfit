import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../../api/api";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

function useUserAction() {

    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector(state => state.userData)

    const login = (user) => {
        dispatch({
            type: LOGIN,
            payload: user
        })
    }

    const logout = async () => {
        await getLogout();

        dispatch({
            type: LOGOUT
        })
    }
    return {
        login, logout, user, isLoggedIn
    }
}

export default useUserAction