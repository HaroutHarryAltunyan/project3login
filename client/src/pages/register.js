import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import {gql} from 'graphql-tag';
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
    ) {
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
        }
    }
`

function Register(props){
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    function registerUserCallback() {
        console.log("Callback hit")
    }

    const { onChangee, onSubmit, values } = useForm(registerUserCallback, {
        user: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [registerUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, {data: {registerUser: userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) { 
            setErrors(graphQLErrors);
        },
        variables: {registerInput: values } 
    });

    return (
        <Container spacing={2} maxwidth="sm">
            <h3>Register</h3>
            <p>This is the register page,m register below to create an account</p>
        </Container>
    )
}

export default Register;