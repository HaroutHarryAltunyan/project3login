import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
    mutation Mutation(
        $registerInput: RegisterInput
    ){
        registerUser(
            registerInput: $registerInput
        ) {
            email
            username
            token
        }
    }
`;

function Register(props) {
    const context = useContext(authContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword:''
    });


    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData);
            navigate('/');

        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
        },
        variables: { registerInput: values }
    })
}
