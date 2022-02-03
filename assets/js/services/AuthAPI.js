import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "./config";
import customersAPI from "./customersAPI";

function logout() {
    window.localStorage.removeItem("authToken")
    delete axios.defaults.headers["Authorization"]
}

function authenticate(credentials) {
    return axios 
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
        // je stock le token dans le localhost
        window.localStorage.setItem("authToken", token)
        // on previent axios
       setAxiostoken(token)
                
        })
}

function setAxiostoken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
    const token = window.localStorage.getItem("authToken")

    if (token) {
        const {exp: expiration} = jwtDecode(token)
        if(expiration * 1000 > new Date().getTime()) {
           setAxiostoken(token)      
        }
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem("authToken")

    if(token) {
        const {exp: expiration} = jwtDecode(token)
        if(expiration * 1000 > new Date().getTime()) {
            return true
    }
    return false
    }
    return false
}

export default { authenticate, logout, setup, isAuthenticated }


