// import {useContext, useState} from "react"
// import { AuthContext } from "../context/authContext";
// import { useForm } from "../utility/hooks";
// import { useMutation } from "@apollo/react-hooks";
// import { TextField, Button, Container, Stack, Alert } from "@mui/material";
// import {gql} from 'graphql-tag';
// import { useNavigate } from "react-router-dom";

// const REGISTER_USER = gql`
//     mutation Mutation(
//         $registerInput: RegisterInput
//     ) {
//         registerUser(
//             registerInput: $registerInput
//         ) {
//             email
//             username
//             token
//         }
//     }
// `

// function Register(props){
//     const context = useContext(AuthContext);
//     let navigate = useNavigate();
//     const [errors, setErrors] = useState([]);

//     function registerUserCallback() {
//         console.log("Callback hit")
//     }

//     const { onChange, onSubmit, values } = useForm(registerUserCallback, {
//         user: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [registerUser, {loading}] = useMutation(REGISTER_USER, {
//         update(proxy, {data: {registerUser: userData}}) {
//             context.login(userData);
//             navigate('/');
//         },
//         onError({ graphQLErrors }) { 
//             setErrors(graphQLErrors);
//         },
//         variables: { registerInput: values } 
//     });

//     return (
//         <Container spacing={2} maxwidth="sm">
//             <h3>Register</h3>
//             <p>This is the register page, register below to create an account</p>
//         </Container>
//     )
// }

// export default Register;
























import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`;

function Register(props) {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const registerUserCallback = () => {
        registerUser();
    };

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '', // Changed "user" to "username" to match the mutation
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors || []); // Handle null or undefined `graphQLErrors`
        },
        variables: { registerInput: values },
    });

    return (
        <Container spacing={2} maxWidth="sm"> {/* Corrected `maxwidth` to `maxWidth` */}
            <h3>Register</h3>
            <p>This is the register page, register below to create an account</p>
            <form onSubmit={onSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Username"
                        name="username"
                        value={values.username}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={onChange}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                    {errors.length > 0 && (
                        <Alert severity="error">
                            {errors.map((error, index) => (
                                <div key={index}>{error.message}</div>
                            ))}
                        </Alert>
                    )}
                </Stack>
            </form>
        </Container>
    );
}

export default Register;












































// import { useContext, useState } from "react";
// import { AuthContext } from "../context/authContext";
// import { useForm } from "../utility/hooks";
// import { useMutation } from "@apollo/react-hooks";
// import { TextField, Button, Container, Stack, Alert } from "@mui/material";
// import { gql } from "graphql-tag";
// import { useNavigate } from "react-router-dom";

// const REGISTER_USER = gql`
//     mutation Mutation($registerInput: RegisterInput) {
//         registerUser(registerInput: $registerInput) {
//             email
//             username
//             token
//         }
//     }
// `;

// function Register(props) {
//     const context = useContext(AuthContext);
//     let navigate = useNavigate();
//     const [errors, setErrors] = useState([]);

//     function registerUserCallback() {
//         console.log("Callback hit");
//     }

//     const { onChange, onSubmit, values } = useForm(registerUserCallback, { // Fixed typo: onChangee -> onChange
//         user: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [registerUser, { loading }] = useMutation(REGISTER_USER, {
//         update(proxy, { data: { registerUser: userData } }) {
//             context.login(userData);
//             navigate('/');
//         },
//         onError({ graphQLErrors }) {
//             setErrors(graphQLErrors);
//         },
//         variables: { registerInput: values } // Fixed spacing and ensured proper variable naming
//     });

//     return (
//         <Container spacing={2} maxWidth="sm"> {/* Fixed maxwidth -> maxWidth */}
//             <h3>Register</h3>
//             <p>This is the register page, register below to create an account</p> {/* Fixed "page,m register" */}
//         </Container>
//     );
// }

// export default Register;















// import { useContext, useState } from "react";
// import { AuthContext } from "../context/authContext";
// import { useForm } from "../utility/hooks";
// import { useMutation } from "@apollo/react-hooks";
// import { TextField, Button, Container, Stack, Alert } from "@mui/material";
// import { gql } from "graphql-tag";
// import { useNavigate } from "react-router-dom";

// const REGISTER_USER = gql`
//     mutation Mutation($registerInput: RegisterInput) {
//         registerUser(registerInput: $registerInput) {
//             email
//             username
//             token
//         }
//     }
// `;

// function Register(props) {
//     const context = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [errors, setErrors] = useState([]);

//     const registerUserCallback = () => {
//         console.log("Callback hit");
//         registerUser();
//     };

//     const { onChange, onSubmit, values } = useForm(registerUserCallback, {
//         user: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const [registerUser, { loading }] = useMutation(REGISTER_USER, {
//         update(proxy, { data: { registerUser: userData } }) {
//             context.login(userData);
//             navigate('/');
//         },
//         onError({ graphQLErrors }) {
//             setErrors(graphQLErrors);
//         },
//         variables: { registerInput: values },
//     });

//     return (
//         <Container spacing={2} maxWidth="sm">
//             <h3>Register</h3>
//             <p>This is the register page. Register below to create an account</p>
//             <form onSubmit={onSubmit}>
//                 <Stack spacing={2}>
//                     <TextField
//                         label="Username"
//                         name="user"
//                         value={values.user}
//                         onChange={onChange}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Email"
//                         name="email"
//                         value={values.email}
//                         onChange={onChange}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Password"
//                         name="password"
//                         type="password"
//                         value={values.password}
//                         onChange={onChange}
//                         fullWidth
//                     />
//                     <TextField
//                         label="Confirm Password"
//                         name="confirmPassword"
//                         type="password"
//                         value={values.confirmPassword}
//                         onChange={onChange}
//                         fullWidth
//                     />
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         disabled={loading}
//                     >
//                         {loading ? "Loading..." : "Register"}
//                     </Button>
//                 </Stack>
//             </form>
//             {errors.length > 0 && (
//                 <Alert severity="error">
//                     {errors.map((error, index) => (
//                         <div key={index}>{error.message}</div>
//                     ))}
//                 </Alert>
//             )}
//         </Container>
//     );
// }

// export default Register;