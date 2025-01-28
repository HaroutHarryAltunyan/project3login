import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert, Typography } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

// GraphQL Mutation
const REGISTER_USER = gql`
    mutation RegisterUser($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`;

function Register() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    // Callback for form submission
    const registerUserCallback = () => {
        registerUser();
    };

    // Custom hook for form handling
    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // GraphQL mutation hook
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { registerUser: userData } }) {
            login(userData);
            navigate("/");
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values },
    });

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Register
            </Typography>
            <Typography variant="body1" paragraph>
                Create an account by filling out the form below.
            </Typography>
            <Stack spacing={2} pb={2}>
                <TextField
                    label="Username"
                    name="username"
                    value={values.username}
                    onChange={onChange}
                    fullWidth
                    required
                />
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
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Stack>
            {errors.length > 0 && (
                <Stack spacing={1} mb={2}>
                    {errors.map((error, index) => (
                        <Alert severity="error" key={index}>
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
                {loading ? "Registering..." : "Register"}
            </Button>
        </Container>
    );
}

export default Register;