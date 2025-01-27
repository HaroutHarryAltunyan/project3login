import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
    mutation login(
        $loginInput: LoginInput
        ) {
        loginUser(
            loginInput: $loginInput
            ){
            email
            username
            token
        }
    }
`;

function Login(props) {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]); 

    function loginUserCallback() {
        loginUser();
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, { 
        update(proxy, { data: { loginUser: userData } }) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values }
    });

    return (
        <Container spacing={2} maxWidth="sm">
            <h3>Login</h3>
            <p>This is the login page, login below to access your account</p>
            <Stack spacing={2} paddingBottom={2}>
                <TextField
                    label="Email"
                    name="email"
                    onChange={onChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    onChange={onChange}
                />
            </Stack>
            {errors.map((error, index) => (
                <Alert key={index} severity="error">
                    {error.message}
                </Alert>
            ))}
            <Button
                variant="contained"
                onClick={onSubmit}
                disabled={loading} // Disable button during loading
            >
                {loading ? "Logging in..." : "Login"} {/* Button text for clarity */}
            </Button>
        </Container>
    );
}

export default Login;
















