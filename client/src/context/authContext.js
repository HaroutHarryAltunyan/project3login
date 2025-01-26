import React, { useReducer, createContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const initialState = {
    user: null,
};

const token = localStorage.getItem("token");

if (token) {
    try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
        } else {
            initialState.user = decodedToken;
        }
    } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
    }
}

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData,
        })
    }

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <AuthContext.Provider 
            value={{ user: state.user, login, logout }} 
            {...props} />
    );
}

export { AuthContext, AuthProvider };




















































































































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