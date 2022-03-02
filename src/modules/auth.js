const LOGIN = "auth/LOGIN";
const LOGOUT = "auth/LOGOUT";
const REGISTER = "auth/REGISTER";

export const login = ({ email, password }) => ({
    type: LOGIN
})