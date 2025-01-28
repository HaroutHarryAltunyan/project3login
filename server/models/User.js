import { model, Schema } from 'mongoose';

// Define the User schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            default: null,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the User model
export default model('User', userSchema);