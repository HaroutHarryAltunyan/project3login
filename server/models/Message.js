import { model, Schema } from 'mongoose';

// Define the Message schema
const messageSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Export the Message model
export default model('Message', messageSchema);