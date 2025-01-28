import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    // Handle form input changes
    const onChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Handle form submission
    const onSubmit = (event) => {
        event.preventDefault();
        if (callback && typeof callback === "function") {
            callback(); // Execute the provided callback function
        }
    };

    return {
        values,
        onChange,
        onSubmit,
    };
};



















