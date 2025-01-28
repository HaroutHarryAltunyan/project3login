// import React, { useReducer, createContext } from 'react';
// import { jwtDecode } from 'jwt-decode';

// const initialState = {
//     user: null
// }

// if (localStorage.getItem("token")) {
//     const decodedToken = jwtDecode(localStorage.getItem("token"));

//     if (decodedToken.exp * 1000 < Date.now()) {
//         localStorage.removeItem("token");
//     } else {
//         initialState.user = decodedToken;
//     }
// }

// const AuthContext = createContext({
//     user: null, 
//     login: (userData) => {},
//     logout: () => {}
// });

// function authReducer(state, action) {
//     switch(action.type) {
//         case 'LOGIN':
//             return {
//                 ...state,
//                 user: action.payload
//             }
//             case 'LOGOUT':
//                 return{
//                     ...state,
//                     user: null
//                 }
//             default:
//                 return state;
//     }
// }

// function AuthProvider(props) {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     const login = (userData) => {
//         localStorage.setItem("token", userData.token);
//         dispatch({
//             type:'LOGIN',
//             payload: userData
//         })
//     }

//     function logout(){
//         localStorage.removeItem("token");
//         dispatch({ type: 'LOGOUT' });
//     }

//     return(
//         <AuthContext.Provider
//             value={{user: state.user, login, logout,}}
//             {...props}
//         />
//     )
// }

// export { AuthContext, AuthProvider };





// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// // this is a refactor and gives an error


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
















































































































// import React, { useReducer, createContext } from 'react';
// import { jwtDecode } from 'jwt-decode';

// const initialState = {
//     user: null,
// };

// const token = localStorage.getItem("token");

// if (token) {
//     try {
//         const decodedToken = jwtDecode(token);

//         if (decodedToken.exp * 1000 < Date.now()) {
//             localStorage.removeItem("token");
//         } else {
//             initialState.user = decodedToken;
//         }
//     } catch (error) {
//         console.error("Invalid token:", error.message);
//         localStorage.removeItem("token");
//     }
// }

// const AuthContext = createContext({
//     user: null,
//     login: () => {},
//     logout: () => {},
// });

// function authReducer(state, action) {
//     switch (action.type) {
//         case 'LOGIN':
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//         case 'LOGOUT':
//             return {
//                 ...state,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// }

// function AuthProvider(props) {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     const login = (userData) => {
//         localStorage.setItem("token", userData.token);
//         dispatch({
//             type: 'LOGIN',
//             payload: userData,
//         })
//     }

//     const logout = () => {
//         localStorage.removeItem("token");
//         dispatch({ type: 'LOGOUT' });
//     }

//     return (
//         <AuthContext.Provider 
//             value={{ user: state.user, login, logout }} 
//             {...props} />
//     );
// }

// export { AuthContext, AuthProvider };






























































// import React, { useReducer, createContext, useEffect } from 'react';
// import  { jwtDecode } from 'jwt-decode';

// const initialState = {
//     user: null,
// };

// const token = localStorage.getItem("token");

// if (token && token.split('.').length === 3) {
//     try {
//         const decodedToken = jwtDecode(token);
//         if (decodedToken.exp * 1000 < Date.now()) {
//             localStorage.removeItem("token");
//         } else {
//             initialState.user = decodedToken;
//         }
//     } catch (error) {
//         console.error("Invalid token:", error.message);
//         localStorage.removeItem("token");
//     }
// }

// const AuthContext = createContext({
//     user: null,
//     login: () => {},
//     logout: () => {},
// });

// function authReducer(state, action) {
//     switch (action.type) {
//         case 'LOGIN':
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//         case 'LOGOUT':
//             return {
//                 ...state,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// }

// function AuthProvider(props) {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     const login = (userData) => {
//         try {
//             localStorage.setItem("token", userData.token);
//             dispatch({ type: 'LOGIN', payload: userData });
//         } catch (error) {
//             console.error("Login error:", error.message);
//         }
//     };

//     const logout = () => {
//         try {
//             localStorage.removeItem("token");
//             dispatch({ type: 'LOGOUT' });
//         } catch (error) {
//             console.error("Logout error:", error.message);
//         }
//     };

//     useEffect(() => {
//         const syncUserState = () => {
//             const token = localStorage.getItem("token");
//             if (token) {
//                 try {
//                     const decodedToken = jwtDecode(token);
//                     if (decodedToken.exp * 1000 < Date.now()) {
//                         logout();
//                     } else {
//                         dispatch({ type: 'LOGIN', payload: decodedToken });
//                     }
//                 } catch (error) {
//                     console.error("Invalid token during sync:", error.message);
//                     logout();
//                 }
//             }
//         };

//         window.addEventListener("storage", syncUserState);

//         return () => {
//             window.removeEventListener("storage", syncUserState);
//         };
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
//     );
// }

// export { AuthContext, AuthProvider };
























































// import React, { useReducer, createContext } from 'react';
// import jwt_decode from 'jwt-decode'; // Corrected import

// const initialState = {
//     user: null,
// };

// if (localStorage.getItem("token")) {
//     const decodedToken = jwt_decode(localStorage.getItem("token")); // Corrected function name

//     if (decodedToken.exp * 1000 < Date.now()) {
//         localStorage.removeItem("token");
//     } else {
//         initialState.user = decodedToken;
//     }
// }

// const AuthContext = createContext({
//     user: null,
//     login: (userData) => {},
//     logout: () => {},
// });

// function authReducer(state, action) {
//     switch (action.type) {
//         case 'LOGIN':
//             return {
//                 ...state,
//                 user: action.payload,
//             };
//         case 'LOGOUT':
//             return {
//                 ...state,
//                 user: null,
//             };
//         default:
//             return state;
//     }
// }

// function AuthProvider(props) {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     const login = (userData) => {
//         localStorage.setItem("token", userData.token);
//         dispatch({
//             type: 'LOGIN',
//             payload: userData,
//         });
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         dispatch({ type: 'LOGOUT' });
//     };

//     return (
//         <AuthContext.Provider
//             value={{ user: state.user, login, logout }} // Cleaned up formatting
//             {...props}
//         />
//     );
// }

// export { AuthContext, AuthProvider };