import axios from "axios";

interface Register {
    name: String,
    username: String,
    email: String,
    password: String
}

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth"

export const registerAPICall = (registerObj: Register) => {
    return axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);
}

export const loginAPICall = (usernameOrEmail: String, password: String) => axios.post(AUTH_REST_API_BASE_URL + '/login', {usernameOrEmail, password});

export const storeToken = (token: any) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");