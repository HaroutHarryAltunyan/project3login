import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    // Password
    // Email
    // {"password": "", "email": ""}
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        console.log(values);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback(); // Executes the callback function passed to the hook
    };

    return {
        onChange,
        onSubmit,
        values,
    };
};