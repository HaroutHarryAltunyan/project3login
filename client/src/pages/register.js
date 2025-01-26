import {useContext, useState} from "react"
import { authContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/react-hooks";

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
    const context = useContext(authContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const {onChangee, onSubmit, value} = useForm(registerUserCallback, {
        user: '',
        email:'',
        password:'',
        confirmPassword:'',

    });

    const [registerUser, {loading}] = useMutation(REGISTER_USER,{
        upadate(proxy,{data: {registerUser:userData}}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQlErrors);
        },
        variables: {registerInput: values }
    })
}