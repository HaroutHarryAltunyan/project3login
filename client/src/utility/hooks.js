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








// import { useState } from "react";

// export const useForm = (callback, initialState = {}) => {
//     const [values, setValues] = useState(initialState);
//     const [errors, setErrors] = useState({});

//     const onChange = (event) => {
//         setValues({ ...values, [event.target.name]: event.target.value });
//     };

//     const validate = () => {
//         const newErrors = {};
//         if (!values.email) newErrors.email = "Email is required";
//         if (!values.password) newErrors.password = "Password is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0; // Return true if no errors
//     };

//     const onSubmit = (event) => {
//         event.preventDefault();
//         if (validate()) callback();
//     };

//     const resetForm = () => setValues(initialState);

//     return {
//         onChange,
//         onSubmit,
//         resetForm,
//         values,
//         errors,
//     };
// };