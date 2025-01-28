import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert, Typography } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

// GraphQL Mutation
const LOGIN_USER = gql`
    mutation login($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            email
            username
            token
        }
    }
`;

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    // Callback for form submission
    const loginUserCallback = () => {
        loginUser();
    };

    // Custom hook for form handling
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: "",
        password: "",
    });

    // GraphQL mutation hook
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { loginUser: userData } }) {
            login(userData);
            navigate("/");
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { loginInput: values },
    });

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <Typography variant="body1" paragraph>
                Please login to access your account.
            </Typography>
            <Stack spacing={2} pb={2}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Stack>
            {errors.length > 0 && (
                <Stack spacing={1} mb={2}>
                    {errors.map((error, index) => (
                        <Alert key={index} severity="error">
                            {error.message}
                        </Alert>
                    ))}
                </Stack>
            )}
            <Button
                variant="contained"
                onClick={onSubmit}
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
        </Container>
    );
}

export default Login;














