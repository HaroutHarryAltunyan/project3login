



// // this is a refactor and gives an error
// error was {jwtDecode}

import React, { useReducer, createContext } from "react";
import { jwtDecode } from "jwt-decode"; // Correcting import for `jwt-decode`

// Initial state
const initialState = {
    user: null,
};

// Check for token in localStorage and set user in initial state
if (localStorage.getItem("token")) {
    try {
        const decodedToken = jwtDecode(localStorage.getItem("token"));

        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
        } else {
            initialState.user = decodedToken;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
    }
}

// Create AuthContext
const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

// Reducer function for authentication
function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

// AuthProvider component
function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Login action
    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: "LOGIN",
            payload: userData,
        });
    };

    // Logout action
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };































































































